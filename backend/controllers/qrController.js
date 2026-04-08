const Booking = require('../models/Booking');

// @desc    Verify QR code at event entry
// @route   POST /api/qr/verify
const verifyQR = async (req, res) => {
  try {
    const { qrCodeData } = req.body;

    if (!qrCodeData) {
      return res.status(400).json({ message: 'QR code data is required' });
    }

    // Find booking by QR code data
    const booking = await Booking.findOne({ qrCodeData })
      .populate('userId', 'name email college')
      .populate('eventId', 'title date location');

    if (!booking) {
      return res.status(404).json({
        valid: false,
        message: 'Invalid ticket — no booking found for this QR code',
      });
    }

    // Check if already used
    if (booking.status === 'checked-in') {
      return res.status(400).json({
        valid: false,
        message: 'This ticket has already been used for entry',
        booking: {
          userName: booking.userId.name,
          eventTitle: booking.eventId.title,
          status: booking.status,
        },
      });
    }

    // Mark as checked-in
    booking.status = 'checked-in';
    await booking.save();

    res.json({
      valid: true,
      message: 'Entry allowed! Ticket verified successfully.',
      booking: {
        userName: booking.userId.name,
        userEmail: booking.userId.email,
        userCollege: booking.userId.college,
        eventTitle: booking.eventId.title,
        eventDate: booking.eventId.date,
        ticketCount: booking.ticketCount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error('QR verify error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { verifyQR };
