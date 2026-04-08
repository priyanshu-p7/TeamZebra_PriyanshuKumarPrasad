const express = require('express');
const router = express.Router();
const { bookTicket, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/book', protect, authorize('attendee'), bookTicket);
router.get('/my', protect, getMyBookings);

module.exports = router;
