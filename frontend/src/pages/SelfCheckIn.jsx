import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelfCheckIn() {
  // Store user input (name + email)
  const [searchData, setSearchData] = useState({ name: '', email: '' });

  // Store booking result returned from backend
  const [result, setResult] = useState(null);

  // Store error messages (e.g. not found / server error)
  const [error, setError] = useState('');

  // Control loading state (for UI feedback)
  const [loading, setLoading] = useState(false);
  
  // 1. NEW: Controls whether the "Check-In Successful" screen is shown
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // React Router navigation
  const navigate = useNavigate();

  // Handle booking search submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset UI state before making request
    setLoading(true);
    setError('');
    setResult(null);

    // Reset check-in state when performing a new search
    setIsCheckedIn(false);

    try {
      // Send POST request to backend API
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        // Send search input (name + email)
        body: JSON.stringify(searchData)
      });

      // Parse response from backend
      const data = await response.json();

      // If successful → store booking result
      if (response.ok) {
        setResult(data.booking);
      } else {
        // Backend returned error (e.g. no matching booking)
        setError(data.message);
      }

    } catch (err) {
      // Handle network or server failure
      setError('Connection failed. Please try again.');
    } finally {
      // Always stop loading state
      setLoading(false);
    }
  };

  // 2. RENDER: Show a clean success screen after check-in
  if (isCheckedIn) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 animate-fadeIn">
        <div className="max-w-md w-full text-center bg-[#1a1c19] border border-[#C5A059] p-16 shadow-2xl">
          
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full border border-[#C5A059] flex items-center justify-center">
              <svg className="w-10 h-10 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="font-serif text-3xl tracking-[0.2em] text-white uppercase mb-4">
            Check-In Successful
          </h2>

          {/* Subtext / Branding */}
          <p className="text-gray-400 text-[10px] tracking-[0.2em] uppercase mb-12">
            Welcome to Atlantic Horizon Manor
          </p>

          {/* Navigate back to homepage */}
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-[#C5A059] text-white text-[10px] tracking-[0.3em] font-bold uppercase transition-all hover:bg-[#b45309]"
          >
            Return to Estate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-24 px-4 font-sans">
      <div className="max-w-xl mx-auto">

        {/* Page Header */}
        <header className="text-center mb-12">
          <p className="text-[#C5A059] text-[10px] tracking-[0.3em] uppercase mb-4">
            Guest Portal
          </p>
          <h1 className="font-serif text-4xl tracking-widest uppercase">
            Self Check-In
          </h1>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6"></div>
        </header>

        {/* SEARCH FORM (shown when no result yet) */}
        {!result && (
          <form 
            onSubmit={handleSearch} 
            className="bg-[#1a1c19] p-10 border border-white/5 shadow-2xl"
          >
            <div className="space-y-8">

              {/* Name Input */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] text-[#C5A059] mb-3 uppercase">
                  Booking Name
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="DERRICK ZHANG"

                  // Controlled input bound to React state
                  value={searchData.name}

                  // Update state on user input
                  onChange={(e) => 
                    setSearchData({ ...searchData, name: e.target.value })
                  }

                  className="w-full bg-transparent border-b border-gray-700 pb-2 text-sm focus:outline-none focus:border-[#C5A059] transition-colors uppercase tracking-widest"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] text-[#C5A059] mb-3 uppercase">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  placeholder="GUEST@EXAMPLE.COM"

                  value={searchData.email}

                  onChange={(e) => 
                    setSearchData({ ...searchData, email: e.target.value })
                  }

                  className="w-full bg-transparent border-b border-gray-700 pb-2 text-sm focus:outline-none focus:border-[#C5A059] transition-colors tracking-widest"
                />
              </div>

              {/* Submit Button */}
              <button 
                className="w-full py-4 bg-[#497a3f] text-white text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-[#b45309] transition-all"
                disabled={loading} // Disable while request is in progress
              >
                {/* Dynamic label based on loading state */}
                {loading ? 'Searching...' : 'Find Reservation'}
              </button>
            </div>

            {/* Error message display */}
            {error && (
              <p className="text-red-400 text-[9px] mt-6 text-center tracking-widest uppercase">
                {error}
              </p>
            )}
          </form>
        )}

        {/* RESULT DISPLAY (shown after successful search) */}
        {result && (
          <div className="animate-fadeIn bg-[#1a1c19] border border-[#C5A059]/30 p-10 shadow-2xl">
            
            {/* Section Title */}
            <h2 className="font-serif text-2xl mb-8 tracking-widest text-center border-b border-white/10 pb-6 uppercase">
              Reservation Found
            </h2>
            
            {/* Booking Details */}
            <div className="space-y-4 text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-10">

              <div className="flex justify-between">
                <span className="text-[#C5A059]">Room:</span> 
                <span className="text-white">{result.roomType}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#C5A059]">Check-in:</span> 
                <span className="text-white">{result.checkIn}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#C5A059]">Check-out:</span> 
                <span className="text-white">{result.checkOut}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#C5A059]">Status:</span> 
                <span className="text-green-500">
                  {result.status || 'Confirmed'}
                </span>
              </div>
            </div>

            {/* 3. BUTTON LAYOUT: Side-by-side Back + Check-In */}
            <div className="flex gap-4">

              {/* Reset to search form */}
              <button 
                onClick={() => setResult(null)}
                className="flex-1 py-4 border border-gray-700 text-gray-500 text-[9px] tracking-[0.2em] uppercase hover:text-white transition-colors"
              >
                Back
              </button>

              {/* Trigger check-in success state */}
              <button 
                onClick={() => setIsCheckedIn(true)}
                className="flex-1 py-4 bg-[#C5A059] text-white text-[9px] tracking-[0.2em] uppercase font-bold hover:bg-[#b45309] transition-all shadow-lg"
              >
                Check-In Now
              </button>
            </div>
          </div>
        )}
        
        {/* Navigation back to homepage */}
        <button 
          onClick={() => navigate('/')} 
          className="w-full mt-8 text-gray-600 text-[9px] tracking-[0.3em] uppercase hover:text-white transition-colors"
        >
          ← Return to Estate
        </button>

      </div>
    </div>
  );
}