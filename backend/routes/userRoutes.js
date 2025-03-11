const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect, authorize } = require("../config/authMiddleware");

const router = express.Router();

// Only logged-in users can view their profile
router.get("/profile", protect, getUserProfile);

// Only admin can manage users
router.get("/", protect, authorize("admin"), (req, res) => {
    res.send("Admin Access: Manage Users");
});

module.exports = router;
