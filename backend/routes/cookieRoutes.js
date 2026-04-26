const express = require('express');
const router = express.Router();
const Cookie = require('../models/Cookie'); // Import the model we just made

// !!! REQUEST !!!
/**
 * @route   POST /api/cookies   
 * 
 * @desc    Save user's cookie preference to the database
 * @body    { preference: 'accepted' | 'declined', userAgent: string }
 * @returns { success: boolean, message: string }   

**/

// POST: /api/cookies

router.post('/', async (req, res) => {
    try {
        const { preference, userAgent } = req.body;
        
        // Get the user's IP address
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Create a new database entry using the Model
        const newLog = new Cookie({
            preference,
            userAgent,
            ipAddress: ip
        });

        // Save it to the database
        await newLog.save();

        res.status(201).json({ 
            success: true, 
            message: "Preference stored in Manor Database" 
        });
    } catch (error) {
        console.error("Error saving cookie log:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;