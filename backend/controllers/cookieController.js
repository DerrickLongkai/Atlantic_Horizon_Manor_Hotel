// controllers/cookieController.js

const Cookie = require('../models/Cookie'); 
// Mongoose model representing the 'Cookies' collection in MongoDB

/**
 * CONTROLLER: saveCookiePreference
 * Records a user's cookie consent choice ("Accept" or "Decline") along with
 * metadata such as IP address and browser user-agent.
 * SECURITY NOTES:
 * - Does not store sensitive personal data beyond IP + user-agent.
 * - Should ideally be rate-limited to prevent spam or automated abuse.
 */
const saveCookiePreference = async (req, res) => {
    try {
        /**
         * 1. DATA EXTRACTION
         * Extracts the user's preference and browser information from the request body.
         * Example:
         *   preference: "Accept" | "Decline"
         *   userAgent: "Mozilla/5.0 ..."
         */
        const { preference, userAgent } = req.body;

        /**
         * 2. IP ADDRESS RESOLUTION
         * - If the application is behind a proxy (Nginx, Cloudflare, Heroku),
         *   'x-forwarded-for' will contain the real client IP.
         * - Otherwise, fallback to the direct socket connection IP.
         */
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        /**
         * 3. MODEL INSTANTIATION
         * Creates a new Cookie document instance in memory.
         * This does NOT write to the database yet.
         */
        const newLog = new Cookie({
            preference,
            userAgent,
            ipAddress: ip
        });

        /**
         * 4. DATABASE WRITE OPERATION
         * Saves the new log entry to MongoDB.
         * 'await' ensures the server waits for confirmation before continuing.
         */
        await newLog.save();

        /**
         * 6. SUCCESS RESPONSE
         * Returns HTTP 201 (Created) to indicate the log was successfully stored.
         */
        res.status(201).json({
            success: true,
            message: "Preference stored in Manor Database"
        });

    } catch (error) {
        /**
         * ERROR HANDLING
         * Logs the error server-side for debugging and returns a controlled
         * 500 response to the client without exposing internal details.
         */
        console.error("Error saving cookie log:", error);

        res.status(500).json({
            success: false,
            message: "Server Error: Unable to persist preference"
        });
    }
};

// Export controller for use in route definitions
module.exports = {
    saveCookiePreference
};
