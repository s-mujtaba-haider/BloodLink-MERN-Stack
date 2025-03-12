const User = require('../models/User');

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const Donation = require("../models/DonationModel");

// Fetch only the donor's donation history
const getDonationHistory = async (req, res) => {
    try {
        const userId = req.user.id;  // Get user ID from the logged-in token
        const donations = await Donation.find({ donor: userId }).sort({ date: -1 });

        if (donations.length === 0) {
            return res.status(200).json({ message: "No donation history found." });
        }

        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donation history" });
    }
};

module.exports = { getDonationHistory };

module.exports = { getUserProfile };