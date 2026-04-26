import React, { useEffect } from 'react';
import { COLORS } from '../../colors';

// 1. Import all images from George's folder
// Note: Your folder name is "Superior(1)" — the path must match exactly
import balconyImg from '../../images/George/Superior(1)/balcony.jpg';
import bathroomImg from '../../images/George/Superior(1)/bathroom.jpg';
import bedImg from '../../images/George/Superior(1)/bed.avif';
import livingRoomImg from '../../images/George/Superior(1)/livingRoom.jpg';
import viewImg from '../../images/George/Superior(1)/view.png';
import view2Img from '../../images/George/Superior(1)/view2.webp';
import view3Img from '../../images/George/Superior(1)/view3.jpg';
import view4Img from '../../images/George/Superior(1)/VIEW4.jpg'; // Note: uppercase VIEW4
import view5Img from '../../images/George/Superior(1)/view5.jpg';

export default function PrivateLodges() {
  
  // Auto-scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Store imported images in an array for easier usage below
  const deluxeImages = [
    balconyImg,    // [0]
    viewImg,       // [1]
    view2Img,      // [2]
    bedImg,        // [3]
    livingRoomImg, // [4]
    bathroomImg,   // [5]
    view4Img,      // [6]
    view5Img       // [7]
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen font-lato selection:bg-[#343a2f]/10 selection:text-[#343a2f]">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <img src={deluxeImages[0]} className="absolute inset-0 w-full h-full object-cover scale-110" alt="Hero" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-amber-500 uppercase tracking-[0.8em] text-[10px] mb-6 animate-pulse font-bold">
            Nature's Own Sanctuary
          </span>
          <h1 className="font-cinzel text-6xl md:text-9xl text-white mb-8 tracking-tighter uppercase drop-shadow-2xl">
            Private Lodges
          </h1>
          <div className="h-px w-40 bg-amber-500/50 mb-10"></div>
          <p className="max-w-2xl text-white/90 font-georgia italic text-xl leading-relaxed">
            "Experience the raw beauty of the Atlantic from your private limestone sanctuary."
          </p>
        </div>
      </section>

      {/* SECTION 2: THE ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
          <div className="space-y-10 group">
            <h2 className="font-cinzel text-5xl text-[#2c372b]">Built Into The Landscape</h2>
            <p className="text-sm text-gray-500 leading-loose">
              Our lodges are designed to be invisible from a distance, burrowed into the limestone cliffs. Every window is a frame, capturing the raw, unedited beauty of the Wild Atlantic weather.
            </p>
            <div className="overflow-hidden rounded-sm shadow-2xl">
              <img src={deluxeImages[1]} className="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110" alt="View 1" />
            </div>
          </div>
          <div className="relative">
            <img src={deluxeImages[2]} className="rounded-sm shadow-2xl w-full h-[600px] object-cover" alt="View 2" />
            <div className="absolute -bottom-10 -right-10 bg-[#2c372b] p-12 text-white hidden md:block shadow-2xl">
              <p className="font-cinzel text-3xl text-amber-500 mb-2">100%</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Sustainable Materials</p>
            </div>
          </div>
        </div>

        {/* SECTION 3: GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <div className="space-y-8">
            <img src={deluxeImages[3]} className="w-full h-[400px] object-cover rounded shadow-lg hover:shadow-2xl transition-all" alt="Bed" />
            <h4 className="font-cinzel text-lg">Serene Slumber</h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Hand-carved Irish Oak Furniture</p>
          </div>
          <div className="space-y-8 pt-20">
            <img src={deluxeImages[4]} className="w-full h-[400px] object-cover rounded shadow-lg hover:shadow-2xl transition-all" alt="Living" />
            <h4 className="font-cinzel text-lg">Fireside Evenings</h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Log-burning Stone Hearth</p>
          </div>
          <div className="space-y-8">
            <img src={deluxeImages[7]} className="w-full h-[400px] object-cover rounded shadow-lg hover:shadow-2xl transition-all" alt="Detail" />
            <h4 className="font-cinzel text-lg">Atlantic Tides</h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Panoramic Cliff-side Windows</p>
          </div>
        </div>

        {/* SECTION 4: THE SPA EXPERIENCE */}
        <div className="bg-[#343a2f] text-white p-10 md:p-20 rounded-sm grid md:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
             <img src={deluxeImages[5]} className="w-full h-64 object-cover rounded-sm" alt="Bath 1" />
             <img src={deluxeImages[6]} className="w-full h-64 object-cover rounded-sm" alt="Bath 2" />
          </div>
          <div className="space-y-8">
            <h3 className="font-cinzel text-3xl tracking-widest uppercase">Private Thermal Sanctuary</h3>
            <p className="text-sm opacity-60 leading-loose italic font-georgia">
              "Every lodge features an oversized soaking tub that faces the Atlantic, allowing you to witness the storm while cocooned in warmth."
            </p>
            <button className="border border-amber-500 text-amber-500 px-10 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-amber-500 hover:text-white transition-all">
              Request In-Lodge Spa
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
