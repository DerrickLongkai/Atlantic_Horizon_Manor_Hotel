import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handle login form submission.
   * Sends credentials to the backend 
   */
  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    /**
     * Send login request to backend.
     * The backend validates credentials and returns:
     * - staff info
     * - JWT token
     */
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (response.ok) {
      /**
       * Login successful:
       * Store token + staff info for authenticated sessions.
       * These will be used for protected routes and role checks.
       */
      localStorage.setItem('staffToken', data.token);
      localStorage.setItem('staffInfo', JSON.stringify(data.staff));

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      // Backend returned a controlled error (401, etc.)
      setError(data.message);
    }
  } catch (err) {
    /**
     * Network or server connection failure.
     * This is expected if backend is not running.
     */
    setError('Connection failed. Please check if backend is running on port 5001.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 font-sans relative overflow-hidden">

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md z-10 animate-fadeIn">

        {/* Header / Branding */}
        <div className="text-center mb-10">
          <p className="text-[#C5A059] text-[9px] tracking-[0.4em] uppercase mb-4">
            Internal Access Only
          </p>
          <h1 className="font-serif text-3xl tracking-widest text-white uppercase mb-2">
            Management Portal
          </h1>
          <div className="w-16 h-[1px] bg-[#C5A059]/50 mx-auto mt-6"></div>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="bg-[#111111] p-10 border border-white/10 shadow-2xl relative"
        >
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A059]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A059]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A059]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A059]"></div>

          <div className="space-y-8">

            {/* Username Field */}
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
              />
            </div>

            {/* Password Field */}
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
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 p-3">
                <p className="text-red-400 text-[9px] text-center tracking-widest uppercase">
                  {error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-[#C5A059] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-[#b45309] transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </div>
        </form>

        {/* Return to Home */}
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
