const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
            enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        },
        unitsRequired: {
            type: Number,
            required: true,
        },
        hospital: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);