// routes/cookieRoutes.js
const express = require('express');
const router = express.Router();
const { saveCookiePreference } = require('../controllers/cookieController');

/**
 * @route   POST /api/cookies
 * @desc    Records a user's 'Accept' or 'Decline' cookie choice
 * @access  Public
 */
router.post('/', saveCookiePreference);

module.exports = router;