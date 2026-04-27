const express = require('express');
const router = express.Router();
const Cookie = require('../models/Cookie'); // Import the Mongoose schema for the 'Cookies' collection


// ！！！！！ REQUEST TO DATABASE ! ! ! ! !
/**
 * @route   POST /api/cookies
 * @desc    Records a user's 'Accept' or 'Decline' cookie choice
 * @access  Public
 */
router.post('/', async (req, res) => {
    try {
        // DATA EXTRACTION:
        // Pull preference (string) and userAgent (browser info) from the request body
        const { preference, userAgent } = req.body;
        
        // IP ADDRESS RETRIEVAL:
        // Checks 'x-forwarded-for' first (useful if the app is behind a proxy like Nginx/Heroku)
        // Defaults to the direct socket address if no proxy headers exist.
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // MODEL INSTANTIATION:
        // Creates a local JavaScript instance of the Cookie model. 
        // This exists only in the server's RAM at this moment; it is NOT in the database yet.
        const newLog = new Cookie({
            preference,
            userAgent,
            ipAddress: ip
        });

        // 1. This triggers the actual 'INSERT' command to the MongoDB server.
        // 2. 'await' is mandatory here; it pauses the function until the database 
        //    successfully acknowledges the write or returns an error.
         await newLog.save();

        // CLIENT NOTIFICATION:
        // Send a 201 (Created) status code to indicate successful record creation.
        res.status(201).json({ 
            success: true, 
            message: "Preference stored in Manor Database" 
        });

    } catch (error) {
        // ERROR LOGGING:
        // Captures connection timeouts, validation errors, or permission issues.
        console.error("Error saving cookie log:", error);
        
        // Return 500 (Internal Server Error) so the frontend knows the save failed.
        res.status(500).json({ 
            success: false, 
            message: "Server Error: Unable to persist preference" 
        });
    }
});

module.exports = router;