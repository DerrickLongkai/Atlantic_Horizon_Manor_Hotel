const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const generateToken = require('../utils/generateToken');
const LoginLog = require('../models/LoginLog');


// !!!!!!! RESPONSE FROM DATABASE ! ! ! ! !
/**
 * @desc    Staff/Admin Login with Security Auditing
 * @route   POST /api/admin/login
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`>>> [DEBUG] Attempting login for: ${username}`);

  try {
    // Look up staff account by username
    const staff = await Staff.findOne({ username });

    // Validate password using the Staff model's matchPassword method
    if (staff && (await staff.matchPassword(password))) {
      console.log(`>>> [DEBUG] Password matched for ${staff.name}. Creating log...`);

      try {
        /**
         * Create a security audit log for this login attempt.
         * Even if logging fails, the login should still succeed.
         */
        const newLog = await LoginLog.create({
          staffId: staff._id,
          username: staff.username,
          role: staff.role,

          // Capture IP address with multiple fallbacks
          ipAddress:
            req.ip ||
            req.headers['x-forwarded-for'] ||
            req.connection?.remoteAddress ||
            '127.0.0.1',

          // Capture browser/device information
          userAgent: req.headers['user-agent'] || 'Unknown Browser',

          // Mark this login as successful
          loginStatus: 'Success',
        });

        console.log(`>>> [AUDIT] Security log created: ID ${newLog._id}`);
      } catch (logError) {
        /**
         * Logging failure should NOT block login.
         * But we still want visibility into why logging failed.
         */
        console.error('CRITICAL: Failed to create login log:', logError.message);
      }

      // Successful login response
      return res.json({
        success: true,
        staff: {
          _id: staff._id,
          name: staff.name,
          username: staff.username,
          role: staff.role,
        },
        token: generateToken(staff._id),
      });
    }

    // Invalid username or password
    console.log(`>>> [AUTH] Failed login attempt for: ${username}`);
    return res
      .status(401)
      .json({ success: false, message: 'Invalid username or password.' });

  } catch (error) {
    console.error('Login Error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Server authentication error.' });
  }
});

module.exports = router;
