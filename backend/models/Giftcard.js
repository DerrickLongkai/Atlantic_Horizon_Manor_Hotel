const mongoose = require('mongoose');

/**
 * Gift Card Schema
 * Defines the structure of gift card documents stored in MongoDB.
 * Includes validation rules to ensure data consistency.
 */
const giftcardSchema = new mongoose.Schema({

  /**
   * 1. Gift Amount
   * - Required field
   * - Restricted to predefined values for business control
   */
  amount: { 
    type: Number, 
    required: [true, 'Please provide the amount'],
    enum: [500, 1000, 2000, 5000] // Only allow these fixed values
  },

  /**
   * 2. Recipient Name
   * - Name of the person receiving the gift card
   */
  recipientName: {
    type: String,
    required: [true, 'Please provide the recipient name']
  },

  /**
   * 3. Recipient Email
   * - Must follow valid email format
   */
  recipientEmail: { 
    type: String, 
    required: [true, 'Please provide the recipient email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },

  /**
   * 4. Buyer Name
   * - Person purchasing the gift card
   */
  buyerName: { 
    type: String, 
    required: [true, 'Please provide the buyer name'] 
  },

  /**
   * 5. Buyer Email
   * - Email of the purchaser
   */
   buyerEmail: {
    type: String,
    required: [true, 'Please provide the buyer email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },

  /**
   * 6. Gift Code (Core Identifier)
   * - Unique redemption code for the gift card
   * - Must be unique across the database
   */
  giftCode: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate codes exist
  },

  /**
   * 7. Status
   * Tracks lifecycle of the gift card:
   * - Active: usable
   * - Used: already redeemed
   * - Expired: no longer valid
   */
  status: { 
    type: String, 
    enum: ['Active', 'Used', 'Expired'], 
    default: 'Active' 
  },

  /**
   * 8. Creation Timestamp
   * Automatically records when the gift card was created
   */
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Giftcard', giftcardSchema);