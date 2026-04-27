const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();
const app = express();


// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(`--- [${new Date().toLocaleTimeString()}] NEW REQUEST ---`);
  console.log(`Method: ${req.method} | URL: ${req.url}`);
  console.log("Body:", req.body); // Check if body is being parsed correctly
  next();
});

// Route mounting
app.use('/api/giftcards', require('./routes/giftcardRoutes'));
app.use('/api/cookies', require('./routes/cookieRoutes')); 
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./routes/adminLoginRoutes'));
app.use('/api/admin/manage', require('./routes/adminManageRoutes'));

// Define Port
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});