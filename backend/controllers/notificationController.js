const nodemailer = require('nodemailer');
const User = require('../models/User');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// @desc    Send notification email
// @route   POST /api/notifications/email
// @access  Private
const sendNotificationEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

const notifyDonors = async (req, res) => {
    const { bloodType, message } = req.body;

    try {
        const donors = await User.find({ role: 'donor', bloodType });

        if (donors.length === 0) {
            return res.status(404).json({ message: 'No matching donors found' });
        }

        const emailPromises = donors.map((donor) =>
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: donor.email,
                subject: 'Urgent Blood Donation Request',
                text: message
            })
        );

        await Promise.all(emailPromises);
        res.status(200).json({ message: 'Notifications sent to donors' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending notifications', error: error.message });
    }
};


module.exports = { sendNotificationEmail, notifyDonors };