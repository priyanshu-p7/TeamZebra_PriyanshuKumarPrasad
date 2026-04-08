const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const generateQR = require('../utils/generateQR');
const { sendEmail, buildTicketEmail } = require('../utils/sendEmail');

// @desc    Book tickets for an event
// @route   POST /api/bookings/book
const bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;
    const ticketCount = 1; // Strictly enforce 1 ticket per user per event

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

    const getPosterUrl = (poster) => {
      if (!poster) return null;
      if (poster.startsWith('http')) return poster;
      return `${process.env.CLIENT_URL}${poster}`;
    };

    let mapLink = '';
    if (event.latitude && event.longitude) {
      mapLink = `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`;
    } else if (event.location) {
      mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    }

    // Send confirmation email
    const emailHtml = buildTicketEmail({
      eventTitle: event.title,
      eventDate: event.date,
      eventLocation: event.location,
      eventDescription: event.description,
      mapLink: mapLink,
      ticketCount,
      qrCodeCid: 'cid:qrcode@eventra',
      posterUrl: getPosterUrl(event.poster),
      userName: user.name,
    });

    sendEmail({
      to: user.email,
      subject: `${event.title} Ticket Confirmation`,
      html: emailHtml,
      attachments: [{
        filename: 'qrcode.png',
        path: qrCodeImage,
        cid: 'qrcode@eventra'
      }]
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
