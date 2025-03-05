const express = require('express');
const { sendNotificationEmail, notifyDonors } = require('../controllers/notificationController');
const {protect} = require('../config/authMiddleware');

const router = express.Router();

// Send a custom email notification
router.post('/email', protect, sendNotificationEmail);

// Notify donors about a new blood request
router.post('/notify-donors', protect, notifyDonors);

module.exports = router;