import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import axios from 'axios';

/**
 * -------------------------------------------------------------
 * Global Axios Configuration
 * -------------------------------------------------------------
 * Enables axios to automatically include cookies (such as the
 * session ID from express-session) with every request.
 *
 *  required:
 * - Session-based authentication depends on the browser sending
 *   the session cookie back to the server on each request.
 * - Without `withCredentials = true`, the browser will NOT send
 *   cookies for cross-origin requests (e.g., localhost:5173 → 8888).
 *
 * ensures:
 * - Login persists across page refreshes
 * - Protected admin routes can verify the session
 * - Logout properly clears the session cookie
 */
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
