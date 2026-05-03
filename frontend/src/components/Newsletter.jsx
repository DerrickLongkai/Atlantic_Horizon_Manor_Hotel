import React, { useState } from 'react';

export default function Newsletter() {
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setShowModal(true);
  };

  return (
    <section className="newsletter-section bg-[#f5f5f5] py-20 px-[10%] relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto flex justify-between items-start gap-12 relative z-10 max-[850px]:flex-col max-[850px]:text-center">
        
        <div className="flex-1">
          <h2 className="font-serif text-4xl text-manorGreen mb-4 font-normal">
            Sign up to receive our latest news!
          </h2>
          <p className="font-sans text-lg text-[#666] leading-relaxed">
            Sign up here to our Newsletter to receive special offers and news
            via email directly into your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-2 text-left max-[850px]:text-center">
            <label className="font-sans text-sm text-[#333]">
              First Name <span className="text-[#c5a898]">*</span>
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-3 py-2 border border-[#ccc] rounded-sm text-base text-[#333] bg-white outline-none focus:border-manorGreen"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2 text-left max-[850px]:text-center">
            <label className="font-sans text-sm text-[#333]">
              Email Address <span className="text-[#c5a898]">*</span>
            </label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="px-3 py-2 border border-[#ccc] rounded-sm text-base text-[#333] bg-white outline-none focus:border-manorGreen"
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-3 bg-manorRose text-[#333] border-none uppercase font-bold tracking-[0.2em] cursor-pointer transition hover:bg-[#c5a898] hover:text-white"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Decorative background */}
      <div
        className="absolute right-0 bottom-0 w-72 h-96 bg-contain bg-no-repeat opacity-10 z-0 pointer-events-none"
        style={{ backgroundImage: "url('/horse-illustration.png')" }}
      ></div>

      {/* =========================================
           SUCCESS CONFIRMATION MODAL
         ========================================= */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 animate-fadeIn">
          <div className="bg-[#1a1a1a] border border-[#333] w-[90%] max-w-lg p-10 relative text-center shadow-2xl">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition"
            >
              &times;
            </button>

            <h3 className="font-serif text-2xl text-[#c5a898] uppercase tracking-[0.3em] mb-2">
              Thank You {firstName}!
            </h3>
            <div className="w-20 h-[1px] bg-[#c5a898] mx-auto mb-8"></div>

            <div className="space-y-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Your subscription to the Atlantic Horizon Manor newsletter is now confirmed.
              </p>
              
              <div className="bg-[#262626] p-4 border border-white/5">
                <h4 className="font-sans text-[10px] text-[#c5a898] uppercase tracking-widest mb-1 font-bold">
                  Delivery Address
                </h4>
                <p className="text-white font-mono text-xs truncate">
                  {userEmail}
                </p>
              </div>

              <p className="text-gray-500 text-[11px] italic leading-relaxed">
                You will receive our seasonal offers and estate updates directly. 
                If you ever wish to leave, you can <strong>easily unsubscribe</strong> at any time via the link at the bottom of our emails.
              </p>
            </div>

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
