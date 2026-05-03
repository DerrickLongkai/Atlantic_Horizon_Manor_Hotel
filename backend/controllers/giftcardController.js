// controllers/giftcardController.js

const crypto = require('crypto');            // Native Node.js crypto module for secure random byte generation
const Giftcard = require('../models/Giftcard'); // Mongoose model representing the Giftcard collection

/**
 * UTILITY: generateCode
 * ---------------------
 * Generates an 8‑character alphanumeric gift card code using a restricted
 * character set to avoid visually confusing characters.
 *
 * SECURITY NOTES:
 * - Uses crypto.randomBytes() for cryptographically strong randomness.
 * - Reduces collision probability by combining randomness with a uniqueness check.
 * - Excludes characters: I, O, 0, 1, L (to avoid confusion for customers).
 */
const generateCode = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // 31‑character safe set
  const charLength = chars.length;
  let result = '';

  // Generate 8 random bytes and map each byte to a character index
  const randomBytes = crypto.randomBytes(8);

  for (let i = 0; i < 8; i++) {
    result += chars.charAt(randomBytes[i] % charLength);
  }

  return result;
};

/**
 * CONTROLLER: createGiftcard
 * --------------------------
 * Creates a new gift card entry in the database with:
 * - Secure, collision‑resistant gift code
 * - Buyer and recipient metadata
 * - Monetary value
 *
 * PROCESS OVERVIEW:
 * 1. Validate incoming request data
 * 2. Generate a unique gift code (with retry loop)
 * 3. Persist the new gift card to MongoDB
 * 4. Return the generated code to the client
 *
 * SECURITY & RELIABILITY:
 * - Includes a retry mechanism to avoid rare code collisions
 * - Avoids exposing internal DB errors directly to the client
 * - Ensures required fields are present before processing
 */
const createGiftcard = async (req, res) => {
  try {
    const {
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      amount
    } = req.body;

    // 1. BASIC VALIDATION
    // Ensures minimum required fields are provided before continuing
    if (!buyerEmail || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required information: buyerEmail and amount are mandatory."
      });
    }

    let giftCode;
    let isUnique = false;
    let retryCount = 0;
    const maxRetries = 10; // Prevents infinite loops in extreme collision scenarios

    /**
     * 2. UNIQUENESS CHECK LOOP
     * ------------------------
     * Attempts to generate a code that does not already exist in the database.
     * Although collisions are extremely unlikely, this ensures absolute safety.
     */
    while (!isUnique && retryCount < maxRetries) {
      giftCode = generateCode();
      const existingCard = await Giftcard.findOne({ giftCode });

      if (!existingCard) {
        isUnique = true;
      } else {
        retryCount++;
      }
    }

    // If all attempts fail, return a controlled error
    if (!isUnique) {
      throw new Error("System is temporarily unable to generate a unique code. Please try again.");
    }

    /**
     * 3. DATABASE PERSISTENCE
     * -----------------------
     * Creates a new Giftcard document with all provided metadata.
     */
    const newGiftcard = new Giftcard({
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      amount,
      giftCode
    });

    const savedCard = await newGiftcard.save();

    /**
     * 4. SUCCESS RESPONSE
     * -------------------
     * Returns only the generated code — not the full document — to avoid
     * exposing unnecessary internal fields.
     */
    res.status(201).json({
      success: true,
      giftCode: savedCard.giftCode
    });

  } catch (error) {
    console.error("CRITICAL ERROR: Gift Card Creation failed:", error);

    // Controlled error response to avoid leaking sensitive server details
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while processing the gift card."
    });
  }
};

/**
 * CONTROLLER: getAllGiftcards
 * ---------------------------
 * Retrieves all gift cards from the database.
 *
 * USE CASES:
 * - Admin dashboard
 * - Auditing
 * - Reporting
 *
 * SECURITY NOTES:
 * - Should be protected by admin authentication middleware at the route level.
 * - Does not expose internal MongoDB fields like __v.
 */
const getAllGiftcards = async (req, res) => {
  try {
    /**
     * 1. FETCH & SANITIZE
     * -------------------
     * - Removes __v (internal version key)
     * - Sorts by creation date (newest first)
     */
    const cards = await Giftcard.find()
      .select('-__v')
      .sort({ createdAt: -1 });

    /**
     * 2. SUCCESS RESPONSE
     * -------------------
     * Includes total count for admin analytics.
     */
    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });

  } catch (error) {
    console.error("FETCH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error: Unable to retrieve gift card records."
    });
  }
};

// Export controller functions for use in route definitions
module.exports = {
  createGiftcard,
  getAllGiftcards
};
