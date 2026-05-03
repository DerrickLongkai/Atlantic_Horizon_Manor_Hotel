// routes/adminLoginRoutes.js
const express = require('express');
const router = express.Router();

const { loginStaff, logoutStaff, getMe } = require('../controllers/adminLoginController');

/**
 * @route   POST /api/admin/login
 * @desc    Staff/Admin Login
 * @access  Public
 */
router.post('/login', loginStaff);

/**
 * @route   POST /api/admin/logout
 * @desc    Staff/Admin Logout
 * @access  Private (session required)
 */
router.post('/logout', logoutStaff);

/**
 * @route   GET /api/admin/me
 * @desc    Check Current Login Status
 * @access  Private
 */
router.get('/me', getMe);

module.exports = router;
