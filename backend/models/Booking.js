const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  ticketCount: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  qrCodeData: {
    type: String,
    required: true,
  },
  qrCodeImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'checked-in'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
