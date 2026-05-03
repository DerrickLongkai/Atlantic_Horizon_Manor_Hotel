// routes/adminManageRoutes.js
const express = require('express');
const router = express.Router();

//Middlewares
const { protectAdmin } = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Controller
const { 
  getAllBookings, 
  getAllGiftcards, 
  getAllLogs 
} = require('../controllers/adminManageController');

/**
 * 1. BOOKING MANAGEMENT
 * Access: staff, manager, boss
 */
router.get(
  '/bookings',
  protectAdmin,
  authorizeRoles('staff', 'manager', 'boss'),
  getAllBookings
);

/**
 * 2. GIFTCARD MANAGEMENT
 * Access: manager, boss only
 */
router.get(
  '/giftcards',
  protectAdmin,
  authorizeRoles('manager', 'boss'),
  getAllGiftcards
);

/**
 * 3. SECURITY LOG MANAGEMENT
 * Access: boss only
 */
router.get(
  '/logs',
  protectAdmin,
  authorizeRoles('boss'),
  getAllLogs
);

module.exports = router;

