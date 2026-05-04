// Main application entry point - renders React app to DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import axios from 'axios';

// Enable axios to include session cookies in all requests (required for session-based auth)
axios.defaults.withCredentials = true;

// Create React root and render application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
