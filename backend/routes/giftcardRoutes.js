const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // Crypto module for generating secure random values
const Giftcard = require('../models/Giftcard');

/**
 * Generate a unique gift card code using cryptographically secure randomness.
 * Confusing characters removed: I, O, 0, 1, L
 */
const generateCode = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const charLength = chars.length;
  let result = '';
  
  // Use crypto.randomBytes for stronger randomness
  const randomBytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(randomBytes[i] % charLength);
  }
  
  return result;
};

// !!! REQUEST !!!
/**
 * @route   POST /api/giftcards
 * @desc    Create a new gift card (with uniqueness check)
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

    // Basic validation
    if (!buyerEmail || !amount) {
      return res.status(400).json({ success: false, message: "Please fill in the required fields" });
    }

    let giftCode;
    let isUnique = false;
    let retryCount = 0;
    const maxRetries = 10;

    // Ensure the generated code is unique in the database
    while (!isUnique && retryCount < maxRetries) {
      giftCode = generateCode();
      const existingCard = await Giftcard.findOne({ giftCode });
      if (!existingCard) {
        isUnique = true;
      }
      retryCount++;
    }

    if (!isUnique) {
      throw new Error("Unable to generate a unique gift card code. Please try again later.");
    }

    const newGiftcard = new Giftcard({
      buyerName,
      buyerEmail,
      recipientName,
      recipientEmail,
      amount,
      giftCode
    });

    const savedCard = await newGiftcard.save();

    res.status(201).json({
      success: true,
      giftCode: savedCard.giftCode
    });

  } catch (error) {
    console.error("Create Giftcard Error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Creation failed"
    });
  }
});


// !!! RESPONSE !!!
/**
 * @route   GET /api/giftcards
 * @desc    Get all gift cards (recommended for admin use only)
 */
router.get('/', async (req, res) => {
  try {
    // 💡 Security suggestion: Add admin authentication middleware here (e.g., authAdmin)
    
    // Return only necessary fields; avoid exposing sensitive giftCode if not required
    const cards = await Giftcard.find()
      .select('-__v') // Exclude internal version field
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cards.length,
      data: cards
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;
