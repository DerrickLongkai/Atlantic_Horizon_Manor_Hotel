const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

/**
 * Middleware: Protect internal admin routes using JWT authentication.
 *
 * This middleware checks:
 * 1. Whether the request contains a valid Bearer token
 * 2. Whether the token can be verified using the server secret
 * 3. Whether the decoded token corresponds to an existing staff member
 *
 * If valid → attaches staff info to req.staff and continues.
 * If invalid → returns 401 Unauthorized.
 */
const protectAdmin = async (req, res, next) => {
  let token;

  // ------------------------------------------------------------
  // Check if the Authorization header exists and uses Bearer format
  // Example: "Authorization: Bearer <token>"
  // ------------------------------------------------------------
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token (split "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // ------------------------------------------------------------
      // Verify and decode the token
      // - Ensures token is not expired
      // - Ensures token is not tampered with
      // ------------------------------------------------------------
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'manor_secret_key_2024'
      );

      // ------------------------------------------------------------
      // Look up the staff member using the decoded ID
      // `.select('-password')` removes the password field for safety
      // ------------------------------------------------------------
      req.staff = await Staff.findById(decoded.id).select('-password');

      // If staff no longer exists (deleted or disabled)
      if (!req.staff) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, staff account not found.',
        });
      }

      // Authentication successful → continue to the next middleware/route
      return next();
    } catch (error) {
      console.error('Token verification failed:', error);

      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token.',
      });
    }
  }

  // ------------------------------------------------------------
  // No token provided at all
  // ------------------------------------------------------------
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided.',
    });
  }
};

module.exports = { protectAdmin };
