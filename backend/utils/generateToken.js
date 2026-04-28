const jwt = require('jsonwebtoken');

/**
 * Generate a JWT for a staff member.
 * -------------------------------------------------------
 * The token stores the staff ID as payload and expires
 * after 30 days. The secret key should always be stored
 * in an environment variable for security.
 */
const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.JWT_SECRET || 'manor_secret_key_2024', // fallback for development
    {
      expiresIn: '30d', // Token validity period
    }
  );
};

module.exports = generateToken;
