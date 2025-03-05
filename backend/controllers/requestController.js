const BloodRequest = require('../models/BloodRequest');

// @desc    Create a new blood request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
    const { bloodType, unitsRequired, hospital, location, contactNumber } = req.body;

    try {
        const newRequest = await BloodRequest.create({
            requester: req.user.id,
            bloodType,
            unitsRequired,
            hospital,
            location,
            contactNumber,
        });

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all blood requests
// @route   GET /api/requests
// @access  Private
const getRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find().populate('requester', 'name email');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a blood request
// @route   PUT /api/requests/:id
// @access  Private
const updateRequest = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.requester.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const updatedRequest = await BloodRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a blood request
// @route   DELETE /api/requests/:id
// @access  Private
const deleteRequest = async (req, res) => {
    try {
        const request = await BloodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.requester.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await request.deleteOne();
        res.json({ message: 'Request deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createRequest, getRequests, updateRequest, deleteRequest };