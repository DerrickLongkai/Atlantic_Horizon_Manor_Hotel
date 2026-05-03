// controllers/adminManageController.js

const Booking = require('../models/Booking');     // Mongoose model for hotel bookings
const Giftcard = require('../models/Giftcard');   // Mongoose model for issued gift cards
const LoginLog = require('../models/LoginLog');   // Mongoose model for security audit logs

/**
 * CONTROLLER: getAllBookings
 * --------------------------
 * Retrieves all booking records from the database.
 *
 * ACCESS LEVEL:
 * - Staff
 * - Manager
 * - Boss
 *
 * PURPOSE:
 * - Admin dashboard booking management
 * - Operational oversight
 * - Reporting and auditing
 *
 * NOTES:
 * - Sorted by creation date (newest first)
 * - Should be protected by RBAC middleware at the route level
 */
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    console.error("ERROR: Failed to fetch bookings:", error);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings.',
    });
  }
};

/**
 * CONTROLLER: getAllGiftcards
 * ---------------------------
 * Retrieves all gift card records from the database.
 *
 * ACCESS LEVEL:
 * - Manager
 * - Boss
 *
 * PURPOSE:
 * - Gift card center management
 * - Financial auditing
 * - Customer service operations
 *
 * NOTES:
 * - Sorted by creation date (newest first)
 * - Should be protected by RBAC middleware at the route level
 */
const getAllGiftcards = async (req, res) => {
  try {
    const giftcards = await Giftcard.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: giftcards,
    });

  } catch (error) {
    console.error("ERROR: Failed to fetch giftcards:", error);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching giftcards.',
    });
  }
};

/**
 * CONTROLLER: getAllLogs
 * ----------------------
 * Retrieves the most recent security login logs.
 *
 * ACCESS LEVEL:
 * - Boss only
 *
 * PURPOSE:
 * - Security auditing
 * - Monitoring suspicious login attempts
 * - Compliance and traceability
 *
 * NOTES:
 * - Limits results to the 50 most recent logs
 * - Sorted by timestamp (newest first)
 * - Should be protected by RBAC middleware at the route level
 */
const getAllLogs = async (req, res) => {
  try {
    const logs = await LoginLog.find({})
      .sort({ timestamp: -1 })
      .limit(50);

    res.json({
      success: true,
      data: logs,
    });

  } catch (error) {
    console.error("ERROR: Failed to fetch security logs:", error);

    res.status(500).json({
      success: false,
      message: 'Server error while fetching security logs.',
    });
  }
};

// @desc    Update the status of a booking
// @route   PATCH /api/admin/manage/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const newStatus = req.body.status; 

   
    const validStatuses = ['PENDING', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'COMPLETED'];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid status provided.' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: newStatus },
      { new: true } 
    );

    
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    
    res.status(200).json({ 
      success: true, 
      message: 'Status updated successfully', 
      data: updatedBooking 
    });

  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Export controller functions for use in admin routes
module.exports = {
  getAllBookings,
  getAllGiftcards,
  getAllLogs,
  updateBookingStatus,
};
