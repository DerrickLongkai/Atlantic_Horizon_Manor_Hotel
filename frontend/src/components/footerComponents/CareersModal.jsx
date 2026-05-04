import React from "react";

/**
 * COMPONENT: CareersModal
 * 
 * Displays career opportunities and job postings at The Atlantic Horizon Manor.
 *
 * PURPOSE:
 * - Show available job positions
 * - Provide contact information for applications
 * - Encourage qualified candidates to join the team
 *
 * PARENT COMPONENT:
 * - Layout.jsx opens this modal via footer link
 * - Uses state (activeModal === 'careers') to control visibility
 *
 * INTERACTION:
 * - Click dark background or X button to close
 * - Click inside modal content (does not close)
 * - Email link directs to careers application address
 */
export default function CareersModal({ onClose }) {

  return (
    /**
     * OVERLAY LAYER
     * 
     * Fixed positioning covers entire viewport
     * Clicking the overlay closes the modal
     */
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      
      /**
       * MODAL CONTAINER
       * Central card with white border and rounded corners
       * Stops propagation to prevent closing when clicking inside
       */
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#181818] p-10 shadow-2xl border border-white/5 text-center"
      >
        
        /**
         * CLOSE BUTTON
         * Top-right corner X icon
         * Triggers onClose callback from parent component
         * aria-label for accessibility
         */
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-manorGold hover:text-white transition-colors text-xl font-light leading-none"
          aria-label="Close Careers Modal"
        >
          ✕
        </button>

        /**
         * HEADER SECTION
         * Title identifying this modal as the Careers section
         * Uses manor gold color for consistency with brand
         */
        <h2 className="text-manorGold text-xl tracking-[0.4em] uppercase mt-2">
          Careers
        </h2>
        
        /**
         * DECORATIVE DIVIDER
         * Subtle gold line separating header from content
         * Consistent design element across all modals
         */
        <div className="w-16 h-[1px] bg-manorGold/60 mx-auto my-6"></div>

        /**
         * CONTENT SECTION
         * Main body with job postings and application instructions
         * Scrollable if content exceeds height
         * Light text on dark background for readability
         */
        <div className="text-gray-300 text-sm leading-relaxed max-h-[50vh] overflow-y-auto px-2 custom-scrollbar text-left font-light">
          
          {/* Introductory paragraph */}
          <p className="mb-6 text-center">
            Join the team at The Atlantic Horizon Manor. We are always looking for passionate individuals dedicated to delivering flawless hospitality.
          </p>
          
          {/* Job postings container */}
          <div className="space-y-4">
            
            {/* JOB POSTING 1 */}
            <div className="border border-white/10 p-4 hover:border-manorGold/50 transition">
              <h3 className="text-manorGold text-xs tracking-widest uppercase mb-1">
                Guest Experience Manager
              </h3>
              <p className="text-xs opacity-70">Full-time • Competitive Salary</p>
            </div>

            {/* JOB POSTING 2 */}
            <div className="border border-white/10 p-4 hover:border-manorGold/50 transition">
              <h3 className="text-manorGold text-xs tracking-widest uppercase mb-1">
                Executive Sous Chef
              </h3>
              <p className="text-xs opacity-70">Full-time • Culinary Team</p>
            </div>
          </div>

          {/* Application instructions and contact email */}
          <p className="mt-6 text-center text-xs opacity-80">
            To apply, please send your CV and cover letter to <br/>
            <a 
              href="mailto:careers@atlantichorizon.ie" 
              className="text-manorGold hover:text-white transition underline mt-2 inline-block"
            >
              careers@atlantichorizon.ie
            </a>
          </p>
        </div>

        /**
         * CLOSE BUTTON (Bottom)
         * Full-width button to dismiss the modal
         * Gold border with hover state that fills with gold background
         */
        <button
          onClick={onClose}
          className="w-full mt-8 py-4 border border-manorGold text-manorGold text-xs tracking-[0.2em] uppercase hover:bg-manorGold hover:text-[#181818] transition-all duration-300 font-semibold"
        >
          Close Window
        </button>
      </div>
    </div>
  );
}