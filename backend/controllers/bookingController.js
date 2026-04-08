const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const generateQR = require('../utils/generateQR');
const { sendEmail, buildTicketEmail } = require('../utils/sendEmail');

// @desc    Book tickets for an event
// @route   POST /api/bookings/book
const bookTicket = async (req, res) => {
  try {
    const { eventId, ticketCount = 1 } = req.body;

    // Get event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get user for eligibility check
    const user = await User.findById(req.user.id);

    // College eligibility check
    if (event.eventType === 'collegeOnlyEvent') {
      if (user.college !== event.allowedCollege) {
        return res.status(403).json({
          message: `This event is restricted to students of ${event.allowedCollege}`,
        });
      }
    }

    // Check for existing booking
    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId,
    });
    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this event' });
    }

    // Atomic seat deduction (FCFS)
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        availableSeats: { $gte: ticketCount },
      },
      {
        $inc: { availableSeats: -ticketCount },
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(400).json({
        message: 'Not enough seats available. Please try with fewer tickets.',
      });
    }

    // Generate QR code
    const { qrCodeData, qrCodeImage } = await generateQR(req.user.id, eventId);

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      ticketCount,
      qrCodeData,
      qrCodeImage,
      status: 'confirmed',
    });

    // Send confirmation email
    const emailHtml = buildTicketEmail({
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      ticketCount,
      qrCodeImage,
      posterUrl: event.poster ? `${process.env.CLIENT_URL}${event.poster}` : null,
    });

    sendEmail({
      to: user.email,
      subject: `🎫 Ticket Confirmed: ${event.title}`,
      html: emailHtml,
    });

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: {
        id: booking._id,
        eventId: booking.eventId,
        ticketCount: booking.ticketCount,
        qrCodeData: booking.qrCodeData,
        qrCodeImage: booking.qrCodeImage,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: 'eventId',
        select: 'title date time location poster status latitude longitude',
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookTicket, getMyBookings };
