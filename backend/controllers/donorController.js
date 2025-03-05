const User = require('../models/User');

const getDonors = async (req, res) => {
    try {
        const donors = await User.find({ role: 'donor' }).select('-password');
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getDonorById = async (req, res) => {
    try {
        const donor = await User.findById(req.params.id).select('-password');
        if (!donor || donor.role !== 'donor') {
            return res.status(404).json({ message: 'Donor not found' });
        }
        res.json(donor);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateDonorProfile = async (req, res) => {
    try {
        const donor = await User.findById(req.user.id);
        if (!donor || donor.role !== 'donor') {
            return res.status(404).json({ message: 'Donor not found' });
        }

        donor.name = req.body.name || donor.name;
        donor.email = req.body.email || donor.email;
        donor.bloodType = req.body.bloodType || donor.bloodType;
        donor.location = req.body.location || donor.location;

        const updatedDonor = await donor.save();
        res.json({
            _id: updatedDonor.id,
            name: updatedDonor.name,
            email: updatedDonor.email,
            bloodType: updatedDonor.bloodType,
            location: updatedDonor.location,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getDonors, getDonorById, updateDonorProfile };