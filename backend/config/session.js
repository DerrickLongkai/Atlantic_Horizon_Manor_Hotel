// config/session.js
const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.default || connectMongo;

// Export a factory function that creates the session middleware
// This allows the server to call it AFTER dotenv.config() is called
module.exports = () => {
  // Ensure MONGO_URI is defined
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  // Create a persistent session store in MongoDB.
  // This ensures sessions survive server restarts and scale across multiple instances.
  const store = new MongoStore({
    mongoUrl: process.env.MONGO_URI,   // MongoDB connection string loaded from environment variables
    collectionName: 'sessions',      // Collection name where session documents will be stored
  });

  // Express-session configuration object.
  // This controls how sessions are created, stored, and secured.
  const sessionConfig = {
    secret: process.env.SESSION_SECRET, // Secret key used to sign the session ID cookie (must remain private)
    resave: false,                      // Prevents resaving sessions that haven't been modified
    saveUninitialized: false,           // Avoids creating empty sessions for unauthenticated users
    store: store,                       // Use MongoDB as the persistent session storage backend

    cookie: {       
      maxAge: 1000 * 60 * 60 * 24 * 10, // Session lifetime: 10 days (in milliseconds)
      httpOnly: true,                   // Protects the cookie from being accessed by client-side JavaScript (mitigates XSS)
      secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
      sameSite: 'lax'                   // Helps defend against CSRF while maintaining usability
    }
  };

  return session(sessionConfig);
};
