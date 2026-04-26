import React, { useEffect } from 'react';
import { COLORS } from '../../colors';
import logoImg from '../../images/HomePage/Logo.png';

// 1. Import all images from the ultimate(3) folder
import viewImg from '../../images/George/ultimate(3)/view.avif';
import view2Img from '../../images/George/ultimate(3)/view2.jpg';
import view3Img from '../../images/George/ultimate(3)/view3.jpg';
import bedImg from '../../images/George/ultimate(3)/bed.avif';
import view4Img from '../../images/George/ultimate(3)/view4.jpg';
import view5Img from '../../images/George/ultimate(3)/view5.jpg';
import bathroomImg from '../../images/George/ultimate(3)/bathroom.jpg';
import livingRoomImg from '../../images/George/ultimate(3)/livingRoom.jpg';
import view6Img from '../../images/George/ultimate(3)/view6.avif';

export default function UltimateExclusivity() {
  
  // Auto-scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Map imported images into an array for easy reference
  const superiorImgs = [
    viewImg,       // [0]
    view2Img,      // [1]
    view3Img,      // [2]
    bedImg,        // [3]
    view4Img,      // [4]
    view5Img,      // [5]
    bathroomImg,   // [6]
    livingRoomImg, // [7]
    view6Img       // [8]
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen font-lato selection:bg-amber-500/20 selection:text-amber-900">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[80vh] bg-[#1a1d17] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Using superiorImgs[0] */}
        <img 
          src={superiorImgs[0]} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105" 
          alt="Exclusivity Hero" 
        />
        <div className="relative z-10 space-y-8">
          <h1 className="font-cinzel text-6xl md:text-8xl text-white tracking-[0.3em] uppercase">
            BEYOND<br/>EXPERIENCE
          </h1>
          <div className="h-px w-32 bg-amber-500 mx-auto mt-10"></div>
          <p className="text-white/40 uppercase tracking-[0.5em] text-[10px]">
            Membership & Discretion
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-40">
        
        {/* SECTION 2: DETAIL GALLERY */}
        <div className="space-y-40">
           
           {/* Row 1 */}
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                 <h2 className="font-cinzel text-5xl text-[#2c372b]">Uncompromising Standards</h2>
                 <p className="text-sm text-gray-500 leading-loose">
                   Even our base-tier experiences are defined by the exceptional. We provide private helipad access and secure gated entry for all guests who value absolute anonymity.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
                 <img src={superiorImgs[1]} className="w-full h-80 object-cover rounded shadow-xl" alt="View 2" />
                 <img src={superiorImgs[2]} className="w-full h-80 object-cover rounded shadow-xl mt-12" alt="View 3" />
              </div>
           </div>

           {/* Row 2: THE REFINEMENT SUITE */}
           <div className="bg-white p-10 md:p-20 shadow-2xl rounded-sm text-center space-y-12 border border-gray-100">
              <h3 className="font-cinzel text-3xl tracking-widest text-[#2c372b] uppercase">
                The Refinement Suite
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                 <img src={superiorImgs[3]} className="w-full h-64 object-cover rounded shadow-md" alt="Bed" />
                 <img src={superiorImgs[8]} className="w-full h-64 object-cover rounded shadow-md" alt="View 6" />
                 <img src={superiorImgs[6]} className="w-full h-64 object-cover rounded shadow-md" alt="Bath" />
              </div>

              <p className="max-w-2xl mx-auto text-xs opacity-50 uppercase tracking-widest italic">
                "Every detail curated by the Manor Shadow Team – for those whose lives require absolute precision."
              </p>
           </div>

           {/* Row 3 */}
           <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 flex gap-4">
                 <img src={superiorImgs[4]} className="w-1/2 h-96 object-cover rounded shadow-xl" alt="View 4" />
                 <img src={superiorImgs[5]} className="w-1/2 h-96 object-cover rounded shadow-xl mt-10" alt="View 5" />
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <h4 className="font-cinzel text-2xl uppercase tracking-widest border-b border-gray-100 pb-4">
                   The Private Balcony
                 </h4>
                 <p className="text-sm text-gray-400 italic font-georgia leading-loose">
                   "Dine overlooking the rugged horizon as the first light hits the manor grounds."
                 </p>
                 <img src={superiorImgs[7]} className="w-full h-48 object-cover rounded shadow-lg" alt="Living Room" />
              </div>
           </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="bg-[#2c372b] text-white py-40 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-6">
           <h3 className="font-cinzel text-4xl mb-12 tracking-widest uppercase">
             Discretion is our Currency
           </h3>
           <p className="text-xs opacity-40 uppercase tracking-[0.3em] mb-12 leading-loose">
             Connect with our Estates Director for a private consultation regarding extended stays or corporate retreats.
           </p>

           <button 
             style={{ backgroundColor: COLORS.manorGold }} 
             className="px-16 md:px-20 py-5 text-white text-[11px] uppercase tracking-[0.5em] font-black shadow-2xl hover:brightness-110 transition-all"
           >
             Connect Privately
           </button>
        </div>

        {/* Background logo decoration */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5 bg-no-repeat bg-center bg-contain pointer-events-none"
          style={{ backgroundImage: `url(${logoImg})` }}
        ></div>
      </section>
    </div>
  );
}
