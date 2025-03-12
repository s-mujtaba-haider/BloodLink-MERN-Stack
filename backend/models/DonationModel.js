const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipientName: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        hospital: {
            type: String,
            required: true,
        },
        unitsDonated: {  // Added field for units donated
            type: Number,
            required: true,
            min: 1, // Ensure at least 1 unit is donated
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
