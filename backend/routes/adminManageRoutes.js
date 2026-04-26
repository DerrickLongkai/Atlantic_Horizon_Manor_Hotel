const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Giftcard = require('../models/Giftcard');
const LoginLog = require('../models/LoginLog'); // Added the LoginLog model
const { protectAdmin } = require('../middleware/authMiddleware');

/**
 * @desc    Fetch all bookings across the entire hotel
 * @route   GET /api/admin/manage/bookings
 * @access  Private (Staff/Manager/Boss)
 */
router.get('/bookings', protectAdmin, async (req, res) => {
  try {
    // Fetch all bookings, sorted by newest first
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings.',
    });
  }
});

/**
 * @desc    Fetch all gift cards issued by the hotel
 * @route   GET /api/admin/manage/giftcards
 * @access  Private (Manager/Boss)
 * * Note: Manager and Boss can view gift cards, regular staff might be restricted 
 * depending on your frontend logic.
 */
router.get('/giftcards', protectAdmin, async (req, res) => {
  try {
    const giftcards = await Giftcard.find({}).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: giftcards,
    });
  } catch (error) {
    console.error('Fetch Giftcards Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching giftcards.',
    });
  }
});

/**
 * @desc    Fetch Security Login Logs (Audit Trail)
 * @route   GET /api/admin/manage/logs
 * @access  Private (Boss Only)
 * * Strict Role-Based Access Control (RBAC) is implemented here.
 */
router.get('/logs', protectAdmin, async (req, res) => {
  try {
    /**
     * 1. RBAC Guard: Ensure only the "Boss" can access security logs.
     * req.staff is populated by the protectAdmin middleware.
     */
    if (req.staff.role !== 'boss') {
      console.warn(`>>> [SECURITY ALERT] Unauthorized access attempt to logs by: ${req.staff.username}`);
      return res.status(403).json({
        success: false,
        message: 'Access Denied. These records are for the Boss only.',
      });
    }

    // 2. Fetch the most recent 50 logs for the audit trail
    const logs = await LoginLog.find({}).sort({ timestamp: -1 }).limit(50);

    return res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error('Fetch Logs Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching security logs.',
    });
  }
});

module.exports = router;
