import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// AXIOS GLOBAL CONFIGURATION
axios.defaults.withCredentials = true;

// Base layout (includes Header & Footer for all client-facing pages)
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import SelfCheckIn from './pages/SelfCheckIn';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// --- DERRICK'S PAGES (Spa & Wellness) ---
import Sauna from './pages/Derrick/Sauna';
import Facial from './pages/Derrick/Facial';
import Hottub from './pages/Derrick/Hottub';
import Jacuzzi from './pages/Derrick/Jacuzzi';
import Massage from './pages/Derrick/Massage';

// --- GEORGE'S PAGES (Inclusive Resort) ---
import PrivateLodges from './pages/George/privateLodges';
import PrivateVillas from './pages/George/privateResidencesAndVillas';
import UltimateExclusivity from './pages/George/ultimateExclusivity';

// --- LINCOLN'S PAGES (Experience) ---
import MichelinFood from './pages/Lincoln/michelineQualityFood';
import Breakfast from './pages/Lincoln/continentalBreakfast';
import Excursion from './pages/Lincoln/localIrishExcursion';
import Chauffeur from './pages/Lincoln/privateChauffer';
import Honeymoon from './pages/Lincoln/honeymoonPackage';

function App() {
  return (
    <Router>
      <Routes>

        {/* =========================================
            ADMIN ROUTES (Standalone pages without Layout)
            ========================================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="booking" element={<Booking />} />
        <Route path="self-checkin" element={<SelfCheckIn />} />

        {/* =========================================
            CLIENT ROUTES (Wrapped with Layout: Header + Footer)
            ========================================= */}
        <Route path="/" element={<Layout />}>

          {/* Default homepage */}
          <Route index element={<Home />} />
          

          {/* Experience routes – Lincoln */}
          <Route path="michelineQualityFood" element={<MichelinFood />} />
          <Route path="continentalBreakfast" element={<Breakfast />} />
          <Route path="localIrishExcursion" element={<Excursion />} />
          <Route path="privateChauffer" element={<Chauffeur />} />
          <Route path="honeymoonPackage" element={<Honeymoon />} />

          {/* Spa & Wellness routes – Derrick */}
          <Route path="sauna" element={<Sauna />} />
          <Route path="facial" element={<Facial />} />
          <Route path="hottub" element={<Hottub />} />
          <Route path="jacuzzi" element={<Jacuzzi />} />
          <Route path="massage" element={<Massage />} />

          {/* Inclusive Resort routes – George */}
          <Route path="lodges" element={<PrivateLodges />} />
          <Route path="villas" element={<PrivateVillas />} />
          <Route path="exclusivity" element={<UltimateExclusivity />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;



