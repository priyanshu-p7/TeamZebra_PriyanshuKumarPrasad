const Event = require('../models/Event');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const imagekit = require('../config/imagekit');

// Multer config for poster uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed'));
  },
});

// @desc    Create a new event
// @route   POST /api/events/create
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      latitude,
      longitude,
      date,
      time,
      eventType,
      totalSeats,
    } = req.body;

    // Get organizer info for college
    const organizer = await User.findById(req.user.id);

    let allowedCollege = null;
    if (eventType === 'collegeOnlyEvent') {
      allowedCollege = organizer.college;
    }

    // Validate that event date is not in the past
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    if (eventDate < today) {
      return res.status(400).json({ message: 'Event date cannot be in the past' });
    }

    let posterUrl = null;
    if (req.file) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: uniqueName,
        folder: '/eventra_posters'
      });
      posterUrl = response.url;
    }

    const event = await Event.create({
      title,
      description,
      category,
      location,
      latitude: latitude || null,
      longitude: longitude || null,
      date,
      time,
      organizerId: req.user.id,
      eventType: eventType || 'openEvent',
      allowedCollege,
      totalSeats,
      availableSeats: totalSeats,
      poster: posterUrl,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all events with filters
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const { city, category, date, eventType, search } = req.query;
    const filter = {};

    if (city) filter.location = { $regex: city, $options: 'i' };
    if (category) filter.category = category;
    if (eventType) filter.eventType = eventType;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const events = await Event.find(filter)
      .populate('organizerId', 'name college')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'organizerId',
      'name email college'
    );

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Get event error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership
    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updateData = { ...req.body };

    // Validate date if it is being updated
    if (updateData.date) {
      const eventDate = new Date(updateData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        return res.status(400).json({ message: 'Event date cannot be in the past' });
      }
    }
    if (req.file) {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(req.file.originalname)}`;
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: uniqueName,
        folder: '/eventra_posters'
      });
      updateData.poster = response.url;
    }

    // Handle college logic on eventType change
    if (updateData.eventType === 'collegeOnlyEvent') {
      const organizer = await User.findById(req.user.id);
      updateData.allowedCollege = organizer.college;
    } else if (updateData.eventType === 'openEvent') {
      updateData.allowedCollege = null;
    }

    event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(event);
  } catch (error) {
    console.error('Update event error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check ownership
    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  upload,
};
