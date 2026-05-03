const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const createSessionMiddleware = require('./config/session.js'); 

// Load environment variables from .env
dotenv.config();
// Initialize MongoDB connection
connectDB();

// Create session middleware after environment is loaded
const sessionMiddleware = createSessionMiddleware();

const app = express();

/**
 * -------------------------------------------------------------
 * CORS Configuration
 * -------------------------------------------------------------
 * Allows the frontend (React/Vite) to communicate with this API
 * while sending credentials such as session cookies.
 */
//Obtain the environment variable. If it is not configured, for safety reasons, by default, only one non-existent address or an empty array is allowed
const allowedOriginsStr = process.env.FRONTEND_URL || '';
// Split the string into an array of allowed origins (e.g., ['http://localhost:3000', 'http://localhost:5173'])
const allowedOrigins = allowedOriginsStr.split(',');
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl) or if the origin is in the allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Required for cookies to be included in cross-origin requests
  })
);

// Parse incoming JSON request bodies
app.use(express.json());
app.set('trust proxy', 1); // Trust the first proxy (if behind a reverse proxy like Nginx or Heroku)
/**
 * -------------------------------------------------------------
 * Session Middleware
 * -------------------------------------------------------------
 * Session configuration is abstracted into /config/session.js
 * for cleaner structure and easier maintenance.
 */
app.use(sessionMiddleware);

/**
 * -------------------------------------------------------------
 * Request Logging Middleware (Debugging Helper)
 * -------------------------------------------------------------
 * Logs essential request details to help diagnose issues during
 * development. Disable or adjust verbosity in production.
 */
app.use((req, res, next) => {
  console.log(`--- [${new Date().toLocaleTimeString()}] NEW REQUEST ---`);
  console.log(`Method: ${req.method} | URL: ${req.url}`);
  console.log('Body:', req.body);
  next();
});

/**
 * -------------------------------------------------------------
 * Route Mounting
 * -------------------------------------------------------------
 * All API routes are organized by feature domain for clarity.
 */
app.use('/api/admin/manage', require('./routes/adminManageRoutes'));
app.use('/api/giftcards', require('./routes/giftcardRoutes'));
app.use('/api/cookies', require('./routes/cookieRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminLoginRoutes'));

// Server Port
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
