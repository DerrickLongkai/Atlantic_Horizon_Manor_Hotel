import React, { useEffect } from "react";

export default function BlogModal({ onClose }) {
  // Core improvement: lock background scrolling when modal opens, restore on close
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      onClick={onClose}
      // Added animate-fadeIn for smoother background appearance
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
    >
      
      <div 
        onClick={(e) => e.stopPropagation()}
        // Added animate-slideUp for a subtle upward entrance motion
        className="relative w-full max-w-lg bg-[#111111] p-8 md:p-12 shadow-2xl border border-white/10 text-center animate-slideUp"
      >
        
        {/* Top close button — slightly larger click area */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-manorGold/50 hover:text-manorGold transition-all text-2xl font-light leading-none"
          aria-label="Close Blog"
        >
          ✕
        </button>

        <h2 className="text-manorGold text-xl tracking-[0.5em] uppercase mt-4 font-cinzel">
          Journal
        </h2>
        
        <div className="w-12 h-[1px] bg-manorGold/40 mx-auto my-8"></div>

        {/* Content area — includes custom scrollbar styling */}
        <div className="text-gray-300 text-sm leading-relaxed max-h-[55vh] overflow-y-auto px-4 text-left font-light scrollbar-thin scrollbar-thumb-manorGold/20">
          
          {/* Article 1 */}
          <div className="border-b border-white/5 pb-8 mb-8 group cursor-pointer">
            <p className="text-manorGold/40 text-[9px] tracking-[0.2em] uppercase mb-2 font-bold">
              October 12 • Culinary
            </p>
            <h3 className="text-manorGold text-base tracking-wider uppercase mb-3 group-hover:translate-x-1 transition-transform">
              Autumn Tasting Menu Unveiled
            </h3>
            <p className="text-xs opacity-60 mb-4 leading-relaxed font-sans">
              Our Executive Chef has curated a seasonal menu highlighting the finest local, foraged ingredients from the Southwest coast...
            </p>
            <button className="text-manorGold text-[9px] tracking-widest uppercase hover:tracking-[0.4em] transition-all font-bold">
              Read Entry —
            </button>
          </div>

          {/* Article 2 */}
          <div className="border-b border-white/5 pb-8 mb-8 group cursor-pointer">
            <p className="text-manorGold/40 text-[9px] tracking-[0.2em] uppercase mb-2 font-bold">
              September 28 • Wellness
            </p>
            <h3 className="text-manorGold text-base tracking-wider uppercase mb-3 group-hover:translate-x-1 transition-transform">
              New Holistic Spa Treatments
            </h3>
            <p className="text-xs opacity-60 mb-4 leading-relaxed font-sans">
              Discover our new range of seaweed-infused restorative therapies designed to align body and mind...
            </p>
            <button className="text-manorGold text-[9px] tracking-widest uppercase hover:tracking-[0.4em] transition-all font-bold">
              Read Entry —
            </button>
          </div>

          {/* Article 3 */}
          <div className="pb-4 group cursor-pointer">
            <p className="text-manorGold/40 text-[9px] tracking-[0.2em] uppercase mb-2 font-bold">
              August 15 • Estate
            </p>
            <h3 className="text-manorGold text-base tracking-wider uppercase mb-3 group-hover:translate-x-1 transition-transform">
              A Guide to the Walled Gardens
            </h3>
            <p className="text-xs opacity-60 mb-4 leading-relaxed font-sans">
              Take a virtual stroll through our historic, newly restored 18th-century walled botanical gardens...
            </p>
            <button className="text-manorGold text-[9px] tracking-widest uppercase hover:tracking-[0.4em] transition-all font-bold">
              Read Entry —
            </button>
          </div>

        </div>

        {/* Bottom close button — increased spacing and presence */}
        <button
          onClick={onClose}
          className="w-full mt-10 py-5 bg-manorGold/5 border border-manorGold/30 text-manorGold text-[10px] tracking-[0.3em] uppercase hover:bg-manorGold hover:text-[#111111] transition-all duration-500 font-bold"
        >
          Close Journal
        </button>
      </div>
    </div>
  );
}
