// routes/giftcardRoutes.js
const express = require('express');
const router = express.Router();
const { createGiftcard, getAllGiftcards } = require('../controllers/giftcardController');

/**
 * @route   POST /api/giftcards
 * @desc    Create and persist a new gift card
 * @access  Public (Requires validation)
 */
router.post('/', createGiftcard);

/**
 * @route   GET /api/giftcards
 * @desc    Fetch a list of all gift cards for administrative auditing
 * @access  Private (Admin Only Suggested)
 */
router.get('/', getAllGiftcards);

module.exports = router;
