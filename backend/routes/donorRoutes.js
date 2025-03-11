const express = require("express");
const { getDonors, getDonorById, updateDonorProfile } = require("../controllers/donorController");
const { protect, authorize } = require("../config/authMiddleware");

const router = express.Router();

// Only admin and donors can access donor data
router.get("/", protect, authorize("admin", "recipient"), getDonors);
router.get("/:id", protect, authorize("admin"), getDonorById);

// Only donors can update their profile
router.put("/profile", protect, authorize("donor"), updateDonorProfile);

module.exports = router;
