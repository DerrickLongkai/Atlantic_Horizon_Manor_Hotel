import React from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import BookingBar from '../components/BookingBar';
import Introduction from '../components/Introduction';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <div className="relative">
        <Gallery />
      </div>
      <BookingBar />
      <Introduction />
      <Newsletter />
    </>
  );
};

export default Home;