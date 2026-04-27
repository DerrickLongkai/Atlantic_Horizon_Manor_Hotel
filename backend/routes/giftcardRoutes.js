const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // Node.js native crypto for secure random values
const Giftcard = require('../models/Giftcard'); // Mongoose model for data persistence

/**
 * UTILITY: generateCode
 * ---------------------
 * Generates an 8-character alphanumeric string.
 * * CHARACTER SELECTION:
 * We exclude 'I', 'O', '0', '1', and 'L' (homoglyphs) to prevent user errors 
 * when codes are read from printed materials or low-resolution screens.
 *
 * ENTROPY:
 * Uses crypto.randomBytes(8) to ensure the values are non-deterministic,
 * making the gift codes significantly harder to guess than Math.random().
 * * @returns {string} - A unique 8-character string (e.g., "K7NWX2RP")
 */
const generateCode = () => {
  // 31 character set (36 total minus 5 confusing chars)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const charLength = chars.length;
  let result = '';
  
  // Generate 8 random bytes to derive 8 characters
  const randomBytes = crypto.randomBytes(8);
  
  for (let i = 0; i < 8; i++) {
    // Map each byte to a character in our set using the modulo operator
    // Note: While modulo can introduce slight bias, at 31 chars it is negligible for this use case.
    result += chars.charAt(randomBytes[i] % charLength);
  }
  
  return result;
};





// ！！！！！ REQUEST TO DATABASE ! ! ! ! !
/**
 * @route   POST /api/giftcards
 * @desc    Create and persist a new gift card with a collision-resistant code
 * @access  Public (Requires validation)
 */
router.post('/', async (req, res) => {
  try {
    const {
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      amount
    } = req.body;

    // 1. DATA VALIDATION
    // Ensure critical fields exist before proceeding to expensive DB operations
    if (!buyerEmail || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required information: buyerEmail and amount are mandatory." 
      });
    }

    let giftCode;
    let isUnique = false;
    let retryCount = 0;
    const maxRetries = 10; // Prevent infinite loops in the event of high collision rates

    // 2. UNIQUENESS CHECK (Collision Avoidance Loop)
    // Even with secure randomness, we must verify the code doesn't exist in the DB.
    while (!isUnique && retryCount < maxRetries) {
      giftCode = generateCode();
      
      // Check database for existing record
      const existingCard = await Giftcard.findOne({ giftCode });
      
      if (!existingCard) {
        isUnique = true; // Code is clear to use
      } else {
        retryCount++; // Increment and try again
      }
    }

    // If we exceed max retries, the code space might be too crowded (unlikely for 8 chars)
    // or there is a database latency issue.
    if (!isUnique) {
      throw new Error("System is temporarily unable to generate a unique code. Please try again.");
    }

    // 3. PERSISTENCE
    // Construct the new document using the validated data and generated code
    const newGiftcard = new Giftcard({
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      amount,
      giftCode
    });

//This triggers the 'INSERT' command to MongoDB database.
// 'await' pauses execution here until the database confirms the data is safely stored.
// 'savedCard' receives the final document from the DB (including its unique _id).
    const savedCard = await newGiftcard.save();

    // 4. RESPONSE
    // Return the gift code so the client can display it or send it via email
    res.status(201).json({
      success: true,
      giftCode: savedCard.giftCode
    });

  } catch (error) {
    // Log full error for server-side debugging; return user-friendly message to client
    console.error("CRITICAL ERROR: Gift Card Creation failed:", error);
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while processing the gift card."
    });
  }
});


// ！！！！！ RESPONSE FROM DATABASE ! ! ! ! !
/**
 * @route   GET /api/giftcards
 * @desc    Fetch a list of all gift cards for administrative auditing
 * @access  Private (Admin Only Suggested)
 */
router.get('/', async (req, res) => {
  try {
    /**
     * SECURITY ADVISORY:
     * This route exposes all gift card data. In a production environment, 
     * ensure an 'isAdmin' middleware is applied here to prevent unauthorized access.
     */
    
    // 1. DATA FETCHING & SANITIZATION
    const cards = await Giftcard.find()
      .select('-__v')       // Remove MongoDB versioning field
      .sort({ createdAt: -1 }); // Show most recent cards first

    // 2. SUCCESS RESPONSE
    res.status(200).json({
      success: true,
      count: cards.length, // Include count for easier frontend pagination logic
      data: cards
    });

  } catch (error) {
    // 500 Status indicates a server-side failure (e.g., DB connection lost)
    console.error("FETCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Unable to retrieve gift card records."
    });
  }
});

module.exports = router;
