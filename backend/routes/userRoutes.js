const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { protect, authorize } = require("../config/authMiddleware");

const router = express.Router();
const Donation = require("../models/DonationModel");
const User = require("../models/User");

// Only logged-in users can view their profile
router.get("/profile", protect, getUserProfile);

// Only admin can manage users
router.get("/", protect, authorize("admin"), (req, res) => {
    res.send("Admin Access: Manage Users");
});

router.get("/donation-history", protect, async (req, res) => {
    try {
        // console.log("Fetching donation history for user:", req.user.id);

        const donations = await Donation.find({ donor: req.user.id }).sort({ date: -1 });

        // console.log("Fetched Donations:", donations);

        if (!donations.length) {
            return res.status(200).json({ message: "No donations found for this user." });
        }

        // Make sure the frontend gets an object with a `donations` key
        res.status(200).json({ donations });
    } catch (error) {
        console.error("Error fetching donation history:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// POST Donate Blood
router.post("/donate", protect, async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging log

        const { recipientName, hospital, unitsDonated } = req.body;

        if (!recipientName || !hospital || !unitsDonated) {
            return res.status(400).json({ message: "Recipient name, hospital, and units donated are required." });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure user has bloodType and location
        if (!user.bloodType || !user.location) {
            return res.status(400).json({ message: "User must have blood type and location." });
        }

        // Create new donation entry
        const donation = new Donation({
            donor: req.user.id,
            recipientName,
            bloodType: user.bloodType,
            location: user.location,
            hospital,
            unitsDonated,  // Ensuring units donated is stored
            date: new Date(),
        });

        await donation.save();

        // Update donor's total units donated
        user.totalUnitsDonated = (user.totalUnitsDonated || 0) + parseInt(unitsDonated);
        await user.save();

        res.status(201).json({ 
            message: "Donation added successfully", 
            donation, 
            totalUnitsDonated: user.totalUnitsDonated 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
