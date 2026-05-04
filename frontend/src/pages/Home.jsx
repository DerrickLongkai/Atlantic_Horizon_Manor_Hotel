import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import BookingBar from '../components/BookingBar';
import Introduction from '../components/Introduction';
import Newsletter from '../components/Newsletter';

/**
 * PAGE: Home
 * Main landing page for The Atlantic Horizon Manor website.
 *
 * SECTIONS (in order from top to bottom):
 * 1. Gallery - Cinematic slideshow of property images
 * 2. BookingBar - Quick booking form for guests
 * 3. Introduction - Overview of property features and services
 * 4. Newsletter - Email signup for updates and offers
 *
 */
const Home = () => {
  return (
    <>
      {/* SECTION 1: GALLERY SLIDESHOW */}
      <div className="relative">
        <Gallery />
      </div>

      {/* SECTION 2: BOOKING BAR */}
      {/* Positioned absolutely to overlap with gallery for dramatic effect */}
      <BookingBar />

      {/* SECTION 3: INTRODUCTION & FEATURES */}
      {/* Highlights luxury accommodations and culinary excellence */}
      <Introduction />

      {/* SECTION 4: NEWSLETTER SIGNUP */}
      {/* Encourages visitors to subscribe for updates and special offers */}
      <Newsletter />
    </>
  );
};

export default Home;