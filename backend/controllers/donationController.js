const User = require("../models/UserModel"); // Import User model to update total units
const Donation = require("../models/DonationModel");

// @desc Add a new donation (Donor only)
// @route POST /api/users/donate
// @access Private (Donor only)
const addDonation = async (req, res) => {
    try {
        let { recipientName, bloodType, location, hospital, unitsDonated } = req.body;

        if (!recipientName || !bloodType || !location || !hospital || !unitsDonated) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert unitsDonated to a number
        unitsDonated = Number(unitsDonated);
        if (isNaN(unitsDonated) || unitsDonated <= 0) {
            return res.status(400).json({ message: "Invalid unitsDonated. Must be a positive number." });
        }

        // Check if the logged-in user is a donor
        if (req.user.role !== "donor") {
            return res.status(403).json({ message: "Access denied. Only donors can add donations." });
        }

        // Create new donation record
        const newDonation = new Donation({
            donor: req.user.id,
            recipientName,
            bloodType,
            location,
            hospital,
            unitsDonated, // Ensure it's stored as a number
            date: new Date(),
        });

        await newDonation.save();

        // Update the donor's total units donated in their profile
        const donor = await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { totalUnitsDonated: unitsDonated } }, // Efficient increment operation
            { new: true }
        );

        // Send response with donation details for certificate generation
        res.status(201).json({
            message: "Donation recorded successfully!",
            donation: {
                donorName: req.user.name,
                bloodType,
                location,
                hospital,
                unitsDonated,
                donationDate: newDonation.date.toISOString().split("T")[0],
            },
            totalUnitsDonated: donor.totalUnitsDonated, // Updated total units donated
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

// @desc Get all donations (Admin only)
// @route GET /api/users/all-donations
// @access Private (Admin only)
const getAllDonations = async (req, res) => {
    try {
        // Only admin can access this route
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const donations = await Donation.find().populate("donor", "name email bloodType location totalUnitsDonated");

        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching all donations", error });
    }
};

// @desc Get donation history of logged-in donor
// @route GET /api/users/donation-history
// @access Private (Donor only)
const getDonationHistory = async (req, res) => {
    try {
        // Only donors can see their own history
        if (req.user.role !== "donor") {
            return res.status(403).json({ message: "Access denied. Only donors can see their donation history." });
        }

        const donations = await Donation.find({ donor: req.user.id }).sort({ date: -1 });

        // Fetch total units donated from the User model (instead of recalculating every time)
        const donor = await User.findById(req.user.id);
        const totalUnitsDonated = donor?.totalUnitsDonated || 0;

        res.json({ donations, totalUnitsDonated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching donation history", error });
    }
};

module.exports = { addDonation, getAllDonations, getDonationHistory };
