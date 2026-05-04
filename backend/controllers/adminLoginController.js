// controllers/adminLoginController.js

const Staff = require('../models/Staff');       // Mongoose model for staff/admin accounts
const LoginLog = require('../models/LoginLog'); // Mongoose model for security audit logs

/**
 * CONTROLLER: loginStaff
 * ----------------------
 * Handles staff/admin authentication using session-based login.
 *
 * PROCESS OVERVIEW:
 * 1. Validate credentials
 * 2. Verify password using Staff model's matchPassword()
 * 3. Write a security audit log (IP + user-agent + status)
 * 4. Store login state in the session
 * 5. Return authenticated staff info to the client
 *
 * SECURITY NOTES:
 * - Uses session cookies instead of JWT for admin-level security.
 * - Logs every successful login attempt for auditing and traceability.
 * - Does NOT expose password hashes or sensitive fields.
 */
const loginStaff = async (req, res) => {
  const { username, password } = req.body;
  console.log(`>>> [DEBUG] Attempting login for: ${username}`);

  try {
    // 1. Look up staff by username
    const staff = await Staff.findOne({ username });

    // 2. Validate password using model method
    if (staff && (await staff.matchPassword(password))) {
      console.log(`>>> [DEBUG] Password matched for ${staff.name}. Creating log...`);

      /**
       * 3. SECURITY AUDIT LOG
       * ---------------------
       * Records:
       * - Staff ID
       * - Username
       * - Role
       * - IP address (proxy-aware)
       * - Browser user-agent
       * - Login status
       *
       * Logging failures do NOT block login, but are printed for investigation.
       */
      try {
        await LoginLog.create({
          staffId: staff._id,
          username: staff.username,
          role: staff.role,
          ipAddress:
            req.ip ||
            req.headers['x-forwarded-for'] ||
            req.connection?.remoteAddress ||
            '127.0.0.1',
          userAgent: req.headers['user-agent'] || 'Unknown Browser',
          loginStatus: 'Success',
        });
      } catch (logError) {
        console.error('CRITICAL: Failed to create login log:', logError.message);
      }

      /**
       * 4. SESSION STORAGE
       * Stores essential identity information inside the session.
       * This allows persistent authentication across requests.
       */
      req.session.staffId = staff._id;
      req.session.role = staff.role;
      req.session.username = staff.username;

      /**
       * 5. SAVE SESSION
       * Ensures the session is fully written before sending the response.
       */
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({
            success: false,
            message: 'Session storage error.',
          });
        }

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

      return; // Prevents fall-through
    }

    /**
     * INVALID CREDENTIALS
     * Returns 401 without revealing which field was incorrect.
     */
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
};

/**
 * CONTROLLER: logoutStaff
 * Destroys the session and clears the session cookie.
 *
 * SECURITY NOTES:
 * - Ensures server-side session invalidation.
 * - Clears cookie to prevent stale session reuse.
 */
const logoutStaff = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Logout failed',
      });
    }

    // Remove session cookie from client
    res.clearCookie('connect.sid');

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  });
};

/**
 * CONTROLLER: getMe
 * Returns the currently authenticated staff member based on session data.
 *
 * USE CASES:
 * - Admin dashboard auto-login
 * - Session persistence checks
 *
 * SECURITY NOTES:
 * - Password field is excluded from the returned document.
 */
const getMe = async (req, res) => {
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
};

// Export controller functions for use in route definitions
module.exports = {
  loginStaff,
  logoutStaff,
  getMe
};
