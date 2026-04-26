import React, { useState } from 'react';

export default function GiftCardModal({ isOpen, onClose }) {
  const [step, setStep] = useState('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: 1000,
    recipientName: '',
    recipientEmail: '',
    buyerName: '', // unified naming
    buyerEmail: ''
  });
  const [giftCode, setGiftCode] = useState('');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setIsSubmitting(false);
      setFormData({
        amount: 1000,
        recipientName: '',
        recipientEmail: '',
        buyerName: '',
        buyerEmail: ''
      });
      setGiftCode('');
    }, 300);
  };

  if (!isOpen) return null;

  /**
   * Submit handler: gift code is no longer generated on the frontend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/giftcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // send formData directly
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Retrieve giftCode from backend response
        setGiftCode(data.giftCode);
        setStep('success');
      } else {
        alert(`Submission Failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      onClick={handleClose} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg bg-[#181818] p-10 shadow-2xl border border-white/5 text-center"
      >
        <button onClick={handleClose} className="absolute top-5 right-5 text-manorGold hover:text-white transition-colors text-xl font-light">✕</button>

        {step === 'form' ? (
          <>
            <h2 className="text-manorGold text-xl tracking-[0.4em] uppercase mt-2">Gift Voucher</h2>
            <div className="w-16 h-[1px] bg-manorGold/60 mx-auto my-6"></div>

            <form onSubmit={handleSubmit} className="text-left space-y-6">
              {/* Amount selection */}
              <div className="space-y-3">
                <label className="text-manorGold/60 text-[9px] tracking-[0.2em] uppercase">Select Amount</label>
                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 2000, 5000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormData({ ...formData, amount: amt })}
                      className={`py-2 text-[10px] border transition-all duration-300 tracking-widest ${
                        formData.amount === amt 
                        ? 'border-manorGold bg-manorGold text-[#181818]' 
                        : 'border-white/10 text-manorGold/80 hover:border-manorGold'
                      }`}
                    >
                      €{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-manorGold/60 text-[9px] tracking-[0.2em] uppercase">Recipient Name</label>
                  <input
                    required
                    type="text"
                    value={formData.recipientName}
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-xs text-white focus:border-manorGold outline-none transition-colors font-light"
                    onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-manorGold/60 text-[9px] tracking-[0.2em] uppercase">Recipient Email</label>
                  <input
                    required
                    type="email"
                    value={formData.recipientEmail}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-xs text-white focus:border-manorGold outline-none transition-colors font-light"
                    onChange={e => setFormData({ ...formData, recipientEmail: e.target.value })}
                  />
                </div>
              </div>

              {/* Buyer information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-manorGold/60 text-[9px] tracking-[0.2em] uppercase">Buyer Name</label>
                  <input
                    required
                    type="text"
                    value={formData.buyerName}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-xs text-white focus:border-manorGold outline-none transition-colors font-light"
                    onChange={e => setFormData({ ...formData, buyerName: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-manorGold/60 text-[9px] tracking-[0.2em] uppercase">Buyer Email</label>
                  <input
                    required
                    type="email"
                    value={formData.buyerEmail}
                    placeholder="Your Email"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-xs text-white focus:border-manorGold outline-none transition-colors font-light"
                    onChange={e => setFormData({ ...formData, buyerEmail: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 border border-manorGold text-manorGold text-xs tracking-[0.2em] uppercase hover:bg-manorGold hover:text-[#181818] transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Confirm & Purchase'}
              </button>
            </form>
          </>
        ) : (
          /* Success state: display giftCode returned from backend */
          <div className="animate-fadeIn py-4">
            <h2 className="text-manorGold text-xl tracking-[0.4em] uppercase mt-2">Successful</h2>
            <div className="w-16 h-[1px] bg-manorGold/60 mx-auto my-6"></div>
            <div className="py-8 space-y-6">
              <p className="text-manorGold/60 text-[10px] tracking-[0.2em] uppercase">Your Redemption Code</p>
              <p className="text-white text-3xl tracking-[0.4em] font-light italic">{giftCode}</p>
              <p className="text-gray-400 text-xs font-light leading-relaxed px-6">
                A digital voucher has been generated and dispatched to {formData.recipientEmail}.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="w-full mt-6 py-4 border border-manorGold text-manorGold text-xs tracking-[0.2em] uppercase hover:bg-manorGold hover:text-[#181818] transition-all duration-300 font-semibold"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
