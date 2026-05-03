// controllers/bookingController.js

const Booking = require('../models/Booking'); 
// Mongoose model representing the Booking collection in MongoDB

/**
 * CONTROLLER: createBooking
 * -------------------------
 * Creates and stores a new booking record in the database.
 *
 * PROCESS OVERVIEW:
 * 1. Extract booking data from the request body
 * 2. Validate required fields
 * 3. Create a Booking model instance
 * 4. Persist the booking to MongoDB
 * 5. Return a success response to the client
 *
 * SECURITY & DATA NOTES:
 * - Validation ensures essential fields are present before writing to the DB.
 * - Additional validation (date ranges, price integrity, etc.) can be added later.
 */
const createBooking = async (req, res) => {
  console.log(">>> Entering Booking Route handler");

  try {
    /**
     * 1. DATA EXTRACTION
     * ------------------
     * Pulls booking details sent from the frontend.
     */
    const {
      roomType,
      checkIn,
      checkOut,
      totalNights,
      totalTravelers,
      price,
      guestInfo
    } = req.body;

    /**
     * 2. BASIC VALIDATION
     * -------------------
     * Ensures the minimum required fields exist before proceeding.
     * Prevents incomplete or malformed bookings from being stored.
     */
    if (
      !roomType ||
      !checkIn ||
      !checkOut ||
      !guestInfo ||
      !guestInfo.firstName ||
      !guestInfo.email
    ) {
      return res.status(400).json({
        message: 'Missing required booking information.'
      });
    }

    /**
     * 3. MODEL INSTANTIATION
     * ----------------------
     * Creates a new Booking document in memory.
     * This does NOT write to the database yet.
     */
    const newBooking = new Booking({
      roomType,
      checkIn,
      checkOut,
      totalNights,
      totalTravelers,
      price,
      guestInfo
    });

    /**
     * 4. DATABASE WRITE OPERATION
     * ---------------------------
     * Saves the booking to MongoDB.
     * 'await' ensures the server waits for confirmation before responding.
     */
    const savedBooking = await newBooking.save();

    /**
     * 5. SUCCESS RESPONSE
     * -------------------
     * Returns the newly created booking to the client.
     */
    res.status(201).json({
      success: true,
      message: 'Booking successfully saved to database!',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Database Error:', error);

    /**
     * ERROR HANDLING
     * --------------
     * Returns a controlled 500 response without exposing internal details.
     */
    res.status(500).json({
      success: false,
      message: 'Server error while saving booking.'
    });
  }
};

/**
 * CONTROLLER: searchBooking
 * -------------------------
 * Searches for a booking using the guest's first name and email.
 * This is used for self check-in or reservation lookup.
 *
 * PROCESS OVERVIEW:
 * 1. Validate input
 * 2. Perform a case-insensitive name match
 * 3. Normalize email to lowercase
 * 4. Return the matching booking or a 404 if none found
 */
const searchBooking = async (req, res) => {
  console.log(">>> [BACKEND] I received a search request!");

  try {
    const { name, email } = req.body;

    /**
     * 1. BASIC VALIDATION
     * -------------------
     * Ensures both fields are provided before querying the database.
     */
    if (!name || !email) {
      return res.status(400).json({
        message: 'Please provide both name and email.'
      });
    }

    /**
     * 2. DATABASE SEARCH
     * ------------------
     * - Uses a case-insensitive regex for the first name.
     * - Converts email to lowercase for consistent matching.
     */
    const booking = await Booking.findOne({
      'guestInfo.firstName': { $regex: new RegExp(`^${name}$`, 'i') },
      'guestInfo.email': email.toLowerCase()
    });

    /**
     * 3. NO MATCH FOUND
     * -----------------
     * Returns a 404 response if no reservation matches the provided details.
     */
    if (!booking) {
      console.log("--- No Match Found ---");
      return res.status(404).json({
        success: false,
        message: 'No reservation found. Please check your details.'
      });
    }

    /**
     * 4. SUCCESS RESPONSE
     * -------------------
     * Returns the booking record to the client.
     */
    console.log("Match Found for:", name);
    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Search Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error during search.'
    });
  }
};

// Export controller functions for use in route definitions
module.exports = {
  createBooking,
  searchBooking
};
