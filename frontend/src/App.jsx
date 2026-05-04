import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Enable axios to include session cookies in all requests
axios.defaults.withCredentials = true;

// Import global scroll restoration component
import ScrollToTop from './components/ScrollToTop';

// Base layout
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import SelfCheckIn from './pages/SelfCheckIn';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

/**
 * DERRICK'S PAGES (Spa & Wellness)
 * Premium spa and wellness experiences
 */
import Sauna from './pages/Derrick/Sauna';
import Facial from './pages/Derrick/Facial';
import Hottub from './pages/Derrick/Hottub';
import Jacuzzi from './pages/Derrick/Jacuzzi';
import Massage from './pages/Derrick/Massage';

/**
 * GEORGE'S PAGES (Inclusive Resort)
 * Luxury accommodation options and exclusive services
 */
import PrivateLodges from './pages/George/privateLodges';
import PrivateVillas from './pages/George/privateResidencesAndVillas';
import UltimateExclusivity from './pages/George/ultimateExclusivity';

/**
 * LINCOLN'S PAGES (Experience & Dining)
 * Curated experiences and fine dining options
 */
import MichelinFood from './pages/Lincoln/michelineQualityFood';
import Breakfast from './pages/Lincoln/continentalBreakfast';
import Excursion from './pages/Lincoln/localIrishExcursion';
import Chauffeur from './pages/Lincoln/privateChauffer';
import Honeymoon from './pages/Lincoln/honeymoonPackage';

// Main App - Sets up routing for admin, client, and experience pages
function App() {
  return (
    <Router>
      {/* 
        ScrollToTop Component:
        - Monitors all route changes
        - Automatically scrolls to top on navigation
        - Placed here (inside Router, outside Routes) for global effect
      */}
      <ScrollToTop />

      <Routes>
        {/* 
            ADMIN ROUTES (Standalone - No Layout Wrapper)
            
            These routes do NOT have the header/footer from Layout.
            They are internal management interfaces.
        */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/*
            STANDALONE CLIENT ROUTES (No Layout Wrapper)
            
            Booking and check-in flows are presented without the main layout.
            This allows for focused, distraction-free interactions.
        */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/self-checkin" element={<SelfCheckIn />} />

        {/*
            MAIN CLIENT ROUTES (Wrapped with Layout)
            
        */}
        <Route path="/" element={<Layout />}>
          {/* HOME PAGE */}
          <Route index element={<Home />} />

          {/* 
            SECTION 1: LINCOLN'S EXPERIENCES (Fine Dining & Activities)
            Curated experiences combining food, adventure, and luxury travel
          */}
          <Route path="michelineQualityFood" element={<MichelinFood />} />
          <Route path="continentalBreakfast" element={<Breakfast />} />
          <Route path="localIrishExcursion" element={<Excursion />} />
          <Route path="privateChauffer" element={<Chauffeur />} />
          <Route path="honeymoonPackage" element={<Honeymoon />} />

          {/* 
            SECTION 2: DERRICK'S SPA & WELLNESS
            Premium wellness and relaxation services
          */}
          <Route path="sauna" element={<Sauna />} />
          <Route path="facial" element={<Facial />} />
          <Route path="hottub" element={<Hottub />} />
          <Route path="jacuzzi" element={<Jacuzzi />} />
          <Route path="massage" element={<Massage />} />

          {/* 
            SECTION 3: GEORGE'S ACCOMMODATIONS (Luxury Lodging)
            Private lodges, residences, villas, and exclusive estates
          */}
          <Route path="lodges" element={<PrivateLodges />} />
          <Route path="villas" element={<PrivateVillas />} />
          <Route path="exclusivity" element={<UltimateExclusivity />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




