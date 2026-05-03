// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { createBooking, searchBooking } = require('../controllers/bookingController');

/**
 * @route   POST /api/bookings
 * @desc    Create a new booking
 * @access  Public
 */
router.post('/', createBooking);

/**
 * @route   POST /api/bookings/search
 * @desc    Find reservation by name and email (Self Check-in Search)
 * @access  Public
 */
router.post('/search', searchBooking);

module.exports = router;