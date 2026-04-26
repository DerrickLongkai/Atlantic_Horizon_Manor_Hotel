import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../images/HomePage/Logo.png';
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
      { name: 'Sauna', path: '/sauna' }, // Matches the path in App.js
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

export default function Header({ onOpenGiftCard }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Helper: close mobile menu after clicking a link
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-manorGreen text-manorGold flex items-center justify-between px-6 lg:px-10 h-24 lg:h-36 transition-all duration-300 border-b border-white/5">
        
        {/* Left: mobile hamburger + desktop navigation */}
        <div className="flex items-center gap-10 flex-1">
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-manorGold transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-manorGold transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-manorGold transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          <nav className="hidden lg:flex gap-10 relative">
            {NAV_ITEMS.map((cat) => (
              <div key={cat.label} className="relative group">
                <button className="pb-2 text-manorGold uppercase tracking-[2px] font-cinzel text-sm whitespace-nowrap">
                  {cat.label}
                </button>
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

        {/* Center: Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <Link to="/">
            <img
              src={logoImg}
              alt="The Atlantic Horizon Manor Logo"
              className="h-20 lg:h-32 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>


        {/* Right: action buttons */}
        <div className="flex gap-2 sm:gap-4 lg:gap-6 flex-1 justify-end items-center">
          <Link to="/self-checkin" className="hidden lg:inline-block border border-manorGold text-manorGold px-4 py-2 text-[10px] uppercase tracking-wider transition-all hover:bg-manorGold hover:text-manorGreen">
            Self Check-In
          </Link>

          {/* Mobile Check-in icon */}
          <Link to="/self-checkin" onClick={closeMenu} className="lg:hidden w-8 h-8 border-2 border-manorGold rounded-md flex flex-col items-center justify-center text-manorGold">
            <span className="text-[5px] font-black">CHECK</span>
            <span className="text-[5px] font-black">IN</span>
          </Link>

          <button 
            onClick={onOpenGiftCard}
            className="border border-manorGold text-manorGold px-3 py-2 text-[10px] lg:px-4 uppercase tracking-wider transition-all hover:bg-manorGold hover:text-manorGreen"
          >
            Gift Card
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-24 left-0 right-0 bottom-0 z-[45] flex flex-col">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu} />
          <div className="relative bg-[#1e2219] w-full shadow-2xl border-b border-white/10 animate-slideDown overflow-y-auto max-h-[80vh]">
            <nav className="px-6 py-8">
              {NAV_ITEMS.map((cat) => (
                <div key={cat.label} className="border-b border-white/5">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === cat.label ? null : cat.label)}
                    className="flex justify-between items-center w-full py-5 text-manorGold uppercase tracking-[2px] font-cinzel text-xs"
                  >
                    {cat.label}
                    <span className={`transition-transform ${openDropdown === cat.label ? 'rotate-180' : ''}`}>▾</span>
                  </button>
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

