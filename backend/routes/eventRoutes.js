const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  upload,
} = require('../controllers/eventController');
const { getEventAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Organizer-only routes
router.post('/create', protect, authorize('organizer'), upload.single('poster'), createEvent);
router.put('/:id', protect, authorize('organizer'), upload.single('poster'), updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

// Analytics
router.get('/:id/analytics', protect, authorize('organizer'), getEventAnalytics);

module.exports = router;
