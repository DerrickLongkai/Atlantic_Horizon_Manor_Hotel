const Staff = require('../models/Staff');

/**
 * -------------------------------------------------------------
 * Middleware: Protect Admin Routes (Session-Based Authentication)
 * -------------------------------------------------------------
 * This middleware ensures that only authenticated staff members
 * can access internal admin routes.
 *
 * How it works:
 * 1. Checks whether the request contains a valid session
 *    (req.session.staffId).
 * 2. Looks up the corresponding staff member in the database.
 * 3. If found → attaches staff info to req.staff and continues.
 * 4. If not found → destroys the invalid session and returns 401.
 *
 * Security Notes:
 * - Session-based authentication prevents token tampering.
 * - Password is always excluded from the returned staff object.
 * - If a staff account is deleted/disabled, their session becomes invalid.
 */
const protectAdmin = async (req, res, next) => {
  /**
   * -------------------------------------------------------------
   * 1. Check if the request contains a valid session
   * -------------------------------------------------------------
   * If staffId exists, the user *should* be authenticated.
   * We still verify this against the database for safety.
   */
  if (req.session && req.session.staffId) {
    try {
      /**
       * -------------------------------------------------------------
       * 2. Look up the staff member in the database
       * -------------------------------------------------------------
       * `.select('-password')` ensures the password hash is never exposed.
       */
      req.staff = await Staff.findById(req.session.staffId).select('-password');

      /**
       * If the session exists but the staff account no longer exists
       * (e.g., deleted, disabled, or corrupted), treat it as unauthorized.
       */
      if (!req.staff) {
        // Destroy the invalid session for security hygiene
        req.session.destroy();

        return res.status(401).json({
          success: false,
          message: 'Not authorized, staff account not found.',
        });
      }

      // Authentication successful → proceed to the next middleware/route
      return next();

    } catch (error) {
      console.error('Session validation failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during authentication.',
      });
    }
  }

  /**
   * -------------------------------------------------------------
   * 3. No valid session found
   * -------------------------------------------------------------
   * This means:
   * - User is not logged in, OR
   * - Session expired, OR
   * - Cookie was cleared/blocked
   */
  return res.status(401).json({
    success: false,
    message: 'Not authorized, please log in first.',
  });
};

module.exports = { protectAdmin };

