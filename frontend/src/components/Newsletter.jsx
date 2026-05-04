import React, { useState } from 'react';

/**
 * COMPONENT: Newsletter
 * 
 * Displays a newsletter signup section on the homepage.
 * Collects user email and name, then shows a confirmation modal.
 *
 * FEATURES:
 * - Form validation (required fields)
 * - Success confirmation modal
 * - Responsive design (stacks on mobile)
 * - No backend integration (currently frontend-only)
 */
export default function Newsletter() {
  /**
   * STATE MANAGEMENT
   * 
   * showModal: Controls visibility of success confirmation modal
   * userEmail: Stores the email input value
   * firstName: Stores the first name input value
   */
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  /**
   * HANDLER: Form Submission
   * 
   * Prevents default form refresh and shows the confirmation modal.
   * NOTE: Currently does NOT send data to backend.
   * Integration with backend email service would go here.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setShowModal(true);
  };

  return (
    /**
     * SECTION: Main Newsletter Container
     * 
     * Light background with padding for visual contrast
     * Contains form and decorative background image
     */
    <section className="newsletter-section bg-[#f5f5f5] py-20 px-[10%] relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto flex justify-between items-start gap-12 relative z-10 max-[850px]:flex-col max-[850px]:text-center">
        
        {/* LEFT COLUMN: Headline and Description */}
        <div className="flex-1">
          <h2 className="font-serif text-4xl text-manorGreen mb-4 font-normal">
            Sign up to receive our latest news!
          </h2>
          <p className="font-sans text-lg text-[#666] leading-relaxed">
            Sign up here to our Newsletter to receive special offers and news
            via email directly into your inbox.
          </p>
        </div>

        {/* RIGHT COLUMN: Newsletter Signup Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          
          {/* FORM FIELD 1: First Name Input */}
          <div className="flex flex-col gap-2 text-left max-[850px]:text-center">
            <label className="font-sans text-sm text-[#333]">
              First Name <span className="text-[#c5a898]">*</span>
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="px-3 py-2 border border-[#ccc] rounded-sm text-base text-[#333] bg-white outline-none focus:border-manorGreen transition-colors"
            />
          </div>

          {/* FORM FIELD 2: Email Address Input */}
          <div className="flex flex-col gap-2 text-left max-[850px]:text-center">
            <label className="font-sans text-sm text-[#333]">
              Email Address <span className="text-[#c5a898]">*</span>
            </label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="px-3 py-2 border border-[#ccc] rounded-sm text-base text-[#333] bg-white outline-none focus:border-manorGreen transition-colors"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-2 py-3 bg-manorRose text-[#333] border-none uppercase font-bold tracking-[0.2em] cursor-pointer transition hover:bg-[#c5a898] hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>

      {/* DECORATIVE BACKGROUND IMAGE */}
      <div
        className="absolute right-0 bottom-0 w-72 h-96 bg-contain bg-no-repeat opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: "url('/horse-illustration.png')" }}
      ></div>

      {/* =========================================
           SUCCESS CONFIRMATION MODAL
           ========================================= 
           
           Displayed after form submission.
           Shows confirmation message with subscribed email.
           User can close by clicking the X button or "Back to Manor" button.
      */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 animate-fadeIn">
          <div className="bg-[#1a1a1a] border border-[#333] w-[90%] max-w-lg p-10 relative text-center shadow-2xl">
            
            {/* CLOSE BUTTON (Top Right X) */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* HEADER SECTION */}
            <h3 className="font-serif text-2xl text-[#c5a898] uppercase tracking-[0.3em] mb-2">
              Thank You {firstName}!
            </h3>
            {/* Decorative divider line */}
            <div className="w-20 h-[1px] bg-[#c5a898] mx-auto mb-8"></div>

            {/* CONTENT SECTION */}
            <div className="space-y-6">
              {/* Confirmation message */}
              <p className="text-gray-300 text-sm leading-relaxed">
                Your subscription to the Atlantic Horizon Manor newsletter is now confirmed.
              </p>
              
              {/* Email display box */}
              <div className="bg-[#262626] p-4 border border-white/5">
                <h4 className="font-sans text-[10px] text-[#c5a898] uppercase tracking-widest mb-1 font-bold">
                  Delivery Address
                </h4>
                <p className="text-white font-mono text-xs truncate">
                  {userEmail}
                </p>
              </div>

              {/* Unsubscribe information */}
              <p className="text-gray-500 text-[11px] italic leading-relaxed">
                You will receive our seasonal offers and estate updates directly. 
                If you ever wish to leave, you can <strong>easily unsubscribe</strong> at any time via the link at the bottom of our emails.
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-10 w-full py-4 border border-[#c5a898] text-[#c5a898] uppercase text-xs tracking-[0.2em] hover:bg-[#c5a898] hover:text-white transition font-bold"
            >
              Back to Manor
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
