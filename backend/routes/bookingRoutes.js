const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

// 1 !!! REQUEST !!! create a new booking
// @route   POST /api/bookings
// @desc    Create a new booking
router.post('/', async (req, res) => {

 console.log(">>> Entering Booking Route handler");
  try {
    // 1. Receive data sent from the frontend
    const {
      roomType,
      checkIn,
      checkOut,
      totalNights,
      totalTravelers,
      price,
      guestInfo
    } = req.body;

    // 2. Basic data validation
    if (!roomType || !checkIn || !checkOut || !guestInfo || !guestInfo.firstName || !guestInfo.email) {
      return res.status(400).json({ message: 'Missing required booking information.' });
    }

    // 3. Create a new booking instance
    const newBooking = new Booking({
      roomType,
      checkIn,
      checkOut,
      totalNights,
      totalTravelers,
      price,
      guestInfo
    });

    // 4. Save to the database
    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking successfully saved to database!',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Database Error:', error);
    // 5. Handle server/database errors
    res.status(500).json({ success: false, message: 'Server error while saving booking.' });
  }
});


// --- 2. RESPONSE: Self Check-in Search---
// @route   POST /api/bookings/search
// @desc    Find reservation by name and email
router.post('/search', async (req, res) => {
  console.log(">>> [BACKEND] I received a search request!");
  
  try {
    const { name, email } = req.body;

    // Basic validation: check if inputs are empty
    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide both name and email.' });
    }

    // Search in the database
    // Use $regex to make the name search case-insensitive
    const booking = await Booking.findOne({
      'guestInfo.firstName': { $regex: new RegExp(`^${name}$`, 'i') },
      'guestInfo.email': email.toLowerCase() // Emails are typically matched in lowercase
    });

    if (!booking) {
      console.log("--- No Match Found ---");
      return res.status(404).json({ 
        success: false, 
        message: 'No reservation found. Please check your details.' 
      });
    }

    console.log("Match Found for:", name);
    res.status(200).json({
      success: true,
      booking: booking
    });

  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ success: false, message: 'Server error during search.' });
  }
});

module.exports = router;