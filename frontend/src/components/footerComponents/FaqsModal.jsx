import React from "react";

/**
 * COMPONENT: FaqsModal
 * Displays frequently asked questions about The Atlantic Horizon Manor.
 *
 * PURPOSE:
 * - Answer common guest questions about policies and services
 * - Provide information about check-in/out times, pets, dining, amenities
 * - Improve guest experience by addressing concerns upfront
 * - Reduce support inquiries by offering self-service information
 */
export default function FaqsModal({ onClose }) {

  return (
    /**
     * OVERLAY LAYER
     * Fixed positioning covers entire viewport
     * Clicking the overlay closes the modal (dark background)
     * Backdrop blur effect provides visual separation
     */
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      
      /**
       * MODAL CONTAINER
       * Central card with white border and rounded corners
       * Stops propagation to prevent closing when clicking inside
       * Max height constraint with scrolling for long content
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
          aria-label="Close FAQs Modal"
        >
          ✕
        </button>

        /**
         * HEADER SECTION
         * Title identifying this modal as Frequently Asked Questions
         * Uses manor gold color for consistency with brand
         */
        <h2 className="text-manorGold text-xl tracking-[0.4em] uppercase mt-2">
          F A Q s
        </h2>
        
        /**
         * DECORATIVE DIVIDER
         * Subtle gold line separating header from content
         * Consistent design element across all modals
         */
        <div className="w-16 h-[1px] bg-manorGold/60 mx-auto my-6"></div>

        /**
         * CONTENT SECTION
         * Main body with FAQ question-and-answer pairs
         * Scrollable if content exceeds viewport
         * Light text on dark background for readability
         * Organized as distinct Q&A blocks
         */
        <div className="text-gray-300 text-sm leading-relaxed max-h-[50vh] overflow-y-auto px-2 custom-scrollbar text-left font-light space-y-6">
          
          {/* FAQ 1: Check-in and Check-out Times */}
          <div>
            <h3 className="text-manorGold text-xs tracking-widest uppercase mb-2">
              What are your check-in and check-out times?
            </h3>
            <p className="text-xs opacity-80">
              Check-in is from 3:00 PM, and check-out is prior to 11:00 AM. Early check-in and late check-out can be arranged subject to availability.
            </p>
          </div>

          {/* FAQ 2: Pet Policy */}
          <div>
            <h3 className="text-manorGold text-xs tracking-widest uppercase mb-2">
              Are pets allowed at the Manor?
            </h3>
            <p className="text-xs opacity-80">
              While we adore animals, to ensure a tranquil environment for all guests, we only accommodate registered service animals.
            </p>
          </div>

          {/* FAQ 3: Spa Access for Non-residents */}
          <div>
            <h3 className="text-manorGold text-xs tracking-widest uppercase mb-2">
              Is the Spa open to non-residents?
            </h3>
            <p className="text-xs opacity-80">
              Our spa facilities are exclusively reserved for guests staying at The Atlantic Horizon to maintain ultimate exclusivity and privacy.
            </p>
          </div>

          {/* FAQ 4: Dietary Requirements */}
          <div>
            <h3 className="text-manorGold text-xs tracking-widest uppercase mb-2">
              Do you cater to dietary requirements?
            </h3>
            <p className="text-xs opacity-80">
              Absolutely. Our culinary team can accommodate all dietary restrictions and allergies. Please inform us prior to your arrival.
            </p>
          </div>

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