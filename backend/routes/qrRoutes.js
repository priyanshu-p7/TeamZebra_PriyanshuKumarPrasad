const express = require('express');
const router = express.Router();
const { verifyQR } = require('../controllers/qrController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/verify', protect, authorize('organizer'), verifyQR);

module.exports = router;
