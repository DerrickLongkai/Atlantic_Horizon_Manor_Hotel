const mongoose = require('mongoose');

/**
 * COOKIE PREFERENCE SCHEMA
 * This defines exactly what a "Cookie Log" looks like in our database.
 */
const cookieSchema = new mongoose.Schema({
    preference: {
        type: String,
        required: true,
        enum: ['accepted', 'declined'], // Only allows these two values
    },
    userAgent: {
        type: String, // Stores browser and device information
    },
    ipAddress: {
        type: String, // Useful for legal/GDPR audit trails
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Export the model so we can use it in our routes
module.exports = mongoose.model('Cookie', cookieSchema);