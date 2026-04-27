const express = require('express');
const router = express.Router();

// Models
const Booking = require('../models/Booking');
const Giftcard = require('../models/Giftcard');
const LoginLog = require('../models/LoginLog');

// Middlewares
// Note: Ensure your protectAdmin middleware uses the updated session‑based authentication logic
const { protectAdmin } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

/**
 * -------------------------------------------------------------
 * 1. BOOKING MANAGEMENT
 * Access: staff, manager, boss
 * -------------------------------------------------------------
 */
router.get(
  '/bookings',
  protectAdmin,
  authorizeRoles('staff', 'manager', 'boss'),
  async (req, res) => {
    try {
      const bookings = await Booking.find({}).sort({ createdAt: -1 });
      res.json({
        success: true,
        count: bookings.length,
        data: bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error while fetching bookings.',
      });
    }
  }
);

/**
 * -------------------------------------------------------------
 * 2. GIFTCARD MANAGEMENT
 * Access: manager, boss only
 * -------------------------------------------------------------
 */
router.get(
  '/giftcards',
  protectAdmin,
  authorizeRoles('manager', 'boss'),
  async (req, res) => {
    try {
      const giftcards = await Giftcard.find({}).sort({ createdAt: -1 });
      res.json({
        success: true,
        data: giftcards,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error while fetching giftcards.',
      });
    }
  }
);

/**
 * -------------------------------------------------------------
 * 3. SECURITY LOG MANAGEMENT
 * Access: boss only
 * -------------------------------------------------------------
 */
router.get(
  '/logs',
  protectAdmin,
  authorizeRoles('boss'), // Role guard replaces the previous internal role check
  async (req, res) => {
    try {
      // Business logic remains clean and focused: only fetch logs
      const logs = await LoginLog.find({})
        .sort({ timestamp: -1 })
        .limit(50);

      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error while fetching security logs.',
      });
    }
  }
);

module.exports = router;

