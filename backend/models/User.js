const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    bloodType: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['donor', 'recipient', 'admin'], 
        default: 'recipient' 
    },
    location: { 
        type: String, 
        required: true 
    },
    availability: { 
        type: Boolean, 
        default: true 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);