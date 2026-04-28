import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

// Modals and Components
import GiftCardModal from './GiftCardModal';
import BlogModal from './footerComponents/BlogModal';
import CareersModal from './footerComponents/CareersModal';
import ContactUsModal from './footerComponents/ContactUsModal';
import FaqsModal from './footerComponents/FaqsModal';
import LocationModal from './footerComponents/LocationModal';
import ParkingModal from './footerComponents/ParkingModal';
import PrivacyPolicyModal from './footerComponents/PrivacyPolicyModal';
import CookieWindow from './CookieWindow';

const Layout = () => {
  // --- STATE MANAGEMENT ---
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 

  // Helper: Close all modals
  const closeModal = () => setActiveModal(null);

  /**
   * DATABASE SYNC: Save preference to Backend & LocalStorage
   * @param {string} preference - 'accepted' or 'declined'
   */

  // !!! Cookie Request 
  const handleSaveCookiePreference = async (preference) => {
    try {
  // 1. Send POST request to sync cookie preferences with the Database
  // Axios automatically handles JSON stringification and Content-Type headers
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/cookies`,
    {
      preference: preference,
      userAgent: navigator.userAgent, // Captures browser/OS metadata for threat/usage analysis
      timestamp: new Date().toISOString()
    },
    { withCredentials: true } // Ensures the session is linked to this preference
  );

  // 2. Axios only reaches this line if the status code is 2xx (Success)
  // Save to localStorage only after successful DB confirmation
  localStorage.setItem('manor_cookie_pref', preference);
  console.log("Cookie preference successfully synced with Database.");

} catch (error) {
  // 3. Handle connection failures or server-side errors
  console.error("Database sync failed:", error.response?.data?.message || error.message);
  
  // Note: We don't alert the user here because cookie consent 
  // should be a seamless, non-intrusive background process.
} finally {
  // 4. Always close the modal regardless of success or failure
  closeModal();
}
  };

  // Check if user has already set preferences on page load
  useEffect(() => {
    const savedPref = localStorage.getItem('manor_cookie_pref');
    if (!savedPref) {
      // Auto-show cookie window after 1.5s if not set
      const timer = setTimeout(() => setActiveModal('cookies'), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header onOpenGiftCard={() => setIsGiftCardOpen(true)} />

      <main className="pt-32">
        <Outlet />
      </main>

      <Footer 
        onOpenBlog={() => setActiveModal('blog')}
        onOpenCareers={() => setActiveModal('careers')}
        onOpenContact={() => setActiveModal('contact')}
        onOpenFaqs={() => setActiveModal('faqs')}
        onOpenLocation={() => setActiveModal('location')}
        onOpenParking={() => setActiveModal('parking')}
        onOpenPrivacy={() => setActiveModal('privacy')}
        onOpenCookies={() => setActiveModal('cookies')}
      />

      {/* --- MODAL RENDERING --- */}
      <GiftCardModal isOpen={isGiftCardOpen} onClose={() => setIsGiftCardOpen(false)} />

      {/* Cookie Window with DB Save LOGIC */}
      <CookieWindow 
        isOpen={activeModal === 'cookies'} 
        onClose={closeModal} 
        onSavePreference={handleSaveCookiePreference} 
      />

      {/* Footer Modals */}
      {activeModal === 'blog' && <BlogModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'careers' && <CareersModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'contact' && <ContactUsModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'faqs' && <FaqsModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'location' && <LocationModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'parking' && <ParkingModal isOpen={true} onClose={closeModal} />}
      {activeModal === 'privacy' && <PrivacyPolicyModal isOpen={true} onClose={closeModal} />}
    </div>
  );
};

export default Layout;
