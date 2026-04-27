const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const LoginLog = require('../models/LoginLog');

/**
 * -------------------------------------------------------------
 * Staff/Admin Login (Session-Based Authentication)
 * -------------------------------------------------------------
 * This route handles staff/admin login using server-side sessions.
 *
 * Key Behaviors:
 * - Validates username + password using the Staff model.
 * - Creates a security audit log for every successful login.
 * - Stores login state inside the session (no JWT required).
 * - Returns basic staff info to the frontend.
 *
 * Security Notes:
 * - The session cookie is HTTP-only, preventing XSS access.
 * - Session data is stored in MongoDB via connect-mongo.
 * - Even if audit logging fails, login still succeeds.
 *
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

      /**
       * -------------------------------------------------------------
       * Create a security audit log for this login attempt.
       * -------------------------------------------------------------
       * This log helps track:
       * - Who logged in
       * - From which IP
       * - Using which device/browser
       * - At what time
       *
       * Logging failures should NOT block login.
       */
      try {
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

          loginStatus: 'Success',
        });

        console.log(`>>> [AUDIT] Security log created: ID ${newLog._id}`);
      } catch (logError) {
        console.error('CRITICAL: Failed to create login log:', logError.message);
      }

      /**
       * -------------------------------------------------------------
       * Store login state inside the session
       * -------------------------------------------------------------
       * The session now contains:
       * - staffId
       * - username
       * - role
       *
       * This allows all protected routes to verify authentication
       * simply by checking req.session.staffId.
       */
      req.session.staffId = staff._id;
      req.session.role = staff.role;
      req.session.username = staff.username;

      // Explicitly save the session before sending the response
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({
            success: false,
            message: 'Session storage error.',
          });
        }

        // Successful login response (no token returned)
        return res.json({
          success: true,
          message: 'Login successful',
          staff: {
            _id: staff._id,
            name: staff.name,
            username: staff.username,
            role: staff.role,
          },
        });
      });

      return; // Prevent further execution
    }

    // Invalid username or password
    console.log(`>>> [AUTH] Failed login attempt for: ${username}`);
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server authentication error.',
    });
  }
});

/**
 * -------------------------------------------------------------
 * Staff/Admin Logout
 * -------------------------------------------------------------
 * Destroys the session and clears the session cookie.
 *
 * @route   POST /api/admin/logout
 * @access  Private (session required)
 */
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }

    // Remove session cookie from browser
    res.clearCookie('connect.sid');
    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
});

/**
 * -------------------------------------------------------------
 * Check Current Login Status
 * -------------------------------------------------------------
 * Useful for:
 * - Page refresh
 * - Auto-login
 * - Admin dashboard initialization
 *
 * If the session contains a valid staffId, return staff info.
 *
 * @route   GET /api/admin/me
 * @access  Private
 */
router.get('/me', async (req, res) => {
  if (req.session && req.session.staffId) {
    try {
      const staff = await Staff.findById(req.session.staffId).select('-password');
      if (staff) {
        return res.json({ success: true, staff });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error.',
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Not logged in',
  });
});

module.exports = router;
