import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/HomePage/Logo.png';

/**
 * NAVIGATION CONFIGURATION
 * 
 * Defines the main navigation menu structure for the header.
 * Three categories representing the three main experience offerings:
 * - Lincoln (Experience & Dining)
 * - Derrick (Spa & Wellness)
 * - George (Accommodations & Resort)
 *
 * Each category has multiple child links for granular navigation.
 * This structure powers both desktop dropdowns and mobile menus.
 */
const NAV_ITEMS = [
  {
    label: 'Experience',
    links: [
      { name: 'Michelin Quality Food', path: '/michelineQualityFood' },
      { name: 'Continental Breakfast', path: '/continentalBreakfast' },
      { name: 'Local Irish Excursion', path: '/localIrishExcursion' },
      { name: 'Private Chauffeur', path: '/privateChauffer' },
      { name: 'Honeymoon Package', path: '/honeymoonPackage' },
    ],
  },
  {
    label: 'Spa & Wellness',
    links: [
      { name: 'Sauna', path: '/sauna' },
      { name: 'Facial', path: '/facial' },
      { name: 'Hottub', path: '/hottub' },
      { name: 'Jacuzzi', path: '/jacuzzi' },
      { name: 'Massage', path: '/massage' },
    ],
  },
  {
    label: 'Inclusive Resort',
    links: [
      { name: 'Private Lodges', path: '/lodges' },
      { name: 'Private Residences & Villas', path: '/villas' },
      { name: 'Ultimate Exclusivity', path: '/exclusivity' },
    ],
  },
];

/**
 * COMPONENT: Header

 * Main navigation header for the Atlantic Horizon Manor website.
 *
 * FEATURES:
 * - Responsive design (mobile hamburger menu, desktop dropdowns)
 * - Sticky positioning (stays at top when scrolling)
 * - Luxury branding (gold and green color scheme)
 * - Quick access buttons (Self Check-In, Gift Card)
 *
 * SECTIONS:
 * 1. Desktop navigation with dropdown menus
 * 2. Centered logo (home link)
 * 3. Action buttons (Self Check-In, Gift Card)
 * 4. Mobile hamburger menu with collapsible categories
 */
export default function Header({ onOpenGiftCard }) {
  /**
   * STATE MANAGEMENT
   * 
   * isMobileMenuOpen: Controls visibility of mobile menu panel
   * openDropdown: Tracks which mobile category is expanded (null if none)
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  /**
   * HELPER FUNCTION: closeMenu
   * 
   * Closes the mobile menu when a link is clicked
   * Ensures menu doesn't stay open after navigation
   */
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* 
        MAIN HEADER BAR

        Fixed positioning keeps it visible when scrolling
        z-50 ensures it appears above other page content
        Height increases on larger screens (lg:h-36)
      */}
      <header className="fixed top-0 left-0 w-full z-50 bg-manorGreen text-manorGold flex items-center justify-between px-6 lg:px-10 h-24 lg:h-36 transition-all duration-300 border-b border-white/5">
        
        {/* 
          LEFT SECTION: Hamburger + Desktop Navigation
        */}
        <div className="flex items-center gap-10 flex-1">
          
          {/* HAMBURGER MENU BUTTON (Mobile Only) */}
          {/* Animated three-line icon that transforms into an X when open */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {/* Line 1: Rotates when menu is open */}
            <span className={`block w-6 h-0.5 bg-manorGold transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            {/* Line 2: Fades out when menu is open */}
            <span className={`block w-6 h-0.5 bg-manorGold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            {/* Line 3: Rotates in opposite direction when menu is open */}
            <span className={`block w-6 h-0.5 bg-manorGold transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          {/* DESKTOP NAVIGATION MENU (Hidden on Mobile) */}
          {/* Shows all three main categories with hover dropdowns */}
          <nav className="hidden lg:flex gap-10 relative">
            {NAV_ITEMS.map((cat) => (
              <div key={cat.label} className="relative group">
                {/* CATEGORY BUTTON */}
                <button className="pb-2 text-manorGold uppercase tracking-[2px] font-cinzel text-sm whitespace-nowrap">
                  {cat.label}
                </button>
                
                {/* DROPDOWN MENU (Appears on Hover) */}
                {/* Positioned below the button, slides down with smooth animation */}
                <div className="absolute left-0 top-full mt-4 w-56 bg-[#2f3a33] text-white rounded-md shadow-xl opacity-0 invisible translate-y-3 z-50 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex flex-col py-3 text-sm">
                    {cat.links.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="mx-3 my-1 px-4 py-2 text-sm font-light border border-transparent rounded-full hover:border-manorGold hover:text-manorGold transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* 
          CENTER SECTION: Logo

          Positioned absolutely in the center
          Links to home page for easy site-wide navigation
        */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Link to="/" title="Return to homepage">
            <img
              src={logoImg}
              alt="The Atlantic Horizon Manor Logo"
              className="h-20 lg:h-32 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>

        {/* 
          RIGHT SECTION: Action Buttons

          Quick access to guest services
        */}
        <div className="flex gap-2 sm:gap-4 lg:gap-6 flex-1 justify-end items-center">
          
          {/* SELF CHECK-IN BUTTON (Desktop) */}
          {/* Shows as a full button on desktop, icon on mobile */}
          <Link 
            to="/self-checkin" 
            className="hidden lg:inline-block border border-manorGold text-manorGold px-4 py-2 text-[10px] uppercase tracking-wider transition-all hover:bg-manorGold hover:text-manorGreen"
            title="Check in to your room"
          >
            Self Check-In
          </Link>

          {/* SELF CHECK-IN ICON (Mobile) */}
          {/* Compact square icon for mobile screens */}
          <Link 
            to="/self-checkin" 
            onClick={closeMenu} 
            className="lg:hidden w-8 h-8 border-2 border-manorGold rounded-md flex flex-col items-center justify-center text-manorGold"
            title="Check in to your room"
          >
            <span className="text-[5px] font-black">CHECK</span>
            <span className="text-[5px] font-black">IN</span>
          </Link>

          {/* GIFT CARD BUTTON */}
          {/* Opens the gift card purchase modal */}
          <button 
            onClick={onOpenGiftCard}
            className="border border-manorGold text-manorGold px-3 py-2 text-[10px] lg:px-4 uppercase tracking-wider transition-all hover:bg-manorGold hover:text-manorGreen"
            title="Purchase a gift card"
          >
            Gift Card
          </button>
        </div>
      </header>

      {/* 
        MOBILE MENU PANEL
        
        Full-screen overlay menu for mobile navigation
        Shows when isMobileMenuOpen is true
        Has collapsible categories with expandable dropdowns
      */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-24 left-0 right-0 bottom-0 z-[45] flex flex-col">
          
          {/* DARK OVERLAY BACKDROP */}
          {/* Click outside the menu to close it */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu} />
          
          {/* MOBILE MENU CONTENT */}
          {/* Scrollable panel that slides down from header */}
          <div className="relative bg-[#1e2219] w-full shadow-2xl border-b border-white/10 animate-slideDown overflow-y-auto max-h-[80vh]">
            <nav className="px-6 py-8">
              {NAV_ITEMS.map((cat) => (
                <div key={cat.label} className="border-b border-white/5">
                  
                  {/* CATEGORY HEADER (Expandable) */}
                  <button
                    onClick={() => setOpenDropdown(openDropdown === cat.label ? null : cat.label)}
                    className="flex justify-between items-center w-full py-5 text-manorGold uppercase tracking-[2px] font-cinzel text-xs"
                  >
                    {cat.label}
                    {/* DROPDOWN INDICATOR ARROW */}
                    {/* Rotates 180 degrees when expanded */}
                    <span className={`transition-transform ${openDropdown === cat.label ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </button>
                  
                  {/* CATEGORY LINKS (Shown When Expanded) */}
                  {openDropdown === cat.label && (
                    <div className="pb-5 pl-4 space-y-4">
                      {cat.links.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={closeMenu}
                          className="block text-xs text-white/70 hover:text-manorGold transition-all"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

