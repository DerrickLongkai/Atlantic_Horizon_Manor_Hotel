import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export default function BookingBar() {
  /*  1. Initialize navigation
   * 
   * useNavigate() allows this component to trigger client-side
   * routing. We use it to redirect users to the booking page
   * while passing collected form data through route state.
   */
  const navigate = useNavigate();

  /* STATE MANAGEMENT
   * startDate / endDate:
   *   - Default to today + tomorrow.
   *   - Used by react-datepicker.
   *
   * showTravelers:
   *   - Controls visibility of the traveler dropdown panel.
   *
   * travelers:
   *   - Stores the count for each traveler category.
   *   - Adults default to 2 for a more realistic starting point.
   */
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000));
  const [showTravelers, setShowTravelers] = useState(false);

  const [travelers, setTravelers] = useState({
    adults: 2,
    seniors: 0,
    children: 0
  });

  // Derived state for convenience and readability.
  const totalTravelers = travelers.adults + travelers.seniors + travelers.children;

  /* 2. Handle "Book Now" click
   * - Logs data for debugging during development.
   * - Navigates to /booking.
   * - Passes booking details through route state.
   * - Dates are converted to formatted strings to avoid losing
   *   Date object methods during serialization.
   */
  const handleBookNow = () => {
    console.log('Navigating to Booking Page with:', { startDate, endDate, travelers, totalTravelers });

    navigate('/booking', {
      state: {
        checkIn: startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        checkOut: endDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        travelers: travelers,
        totalTravelers: totalTravelers
      }
    });
  };

  return (
    <div className="relative z-50 w-full flex justify-center px-4 bg-transparent -mt-12 md:-mt-16">

      {/* Decorative top index (01)
         - Purely visual, part of the luxury brand aesthetic.*/}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-amber-500 text-[10px] font-bold tracking-[0.3em] mb-2">01</span>
        <div className="w-10 h-[2px] bg-amber-500"></div>
      </div>

      {/*Main capsule container
         - Dark glassmorphism background.
         - Rounded pill shape.
         - Houses all booking controls.*/}
      <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-4 md:px-10 py-3 shadow-2xl max-w-6xl w-full">

        {/* CHECK-IN SELECTOR
           - Uses react-datepicker.
           - Automatically adjusts check-out if user selects a
             check-in date >= current check-out.*/}
        <div className="flex-1 px-4 relative group cursor-pointer">
          <p className="text-[9px] text-amber-500 uppercase tracking-[0.2em] mb-1 font-bold">Check-In</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (date >= endDate) {
                // Ensure check-out is always at least 1 day after check-in.
                setEndDate(new Date(date.getTime() + 86400000));
              }
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-white text-sm md:text-base font-medium tracking-widest outline-none cursor-pointer w-full"
          />
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block px-2">
          <div className="w-6 h-px bg-amber-500/30"></div>
        </div>

        {/* CHECK-OUT SELECTOR
           - Cannot be earlier than check-in.*/}
        <div className="flex-1 px-4 relative group cursor-pointer">
          <p className="text-[9px] text-amber-500 uppercase tracking-[0.2em] mb-1 font-bold">Check-Out</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
          endDate={endDate}
            minDate={startDate}
            dateFormat="dd MMM yyyy"
            className="bg-transparent text-white text-sm md:text-base font-medium tracking-widest outline-none cursor-pointer w-full"
          />
        </div>

        {/* Vertical divider (tablet+) */}
        <div className="h-8 w-px bg-white/10 mx-4 hidden sm:block"></div>

        {/* TRAVELERS SELECTOR
           - Opens a dropdown panel.
           - Displays total travelers.
           - Hidden on mobile for simplicity.
            */}
        <div className="flex-1 px-4 relative hidden sm:block">
          <div
            className="cursor-pointer"
            onClick={() => setShowTravelers(!showTravelers)}
          >
            <p className="text-[9px] text-amber-500 uppercase tracking-[0.2em] mb-1 font-bold">Travelers</p>
            <div className="flex items-center gap-3">
              <p className="text-white text-sm md:text-base font-medium">
                {totalTravelers} <span className="text-white/40 text-[10px] ml-1 uppercase tracking-tighter">Total</span>
              </p>
              <span className={`text-amber-500 text-[8px] transition-transform duration-300 ${showTravelers ? 'rotate-180' : ''}`}>▼</span>
            </div>
          </div>

          {/* Traveler dropdown panel
             - Contains counters for Adults, Seniors, Children.
             - Uses Math.max() to enforce minimum values.*/}
          {showTravelers && (
            <div className="absolute top-full mt-6 left-0 w-72 bg-[#111111] border border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-fadeIn">
              <div className="space-y-8">

                {/* Adults */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-semibold">Adults</p>
                    <p className="text-[10px] text-white/40 mt-1">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setTravelers({ ...travelers, adults: Math.max(1, travelers.adults - 1) })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >—</button>
                    <span className="text-white text-sm font-medium w-4 text-center">{travelers.adults}</span>
                    <button
                      onClick={() => setTravelers({ ...travelers, adults: travelers.adults + 1 })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Seniors */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-semibold">Seniors</p>
                    <p className="text-[10px] text-white/40 mt-1">Ages 65 or above</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setTravelers({ ...travelers, seniors: Math.max(0, travelers.seniors - 1) })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >—</button>
                    <span className="text-white text-sm font-medium w-4 text-center">{travelers.seniors}</span>
                    <button
                      onClick={() => setTravelers({ ...travelers, seniors: travelers.seniors + 1 })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white text-[11px] tracking-[0.2em] uppercase font-semibold">Children</p>
                    <p className="text-[10px] text-white/40 mt-1">Ages 2–12</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setTravelers({ ...travelers, children: Math.max(0, travelers.children - 1) })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >—</button>
                    <span className="text-white text-sm font-medium w-4 text-center">{travelers.children}</span>
                    <button
                      onClick={() => setTravelers({ ...travelers, children: travelers.children + 1 })}
                      className="text-amber-500 hover:text-white text-lg transition-colors"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Apply button — closes dropdown */}
              <button
                onClick={() => setShowTravelers(false)}
                className="w-full mt-10 py-4 bg-white/5 border border-white/10 text-amber-500 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-amber-600 hover:text-white transition-all duration-500"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* 3. Book Now button
           - Calls handleBookNow().
           - Triggers navigation and passes booking data.*/}
        <div className="flex-shrink-0">
          <button
            onClick={handleBookNow}
            className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-8 md:px-12 py-4 rounded-full text-[10px] md:text-xs tracking-[0.2em] transition-all duration-300 uppercase shadow-lg shadow-orange-900/40 active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}


