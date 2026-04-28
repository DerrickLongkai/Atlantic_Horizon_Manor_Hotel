import React from 'react';

//Import all images used in this section
import crestImg from '../images/HomePage/Logo.png';
import intro1 from '../images/HomePage/introduction2.jpg';
import intro2 from '../images/HomePage/introduction1.jpg';

// Feature blocks displayed in the lower section
const features = [
  {
    title: "Luxury Accommodations",
    eyebrow: "Private Lodges & Estates",
    text: "Our elegantly appointed rooms and suites offer the perfect blend of comfort and sophistication. Each space is designed with your relaxation in mind, featuring premium amenities and breathtaking Atlantic views.",
    img: intro1,
    reverse: false
  },
  {
    title: "Culinary Excellence",
    eyebrow: "Michelin-Inspired Dining",
    text: "Indulge in exceptional cuisine crafted by our award-winning chefs. From fine dining to coastal fare, our restaurants celebrate the rich flavors of Ireland's southwest — where land meets sea on every plate.",
    img: intro2,
    reverse: true
  }
];

export default function Introduction() {
  return (
    <section className="relative py-24 px-6 bg-[#e5e6bc] overflow-hidden">

      {/* Ultra-thin gold lines at the top and bottom for a refined luxury frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

      {/* 
        SECTION 1 — INTRO TEXT
        This is the hero-style introduction for the resort, centered and elegant.
      */}
      <div className="relative max-w-3xl mx-auto text-center mb-32">

        {/* Crest / Logo displayed above the intro text */}
        <div className="mb-8">
          <img
            src={crestImg}
            alt="Atlantic Horizon Manor Crest"
            className="h-24 w-24 mx-auto object-contain"
          />
        </div>

        {/* Decorative divider with a gold star in the center */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-amber-600/60" />
          <span className="text-amber-600 text-xs">✦</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-amber-600/60" />
        </div>

        {/* Eyebrow text */}
        <p className="text-amber-600 uppercase tracking-[0.5em] text-[9px] font-bold mb-4">
          Est. Ireland's Southwest Coast
        </p>

        {/* Main title */}
        <h1 className="font-cinzel text-3xl md:text-5xl tracking-[4px] font-normal mb-4 text-gray-900 uppercase">
          The Atlantic Horizon Manor
        </h1>

        {/* Subheading with serif italic styling */}
        <h2 className="font-serif italic text-xl md:text-2xl text-amber-800 mb-12 font-normal">
          Royal Elegance on Ireland's Southwest Coast
        </h2>

        {/* Introductory paragraphs */}
        <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed font-light tracking-wide italic">
          <p>
            Perched where the rugged beauty of the Southwest of Ireland meets
            the infinite blue, The Atlantic Horizon Manor offers a sanctuary of
            refined luxury and timeless royalty.
          </p>
          <p>
            Experience breathtaking Atlantic views from our historic estate,
            where every room tells a story of elegance. From the crashing waves
            below to the gold-leafed ceilings above, we invite you to immerse
            yourself in a world designed for those who seek the extraordinary.
          </p>
        </div>
      </div>

      {/* 
        SECTION 2 — FEATURE SHOWCASE
        Alternating image/text blocks highlighting key experiences.
      */}
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-amber-600 uppercase tracking-[0.5em] text-[10px] font-bold mb-4">
            The Manor Experience
          </p>
          <h2 className="font-cinzel text-3xl md:text-4xl text-gray-900 uppercase tracking-widest mb-4">
            A World Apart
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-600/50" />
            <span className="text-amber-600/60 text-xs">✦</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-600/50" />
          </div>
        </div>

        {/* Feature list — each block alternates layout using reverse flag */}
        <div className="flex flex-col gap-32">
          {features.map((f, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${
                f.reverse ? 'md:flex-row-reverse' : ''
              }`}
            >

              {/* 
                IMAGE COLUMN
                Includes decorative corner frames and grayscale hover reveal.
              */}
              <div className="flex-1 w-full relative">

                {/* Decorative corner accents (top-left & bottom-right) */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-amber-600/60 z-10 -translate-x-3 -translate-y-3" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-amber-600/60 z-10 translate-x-3 translate-y-3" />
                
                {/* Image container */}
                {/* Image zoom in on hover */}
                <div className="overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    className="w-full h-[350px] md:h-[450px] object-cover block grayscale-[30%] hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
                  />
                </div>

                {/* Soft overlay for subtle depth */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* 
                TEXT COLUMN
                Contains eyebrow, title, divider, description, and CTA button.
              */}
              <div className="flex-1 text-left">
                <p className="text-amber-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
                  {f.eyebrow}
                </p>

                <h3 className="font-cinzel text-2xl md:text-4xl text-gray-900 uppercase tracking-wider mb-6">
                  {f.title}
                </h3>

                {/* Small gold divider */}
                <div className="h-px w-16 bg-amber-600/60 mb-8" />

                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light mb-10 italic">
                  {f.text}
                </p>

                {/* CTA button */}
                <button className="px-10 py-4 border border-amber-600/40 text-amber-600 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-amber-600 hover:text-white transition-all duration-500">
                  Explore More
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
