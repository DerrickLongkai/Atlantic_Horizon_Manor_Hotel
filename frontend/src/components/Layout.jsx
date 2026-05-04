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

/**
 * COMPONENT: Layout
 * 
 * Main wrapper component for all public-facing pages.
 *
 * PURPOSE:
 * - Provides consistent header and footer across all pages
 * - Manages modal state for gift cards and footer information
 * - Handles cookie preference persistence
 * - Acts as a container for page content via React Router's Outlet
 *
 */
const Layout = () => {
  /**
   * STATE MANAGEMENT
   * 
   * isGiftCardOpen: Controls visibility of gift card purchase modal
   * activeModal: Tracks which footer modal is currently open (null if none)
   *   Possible values: 'cookies', 'blog', 'careers', 'contact', 'faqs', 'location', 'parking', 'privacy'
   */
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); 

  /**
   * HELPER: Close Modal
   * 
   * Resets activeModal to null, closing any currently open modal
   * Called after user closes a modal or saves preferences
   */
  const closeModal = () => setActiveModal(null);

  /**
   * HANDLER: Save Cookie Preference
   * 
   * Saves user's cookie consent choice to both backend database and browser storage.
   *
   * PROCESS:
   * 1. Send POST request to backend API with preference
   * 2. Include user-agent and timestamp for auditing
   * 3. Save preference to localStorage for future visits
   * 4. Close the modal regardless of success or failure
   *
   * PARAMETERS:
   * - preference: 'accepted' or 'declined'
   *
   * ERROR HANDLING:
   * - Silently logs errors without alerting user
   * - Cookie consent should be non-intrusive background process
   * - Modal closes regardless of backend success
   */
  const handleSaveCookiePreference = async (preference) => {
    try {
      // 1. SEND BACKEND REQUEST
      // Axios automatically serializes to JSON and sets Content-Type header
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/cookies`,
        {
          preference: preference,
          // Browser information for GDPR audit trail
          userAgent: navigator.userAgent,
          // Timestamp of preference capture
          timestamp: new Date().toISOString()
        },
        { withCredentials: true }
      );

      // 2. SAVE TO BROWSER STORAGE
      // Only persist to localStorage if backend confirms success
      localStorage.setItem('manor_cookie_pref', preference);
      console.log("Cookie preference successfully synced with Database.");

    } catch (error) {
      // 3. ERROR HANDLING
      // Log for debugging, but don't interrupt user experience
      console.error("Database sync failed:", error.response?.data?.message || error.message);
      
    } finally {
      // 4. ALWAYS CLOSE MODAL
      // Ensure modal closes whether request succeeds or fails
      closeModal();
    }
  };

  /**
   * EFFECT: Auto-Show Cookie Consent on First Visit
   * 
   * Checks if user has previously set cookie preferences.
   * If not, shows cookie consent modal after 1.5 second delay.
   * This gives users time to read page before interrupting.
   */
  useEffect(() => {
    // Check localStorage for saved preference from previous visits
    const savedPref = localStorage.getItem('manor_cookie_pref');
    
    if (!savedPref) {
      // No previous preference found
      // Show cookie window after 1.5 second delay
      const timer = setTimeout(() => setActiveModal('cookies'), 1500);
      
      // Cleanup: clear timeout if component unmounts before delay
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    /**
     * ROOT CONTAINER
     * 
     * Full-screen wrapper for entire page layout
     */
    <div className="min-h-screen bg-black overflow-x-hidden">
      
      {/* HEADER */}
      {/* Top navigation bar with logo, menu, and quick actions */}
      <Header onOpenGiftCard={() => setIsGiftCardOpen(true)} />

      {/* MAIN CONTENT AREA */}
      {/* Route content renders here via React Router's Outlet component */}
      <main className="pt-32">
        <Outlet />
      </main>

      {/* FOOTER */}
      {/* Bottom section with information links and modal triggers */}
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

      {/* 
          MODAL LAYER - All modals rendered conditionally
          */}
      
      {/* GIFT CARD MODAL */}
      {/* Opens when user clicks Gift Card button in header */}
      <GiftCardModal 
        isOpen={isGiftCardOpen} 
        onClose={() => setIsGiftCardOpen(false)} 
      />

      {/* COOKIE CONSENT MODAL */}
      {/* Opens automatically on first visit or when user clicks Cookies link */}
      <CookieWindow 
        isOpen={activeModal === 'cookies'} 
        onClose={closeModal} 
        onSavePreference={handleSaveCookiePreference} 
      />

      {/* FOOTER INFORMATION MODALS */}
      {/* Each modal appears when user clicks corresponding footer link */}
      {activeModal === 'blog' && <BlogModal onClose={closeModal} />}
      {activeModal === 'careers' && <CareersModal onClose={closeModal} />}
      {activeModal === 'contact' && <ContactUsModal onClose={closeModal} />}
      {activeModal === 'faqs' && <FaqsModal onClose={closeModal} />}
      {activeModal === 'location' && <LocationModal onClose={closeModal} />}
      {activeModal === 'parking' && <ParkingModal onClose={closeModal} />}
      {activeModal === 'privacy' && <PrivacyPolicyModal onClose={closeModal} />}
    </div>
  );
};

export default Layout;
