const express = require("express");
const { sendNotificationEmail, notifyDonors } = require("../controllers/notificationController");
const { protect, authorize } = require("../config/authMiddleware");

const router = express.Router();

// Only admins can send notifications
router.post("/email", protect, authorize("admin"), sendNotificationEmail);
router.post("/notify-donors", protect, authorize("admin"), notifyDonors);

module.exports = router;
