import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [staffInfo, setStaffInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');

  // ------------------------------------------------------------
  // 1. Load staff authentication info on component mount
  //    - Reads staffToken + staffInfo from localStorage
  //    - If missing, redirect to login (basic route guard)
  // ------------------------------------------------------------
  useEffect(() => {
    const storedStaff = localStorage.getItem('staffInfo');

    if (!storedStaff) {
      // No valid session → force redirect to login
      navigate('/admin/login');
      return;
    }

    // Parse and store staff profile
    setStaffInfo(JSON.parse(storedStaff));
  }, [navigate]);

  // ------------------------------------------------------------
  // 2. Role-Based Access Control (RBAC)
  //    - Each module defines which roles can access it
  //    - Staff roles: 'staff', 'manager', 'boss'
  // ------------------------------------------------------------
  const allMenuModules = [
    {
      id: 'bookings',
      label: 'Manage Bookings',
      icon: '📅',
      allowedRoles: ['staff', 'manager', 'boss'],
    },
    {
      id: 'giftcards',
      label: 'Giftcard Center',
      icon: '🎁',
      allowedRoles: ['manager', 'boss'],
    },
    {
      id: 'logs',
      label: 'Security Logs',
      icon: '🛡️',
      allowedRoles: ['boss'],
    },
  ];

  // Filter menu items based on the logged-in staff's role
  const authorizedMenus = staffInfo
    ? allMenuModules.filter(menu => menu.allowedRoles.includes(staffInfo.role))
    : [];

  // ------------------------------------------------------------
  // 3. Logout handler
  //    - Clears session data
  //    - Redirects to login
  // ------------------------------------------------------------
  const handleLogout = async () => {
    try{
      // Send POST request to backend to destroy the session
      await axios.post(`${process.env.API_BASE_URL}/admin/logout`);
    } catch (error) {
      console.error('Error occurred while logging out:', error);
    } finally {
      // Regardless of backend response, clear local data and redirect
      localStorage.removeItem('staffInfo');
      navigate('/admin/login');
    }
  };

  // Show loading screen while staffInfo is being restored
  if (!staffInfo)
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="h-screen overflow-hidden bg-[#141414] text-gray-300 font-sans flex">
      
      {/* ============================================================
         LEFT SIDEBAR — Branding, Staff Info, Navigation, Logout
         ============================================================ */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col relative z-10 shadow-2xl">

        {/* Logo + Branding */}
        <div className="p-8 pb-4 text-center">
          <h2 className="font-serif text-xl tracking-widest text-white uppercase leading-snug mb-1">
            Atlantic<br/>Horizon
          </h2>
          <p className="text-[#C5A059] text-[8px] tracking-[0.3em] uppercase">
            Management Portal
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059]/30 mx-auto mt-6"></div>
        </div>

        {/* Staff Profile Panel */}
        <div className="px-6 py-6 mb-4">
          <div className="bg-[#111111] border border-white/5 rounded-lg p-4">
            <p className="text-[10px] text-gray-500 tracking-wider uppercase mb-1">
              Logged in as
            </p>
            <p className="text-white text-sm font-medium tracking-wide">
              {staffInfo.name}
            </p>
            <span className="inline-block mt-2 px-2 py-1 bg-[#C5A059]/20 text-[#C5A059] text-[9px] font-bold tracking-widest uppercase rounded">
              {staffInfo.role}
            </span>
          </div>
        </div>

        {/* Dynamic Navigation Menu (RBAC Filtered) */}
        <nav className="flex-1 px-4 space-y-2">
          {authorizedMenus.map(menu => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-all duration-300 rounded-md
                ${
                  activeTab === menu.id
                    ? 'bg-gradient-to-r from-[#C5A059]/20 to-transparent text-[#C5A059] border-l-2 border-[#C5A059]'
                    : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
            >
              <span className="text-base">{menu.icon}</span>
              {menu.label}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full py-3 text-[10px] tracking-[0.2em] text-gray-500 uppercase hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 rounded"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ============================================================
         MAIN CONTENT AREA — Renders the selected module
         ============================================================ */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="p-10 flex-1 flex flex-col overflow-hidden">
          {/* Tab-based content switching */}
          {activeTab === 'bookings' && <MockBookingsView />}
          {activeTab === 'giftcards' && <MockGiftcardsView />}
          {activeTab === 'logs' && <MockLogsView />}
        </div>
      </main>
    </div>
  );
}

// ===============================================================
// Bookings View Component (Fetches and displays real booking data)
// ===============================================================
function MockBookingsView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch all bookings from the backend when the component mounts.
   * Sending the GET request to the protected endpoint that returns real booking data.
   * The global axios configuration in App.js automatically
   * attaches the session cookie to every request, so there is
   * no need to manually read tokens or set headers here.
   */
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        
        const response = await axios.get(
           // ！！！！！Send GET request to backend API ！！！！！
          `${process.env.API_BASE_URL}/admin/manage/bookings`);
           
          /**
           * Axios automatically parses JSON responses.
           * Your backend returns `{ data: [...] }`, so the actual booking
           * list is located at `response.data.data`.
           */
          setBookings(response.data.data);

      } catch (error) {
      /**
       * -------------------------------------------------------------
       * Centralized 401 handling
       * -------------------------------------------------------------
       * In a session-based authentication system, login state is
       * determined entirely by HTTP status codes.
       */
          if (error.response) {
              if (error.response.status === 401) {
                  console.error('Unauthorized access - invalid session. Please log in again.');
                  // When the session expires, redirect the user safely:
                  window.location.href = '/admin/login';
              }
              else{
                  console.error('Failed to fetch bookings:', error.response.data.message);
              }
          }
          else{
              console.error('Network request error:', error);
          }
      } finally {
      /**
       * Regardless of success or failure, loading must be disabled
       * so the UI can render either the data or an empty state.
       */
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  /**
   * Format room type names into luxury‑styled labels.
   * Ensures consistent branding across the admin UI.
   */
  const formatRoomType = (type) => {
    if (!type) return 'Standard Suite';

    const mapping = {
      lodge: 'Private Lodge',
      exclusivity: 'Ultimate Exclusivity',
      residence: 'The Sovereign Mansion',
    };

    return mapping[type.toLowerCase()] || type;
  };

  return (
    // 1. OUTER CONTAINER: Takes full height, enables vertical flex
    <div className="animate-fadeIn h-full flex flex-col">

      {/* ============================================================
          FIXED HEADER SECTION (Title, Buttons, Filters)
          ============================================================ */}
      {/* 2. SHRINK-0: Prevents this block from squeezing. Groups title and filters together. */}
      <div className="shrink-0 flex flex-col gap-6 mb-8">

        {/* Title + Create Booking Button */}
        <div className="flex justify-between items-end">
          <h1 className="font-serif text-4xl text-white italic tracking-wide">
            Manage Booking
          </h1>

          {/* Future: This will open a booking creation modal or page */}
          <button className="bg-[#c9830a] hover:bg-[#d97706] text-white text-[10px] font-bold tracking-[0.2em] px-6 py-3 rounded-full transition-colors uppercase shadow-lg shadow-orange-900/20">
            + Create Booking
          </button>
        </div>

        {/* Status Filter Pills (currently only "All Bookings") */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-[#dc8c02] px-4 py-2 rounded-full cursor-pointer shadow-lg shadow-orange-900/20">
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">
              All Bookings
            </span>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
              {bookings.length}
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================
          SCROLLABLE DATA TABLE CONTAINER
          ============================================================ */}
      {/* 3. FLEX-1 & OVERFLOW-Y-AUTO: Takes remaining space and enables scrolling */}
      <div className="bg-[#141414] border border-white/5 rounded-xl shadow-2xl flex-1 overflow-y-auto relative">

        {/* 4. STICKY HEADER: Stays at the top of the scrollable container. 
             Matches the background color to hide scrolling items underneath. */}
        <div className="sticky top-0 z-10 bg-[#141414] flex text-[10px] tracking-widest text-gray-500 uppercase px-6 py-5 border-b border-white/5 shadow-md">
          <div className="w-[20%] font-medium">Resident</div>
          <div className="w-[20%] font-medium">Department/Tier</div>
          <div className="w-[25%] font-medium">Dates</div>
          <div className="w-[10%] font-medium">Price</div>
          <div className="w-[10%] font-medium">Status</div>
          <div className="w-[15%] font-medium text-right">Actions</div>
        </div>

        {/* List Content Padding Wrapper */}
        <div className="p-6">
          {/* ================= Loading / Empty / Data States ================= */}
          {loading ? (
            <div className="text-center text-[#C5A059] tracking-widest text-sm uppercase py-20 animate-pulse">
              Decrypting Classified Data...
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-gray-500 tracking-widest text-sm uppercase py-20">
              No bookings found in the estate.
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center bg-[#1a1a1a] p-6 rounded-lg border border-transparent hover:border-[#C5A059]/30 transition-all duration-300 group"
                >

                  {/* -----------------------------------------------------------
                     1. Guest Information (20%)
                     ----------------------------------------------------------- */}
                  <div className="w-[20%] pr-4">
                    <h3 className="text-white text-base font-serif tracking-wide mb-1 truncate">
                      {booking.guestInfo?.firstName ||
                        booking.guestInfo?.name ||
                        'Unknown'}{' '}
                      {booking.guestInfo?.lastName || ''}
                    </h3>
                    <p className="text-gray-600 text-[9px] tracking-widest uppercase">
                      ATL-{booking._id.substring(booking._id.length - 6)}
                    </p>
                  </div>

                  {/* -----------------------------------------------------------
                     2. Room Type (20%)
                     ----------------------------------------------------------- */}
                  <div className="w-[20%]">
                    <p className="text-gray-300 text-sm tracking-wide">
                      {formatRoomType(booking.roomType)}
                    </p>
                  </div>

                  {/* -----------------------------------------------------------
                     3. Date Range + Nights (25%)
                     ----------------------------------------------------------- */}
                  <div className="w-[25%]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-300 text-[13px] tracking-wide">
                        {booking.checkIn
                          ? new Date(booking.checkIn).toLocaleDateString()
                          : 'TBD'}
                      </span>
                      <span className="text-gray-600 text-[10px]">➔</span>
                      <span className="text-gray-300 text-[13px] tracking-wide">
                        {booking.checkOut
                          ? new Date(booking.checkOut).toLocaleDateString()
                          : 'TBD'}
                      </span>
                    </div>

                    <span className="inline-block bg-white/5 text-gray-400 text-[9px] px-2 py-0.5 rounded uppercase tracking-widest">
                      {booking.totalNights
                        ? `${booking.totalNights} NIGHTS`
                        : 'N/A NIGHTS'}
                    </span>
                  </div>

                  {/* -----------------------------------------------------------
                     4. Price + Payment Status (10%)
                     ----------------------------------------------------------- */}
                  <div className="w-[10%]">
                    <p className="text-[#f59e0b] text-sm font-bold tracking-wider mb-1">
                      €{booking.price || 'TBD'}
                    </p>
                    <span className="text-gray-600 text-[9px] tracking-widest uppercase">
                      {booking.paymentStatus === 'Paid' ? 'PAID' : 'UNPAID'}
                    </span>
                  </div>

                  {/* -----------------------------------------------------------
                     5. Booking Status (10%)
                     ----------------------------------------------------------- */}
                  <div className="w-[10%]">
                    <span className="border border-[#4A6482] text-[#4A6482] bg-[#4A6482]/10 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-sm whitespace-nowrap">
                      {booking.status || 'PENDING'}
                    </span>
                  </div>

                  {/* -----------------------------------------------------------
                     6. Action Buttons (15%)
                     ----------------------------------------------------------- */}
                  <div className="w-[15%] flex justify-end gap-3">

                    {/* Confirm */}
                    <button className="flex flex-col items-center gap-1 group/btn">
                      <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform">
                        ✓
                      </div>
                      <span className="text-[#f59e0b] text-[8px] tracking-[0.2em] uppercase">
                        Confirm
                      </span>
                    </button>

                    {/* Edit */}
                    <button className="flex flex-col items-center gap-1 group/btn">
                      <div className="w-8 h-8 rounded-full border border-gray-600 text-gray-400 flex items-center justify-center group-hover/btn:border-white group-hover/btn:text-white transition-all">
                        ✎
                      </div>
                      <span className="text-gray-500 text-[8px] tracking-[0.2em] uppercase group-hover/btn:text-gray-300">
                        Edit
                      </span>
                    </button>

                    {/* Refund */}
                    <button className="flex flex-col items-center gap-1 group/btn">
                      <div className="w-8 h-8 rounded-full border border-red-900 text-red-500 flex items-center justify-center group-hover/btn:bg-red-900/20 transition-all">
                        ⟲
                      </div>
                      <span className="text-red-500/70 text-[8px] tracking-[0.2em] uppercase">
                        Refund
                      </span>
                    </button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===============================================================
// Giftcards View Component (Fetches and displays issued gift cards)
// ===============================================================
function MockGiftcardsView() {
  const [giftcards, setGiftcards] = useState([]);
  const [loading, setLoading] = useState(true);

      /**
       * -------------------------------------------------------------
       * Sending the GET request
       * -------------------------------------------------------------
       * No need to manually read the token, set headers, or specify
       * withCredentials. Your global axios configuration in App.js
       * already attaches the session cookie to every request.
       */
  useEffect(() => {
    const fetchGiftcards = async () => {
      try {
         // ！！！！！Send GET request to backend API ！！！！！
        const response = await axios.get(
          `${process.env.API_BASE_URL}/admin/manage/giftcards`);
        
      /**
       * Axios automatically parses JSON and only reaches this block
       * when the HTTP status code is within the 2xx range.
       *
       * Your backend returns `{ data: [...] }`, so the actual list of
       * gift cards is located at `response.data.data`.
       */
        setGiftcards(response.data.data);
      } catch (error) {
        /**
        * -------------------------------------------------------------
        * Error handling
        * -------------------------------------------------------------
        * In a session-based authentication model, login state is
        * determined entirely by HTTP status codes.
        */
          if (error.response) {
              if (error.response.status === 401) {
                // If the session expires while the user is viewing gift cards,
                // redirect them safely back to the login page:
                  console.error('Unauthorized access - invalid session. Please log in again.');
                  window.location.href = '/admin/login';
              }
              else{
                  console.error('Failed to fetch giftcards:', error.response.data.message);
              }
          }
          else{
              console.error('Network request error:', error);
          }
        
      } finally {
      /**
       * Regardless of success or failure, loading must be disabled
       * so the UI can render either the data or an empty state.
       */
        setLoading(false);
      }
    };

    fetchGiftcards();
  }, []);

  return (
    // 1. OUTER CONTAINER: Takes full height of the parent, enables vertical flex
    <div className="animate-fadeIn h-full flex flex-col">

      {/* ============================================================
          FIXED HEADER SECTION (Title, Buttons, Filters)
          ============================================================ */}
      {/* 2. SHRINK-0: Prevents this entire block from squeezing. Groups title and filters together. */}
      <div className="shrink-0 flex flex-col gap-6 mb-8">

        {/* Title + Issue Giftcard Button */}
        <div className="flex justify-between items-end">
          <h1 className="font-serif text-4xl text-white italic tracking-wide">
            Giftcard Center
          </h1>

          {/* Future: This will open a modal to issue a new gift card */}
          <button className="bg-[#ae8231] hover:bg-[#b45309] text-white text-[10px] font-bold tracking-[0.2em] px-6 py-3 rounded-full transition-colors uppercase shadow-lg shadow-orange-900/20">
            + Issue Giftcard
          </button>
        </div>

        {/* Status Filter Pills */}
        <div className="flex gap-4">
          {/* Total issued */}
          <div className="flex items-center gap-2 bg-[#C5A059] px-4 py-2 rounded-full cursor-pointer shadow-lg shadow-orange-900/20">
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">
              Total Issued
            </span>
            <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
              {giftcards.length}
            </span>
          </div>

          {/* Active */}
          <div className="flex items-center gap-2 bg-[#222] border border-white/5 hover:border-white/20 px-4 py-2 rounded-full cursor-pointer transition-colors">
            <span className="text-gray-400 text-[10px] tracking-widest uppercase">
              Active
            </span>
          </div>

          {/* Redeemed */}
          <div className="flex items-center gap-2 bg-[#222] border border-white/5 hover:border-white/20 px-4 py-2 rounded-full cursor-pointer transition-colors">
            <span className="text-gray-400 text-[10px] tracking-widest uppercase">
              Redeemed
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================
          SCROLLABLE DATA TABLE CONTAINER
          ============================================================ */}
      {/* 3. FLEX-1 & OVERFLOW-Y-AUTO: Takes remaining space and enables scrolling */}
      <div className="bg-[#0f0f0f] border border-white/5 rounded-xl shadow-2xl flex-1 overflow-y-auto relative">

        {/* 4. STICKY HEADER: Stays at the top of the scrollable container. 
             Added solid background color to hide scrolling items underneath */}
        <div className="sticky top-0 z-10 bg-[#0f0f0f] flex text-[10px] tracking-widest text-gray-500 uppercase px-6 py-5 border-b border-white/5 shadow-md">
          <div className="w-[30%] font-medium">Voucher Code & Recipient</div>
          <div className="w-[15%] font-medium">Value</div>
          <div className="w-[25%] font-medium">Validity Period</div>
          <div className="w-[15%] font-medium">Status</div>
          <div className="w-[15%] font-medium text-right">Actions</div>
        </div>

        {/* List Content Padding Wrapper */}
        <div className="p-6">
          {/* ================= Loading / Empty / Data States ================= */}
          {loading ? (
            <div className="text-center text-[#C5A059] tracking-widest text-sm uppercase py-20 animate-pulse">
              Retrieving Vault Records...
            </div>
          ) : giftcards.length === 0 ? (
            <div className="text-center text-gray-500 tracking-widest text-sm uppercase py-20">
              No giftcards issued yet.
            </div>
          ) : (
            <div className="space-y-3">
              {giftcards.map((card) => (
                <div
                  key={card._id}
                  className="flex items-center bg-[#1a1a1a] p-6 rounded-lg border border-transparent hover:border-[#C5A059]/30 transition-all duration-300 group"
                >

                  {/* -----------------------------------------------------------
                     1. Gift Code & Recipient (30%)
                     ----------------------------------------------------------- */}
                  <div className="w-[30%] pr-4 flex items-center gap-4">

                    {/* Decorative giftcard icon */}
                    <div className="w-10 h-8 rounded bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] text-xs">
                      🎁
                    </div>

                    <div>
                      {/* Use the actual giftCode field from your database */}
                      <h3 className="text-white text-sm font-mono tracking-widest mb-1">
                        {card.giftCode || 'UNKNOWN CODE'}
                      </h3>

                      <p className="text-gray-600 text-[9px] tracking-widest uppercase">
                        TO: {card.recipientName || card.recipientEmail || 'Anonymous Guest'}
                      </p>
                    </div>
                  </div>

                  {/* -----------------------------------------------------------
                     2. Giftcard Value (15%)
                     ----------------------------------------------------------- */}
                  <div className="w-[15%]">
                    <p className="text-[#C5A059] text-lg font-serif italic tracking-wider">
                      €{card.amount || '0'}
                    </p>
                  </div>

                  {/* -----------------------------------------------------------
                     3. Validity Period (Created → No Expiry) (25%)
                     ----------------------------------------------------------- */}
                  <div className="w-[25%]">
                    <div className="flex items-center gap-2 mb-1">
                      {/* Use createdAt as the issue date */}
                      <span className="text-gray-400 text-[11px] tracking-wide font-mono">
                        {card.createdAt
                          ? new Date(card.createdAt).toLocaleDateString()
                          : '---'}
                      </span>

                      <span className="text-gray-600 text-[10px]">➔</span>

                      <span className="text-gray-400 text-[11px] tracking-wide font-mono">
                        No Expiry
                      </span>
                    </div>
                  </div>

                  {/* -----------------------------------------------------------
                     4. Status (15%)
                     ----------------------------------------------------------- */}
                  <div className="w-[15%]">
                    {card.status === 'Redeemed' ? (
                      <span className="border border-gray-600 text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
                        REDEEMED
                      </span>
                    ) : (
                      <span className="border border-[#10b981] text-[#10b981] bg-[#10b981]/10 px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
                        {card.status ? card.status.toUpperCase() : 'ACTIVE'}
                      </span>
                    )}
                  </div>

                  {/* -----------------------------------------------------------
                     5. Action Buttons (15%)
                     ----------------------------------------------------------- */}
                  <div className="w-[15%] flex justify-end gap-4">
                    {/* Void Giftcard */}
                    <button
                      className="flex flex-col items-center gap-1 group/btn"
                      title="Void Giftcard"
                    >
                      <div className="w-8 h-8 rounded-full border border-red-900/50 text-red-500/50 flex items-center justify-center group-hover/btn:border-red-500 group-hover/btn:text-red-500 transition-all">
                        ✕
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===============================================================
// 🛡️ Security Logs View (Boss Only)
// ===============================================================
function MockLogsView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

   /**
       * -------------------------------------------------------------
       * Sending the GET request
       * -------------------------------------------------------------
       * 1. No need to manually read the token from localStorage.
       * 2. No need to manually set Authorization headers.
       * 3. No need to specify withCredentials here, because it is
       *    already configured globally in App.js.
       */
  useEffect(() => {
    const fetchLogs = async () => {
      try {

         // ！！！！！Send GET request to backend API ！！！！！
        const response = await axios.get(
          `${process.env.API_BASE_URL}/admin/manage/logs`);
           /**
       * Axios automatically parses JSON responses.
       * It only enters this block when the HTTP status is 2xx.
       *
       * Note:
       * - Axios uses `response.data` as the response body.
       * - Your backend returns `{ data: [...] }`, so the actual logs
       *   are located at `response.data.data`.
       */
        setLogs(response.data.data);

        } catch (error) {
          /**
       * -------------------------------------------------------------
       * Error handling
       * -------------------------------------------------------------
       * If the session is invalid or the user is not authenticated,
       * your auth middleware will return HTTP 401.
       * Axios will automatically route that into this catch block.
       */

          if (error.response) {
              if (error.response.status === 401) {
                // If the session expires while the user is viewing gift cards,
                // redirect them safely back to the login page:
                  console.error('Unauthorized access - invalid session. Please log in again.');
                  window.location.href = '/admin/login';
              }
              else{
                  console.error('Failed to fetch logs:', error.response.data.message);
              }
          }
          else{
              console.error('Network Error:', error);
          }
        } finally {
           /**
       * Regardless of success or failure, loading must be disabled
       * so the UI can render either the data or an empty state.
       */
          setLoading(false);
        }
      };
      

    fetchLogs();
  }, []);

  return (
    <div className="animate-fadeIn h-full flex flex-col">

      {/* -----------------------------------------------------------
         Header Section
         ----------------------------------------------------------- */}
      <div className="flex justify-between items-end mb-10 shrink-0">
        <div>
          <h1 className="font-serif text-4xl text-white italic tracking-wide">
            Security Logs
          </h1>
          <p className="text-red-500/60 text-[9px] tracking-[0.3em] uppercase mt-2 font-bold">
            Authorized Personnel Only // Global Audit Trail
          </p>
        </div>

        {/* Live Monitoring Indicator */}
        <div className="bg-red-900/20 border border-red-900/30 px-4 py-2 rounded flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-500 text-[10px] font-bold tracking-widest uppercase">
            Live Monitoring
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------
         Logs Table Container
         ----------------------------------------------------------- */}
      <div className="bg-[#0f0f0f] border border-white/5 rounded-xl shadow-2xl flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse relative">

          {/* Table Header */}
          <thead className="sticky top-0 bg-[#0f0f0f] z-10 shadow-md">
            <tr className="bg-white/[0.02] text-[10px] tracking-widest text-gray-500 uppercase">
              <th className="px-8 py-5 font-medium">Timestamp</th>
              <th className="px-8 py-5 font-medium">Operator</th>
              <th className="px-8 py-5 font-medium">Location (IP)</th>
              <th className="px-8 py-5 font-medium">Status</th>
              <th className="px-8 py-5 font-medium text-right">System ID</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-20 text-center text-[#C5A059] tracking-[0.2em] text-xs uppercase animate-pulse"
                >
                  Decrypting Security Layer...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-20 text-center text-gray-600 tracking-widest text-xs uppercase"
                >
                  No access records found in vault.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="hover:bg-red-900/[0.03] transition-colors group"
                >
                  {/* Timestamp */}
                  <td className="px-8 py-5 font-mono text-[11px] text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  {/* Operator */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-white text-sm font-serif">
                        {log.username}
                      </span>
                      <span className="text-[9px] px-2 py-0.5 bg-blue-900/20 text-blue-400 border border-blue-900/30 rounded uppercase tracking-tighter">
                        {log.role}
                      </span>
                    </div>
                  </td>

                  {/* IP Address */}
                  <td className="px-8 py-5 font-mono text-[11px] text-gray-500">
                    {log.ipAddress || 'Unknown'}
                  </td>

                  {/* Status */}
                  <td className="px-8 py-5">
                    <span className="text-green-500 text-[10px] font-bold tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      {log.loginStatus?.toUpperCase() || 'SUCCESS'}
                    </span>
                  </td>

                  {/* System ID (last 8 chars) */}
                  <td className="px-8 py-5 text-right font-mono text-[9px] text-gray-700 group-hover:text-gray-500 transition-colors">
                    {log._id.substring(log._id.length - 8)}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

