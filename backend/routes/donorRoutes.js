const express = require('express');
const { getDonors, getDonorById, updateDonorProfile } = require('../controllers/donorController');
const { protect } = require('../config/authMiddleware');

const router = express.Router();

router.get('/', getDonors);
router.get('/:id', getDonorById);
router.put('/profile', protect, updateDonorProfile);

module.exports = router;