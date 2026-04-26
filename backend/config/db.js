// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

/**
 * Asynchronous function to establish a connection to the MongoDB database.
 * This is called in server.js before the server starts listening for requests.
 */
const connectDB = async () => {
  try {
    // Attempt to connect using the URI stored in your .env file
    // Mongoose.connect returns a promise, so we use 'await'
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log a success message with the host name if the connection is successful
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs (e.g., wrong password, IP not whitelisted), catch it here
    console.error(`Error: ${error.message}`);

    // Exit the entire Node.js process with a 'failure' code (1)
    // This prevents the server from running without a working database
    process.exit(1);
  }
};

// Export the function so it can be imported and used in server.js
module.exports = connectDB;