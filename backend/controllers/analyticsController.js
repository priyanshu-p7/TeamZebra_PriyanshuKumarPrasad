const Event = require('../models/Event');
const Booking = require('../models/Booking');

// @desc    Get analytics for a specific event
// @route   GET /api/events/:id/analytics
const getEventAnalytics = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership
    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view analytics for this event' });
    }

    const ticketsSold = event.totalSeats - event.availableSeats;

    // Get all bookings for this event
    const bookings = await Booking.find({ eventId: req.params.id })
      .populate('userId', 'name email college')
      .sort({ createdAt: -1 });

    const attendanceCount = bookings.filter(b => b.status === 'checked-in').length;

    // Build attendees table
    const attendees = bookings.map(b => ({
      userName: b.userId.name,
      userEmail: b.userId.email,
      userCollege: b.userId.college,
      ticketCount: b.ticketCount,
      status: b.status,
      bookedAt: b.createdAt,
    }));

    res.json({
      eventTitle: event.title,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
      ticketsSold,
      attendanceCount,
      totalBookings: bookings.length,
      attendees,
    });
  } catch (error) {
    console.error('Analytics error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEventAnalytics };
