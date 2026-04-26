const mongoose = require('mongoose');

/**
 * LoginLog Schema
 *
 * Stores a record of every staff login attempt.
 * Useful for:
 * - Security auditing
 * - Tracking suspicious activity
 * - Monitoring staff access patterns
 * - Internal compliance logs
 */
const loginLogSchema = new mongoose.Schema({
  // Reference to the staff member who attempted login
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true,
  },

  // Username used during login (stored for historical accuracy)
  username: {
    type: String,
    required: true,
  },

  // Staff role at the time of login (boss / manager / staff)
  role: {
    type: String,
    required: true,
  },

  // IP address of the client making the request
  ipAddress: {
    type: String,
  },

  // Browser / device information from the User-Agent header
  userAgent: {
    type: String,
  },

  // Login result: "Success", "Failed", "Locked", etc.
  loginStatus: {
    type: String,
    default: 'Success',
  },

  // Timestamp of the login attempt
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
