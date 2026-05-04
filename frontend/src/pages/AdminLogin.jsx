import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle Login Submission
   * Sends the staff credentials to the backend using Axios.
   *
   * Important:
   * - Axios is globally configured with `withCredentials = true`
   *   (in index.js), so the browser automatically includes the
   *   session cookie in every request.
   * - The backend creates the session and returns staff info.
   * - The session ID itself is stored securely in an HTTP-only
   *   cookie, not in localStorage.
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send POST request to backend (port 8888)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, credentials,
        { withCredentials: true });

      // Axios automatically parses JSON into response.data
      const data = response.data;

      if (data.success) {
        /**
         * Login successful:
         * Store only non-sensitive staff info for UI display.
         * Authentication is handled entirely by the session cookie.
         */
        localStorage.setItem('staffInfo', JSON.stringify(data.staff));

        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      }
    } catch (err) {
    
      /**
       * -------------------------------------------------------------
       * Error Handling
       * -------------------------------------------------------------
       * Two main cases:
       * 1. Backend responded with an error (e.g., 401 invalid login)
       * 2. Network/CORS/server failure (backend offline)
       */
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError(
          'Connection failed. Please check if backend is running on port 8888.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    /**
     * MAIN CONTAINER
     * Full-height viewport with centered card
     * Dark background (#0a0a0a) for luxury aesthetic
     * Includes decorative glow effect in background
     */
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans relative overflow-hidden">

      {/* DECORATIVE BACKGROUND GLOW */}
      {/* Subtle gold blur behind the login card for visual depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      {/* LOGIN CARD CONTAINER */}
      <div className="w-full max-w-md z-10 animate-fadeIn">

        {/* HEADER SECTION */}
        {/* Branding and access restriction notice */}
        <div className="text-center mb-10">
          <p className="text-[#C5A059] text-[9px] tracking-[0.4em] uppercase mb-4">
            Internal Access Only
          </p>
          <h1 className="font-serif text-3xl tracking-widest text-white uppercase mb-2">
            Management Portal
          </h1>
          {/* Decorative divider line */}
          <div className="w-16 h-[1px] bg-[#C5A059]/50 mx-auto mt-6"></div>
        </div>

        {/* LOGIN FORM */}
        {/* Main form for credential entry and submission */}
        <form
          onSubmit={handleLogin}
          className="bg-[#111111] p-10 border border-white/10 shadow-2xl relative"
        >
          {/* DECORATIVE CORNER ACCENTS */}
          {/* Subtle gold borders at each corner for luxury appeal */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A059]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A059]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A059]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A059]"></div>

          <div className="space-y-8">

            {/* FORM FIELD 1: USERNAME INPUT */}
            <div>
              <label className="block text-[9px] tracking-[0.2em] text-gray-500 mb-3 uppercase">
                Staff Username
              </label>
              <input
                type="text"
                required
                placeholder="e.g. boss"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-800 pb-3 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors tracking-widest placeholder-gray-800"
                aria-label="Staff username"
              />
            </div>

            {/* FORM FIELD 2: PASSWORD INPUT */}
            <div>
              <label className="block text-[9px] tracking-[0.2em] text-gray-500 mb-3 uppercase">
                Authorization Key
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-800 pb-3 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors tracking-widest placeholder-gray-800"
                aria-label="Staff password"
              />
            </div>

            {/* ERROR MESSAGE DISPLAY */}
            {/* Shows authentication errors if login fails */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 p-3">
                <p className="text-red-400 text-[9px] text-center tracking-widest uppercase">
                  {error}
                </p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            {/* Triggers login submission; disabled while authenticating */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-[#C5A059] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-[#b45309] transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </div>
        </form>

        {/* RETURN TO HOME LINK */}
        {/* Navigation back to public estate for non-staff users */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 text-[9px] tracking-[0.3em] uppercase hover:text-white transition-colors"
          >
            ← Return to Public Estate
          </button>
        </div>

      </div>
    </div>
  );
}
