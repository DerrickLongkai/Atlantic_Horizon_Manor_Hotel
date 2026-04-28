import React, { useEffect } from 'react';
import { COLORS } from '../../colors';

// 1. Import all images from the Honeymoon folder
import sunsetImg from '../../images/Lincoln/Honeymoon/sunset.png';
import dinnerImg from '../../images/Lincoln/Honeymoon/dinner.png';
import yachtImg from '../../images/Lincoln/Honeymoon/sunset_yatch.png'; // Keeping the folder's original "yatch" spelling
import massageImg from '../../images/Lincoln/Honeymoon/massage.jpg';
import spaRobeImg from '../../images/Lincoln/Honeymoon/spa_robe.jpg';
import movieImg from '../../images/Lincoln/Honeymoon/movie.png';

export default function HoneymoonPackage() {
  
  // Auto-scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#111310] min-h-screen text-white font-lato selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
           {/* Using imported sunsetImg */}
           <img src={sunsetImg} className="w-full h-full object-cover opacity-90 scale-105" alt="Honeymoon Sunset" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-[#111310]/60"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
           <div className="flex items-center justify-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-amber-500/50"></div>
             <span className="text-amber-500 uppercase tracking-[0.5em] text-[10px] md:text-xs font-black drop-shadow-md">
               Atlantic Curated Romance
             </span>
             <div className="h-[1px] w-12 bg-amber-500/50"></div>
           </div>
           
           <h1 className="font-cinzel text-4xl md:text-5xl lg:text-8xl tracking-widest uppercase leading-[1.1] text-white/95 mb-6 drop-shadow-xl">
             Eternal<br/><span className="text-amber-500 italic font-georgia drop-shadow-2xl">Romance</span>
           </h1>
           
           <p className="font-georgia italic text-xl md:text-2xl text-white/60 mb-12 drop-shadow-md border-l border-amber-500/30 pl-6 text-left max-w-2xl mx-auto">
             "Celebrate your union where the cliffs meet the sky."
           </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20">
            <span className="text-[9px] uppercase tracking-[0.4em] font-light text-white">The Registry</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* THE INCLUSIONS - EDITORIAL GRID */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto relative bg-[#111310] border-t border-white/5">
         
         <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-white/90 mb-6 tracking-widest uppercase">
              The Inclusion List
            </h2>
            <p className="text-sm text-white/50 leading-loose font-light">
                Our dedicated Estate Romance Concierge ensures every moment of your stay is choreographed to perfection.
            </p>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            
            {/* ITEM 1: Private Dining */}
            <div className="col-span-1 lg:col-span-7 group">
               <div className="relative aspect-[4/3] overflow-hidden shadow-2xl mb-6 border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                  {/* Using imported dinnerImg */}
                  <img src={dinnerImg} className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" alt="Private Dining" />
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-amber-500 font-cinzel text-2xl">01</span>
                  <div>
                     <h3 className="font-cinzel text-xl text-white/90 mb-2 uppercase tracking-wide">Private Michelin Dining</h3>
                     <p className="text-xs text-white/50 leading-relaxed font-light">
                       A secluded seven-course tasting menu served by candlelight.
                     </p>
                  </div>
               </div>
            </div>

            {/* ITEM 2: Private Yacht Sunset */}
            <div className="col-span-1 lg:col-span-5 group mt-8 lg:mt-32">
               <div className="relative aspect-[3/4] overflow-hidden shadow-2xl mb-6 border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                  {/* Using imported yachtImg */}
                  <img src={yachtImg} className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" alt="Sunset Yacht" />
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-amber-500 font-cinzel text-2xl">02</span>
                  <div>
                     <h3 className="font-cinzel text-xl text-white/90 mb-2 uppercase tracking-wide">Sunset Yacht Charter</h3>
                     <p className="text-xs text-white/50 leading-relaxed font-light">
                       Board our private estate yacht for a two-hour sunset cruise.
                     </p>
                  </div>
               </div>
            </div>

            {/* ITEM 3: Couples Massage */}
            <div className="col-span-1 lg:col-span-6 group mt-8 lg:mt-0">
               <div className="relative aspect-video overflow-hidden shadow-2xl mb-6 border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                  {/* Using imported massageImg */}
                  <img src={massageImg} className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" alt="Couples Massage" />
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-amber-500 font-cinzel text-2xl">03</span>
                  <div>
                     <h3 className="font-cinzel text-xl text-white/90 mb-2 uppercase tracking-wide">Couple's Spa Sanctuaries</h3>
                     <p className="text-xs text-white/50 leading-relaxed font-light">
                       An immersive session orchestrated by Derrick's renowned wellness team.
                     </p>
                  </div>
               </div>
            </div>

            {/* ITEM 4: Spa Robes */}
            <div className="col-span-1 lg:col-span-6 group mt-8 lg:mt-24">
               <div className="relative aspect-video overflow-hidden shadow-2xl mb-6 border border-white/5">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10"></div>
                  {/* Using imported spaRobeImg */}
                  <img src={spaRobeImg} className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105" alt="Spa Robes" />
               </div>
               <div className="flex gap-4 items-start">
                  <span className="text-amber-500 font-cinzel text-2xl">04</span>
                  <div>
                     <h3 className="font-cinzel text-xl text-white/90 mb-2 uppercase tracking-wide">Rose Petal Turndown</h3>
                     <p className="text-xs text-white/50 leading-relaxed font-light">
                       Return to your suite to find embroidered monogrammed robes.
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* GRAND FINALE - PRIVATE MOVIE SCREENING */}
      <section className="py-24 px-6 md:px-16 lg:px-24 mb-12 max-w-7xl mx-auto border-t border-white/5">
         <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#0a0c09] text-white rounded-sm overflow-hidden shadow-2xl relative border border-white/5">
            
            <div className="relative aspect-video lg:aspect-auto lg:h-full w-full">
               {/* Using imported movieImg */}
               <img src={movieImg} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Private Cinema" />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0c09] hidden lg:block"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c09] to-transparent lg:hidden"></div>
            </div>

            <div className="p-10 lg:pr-16 relative z-10">
               <div className="flex items-center gap-4 text-amber-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-6">
                  <span>05</span>
                  <div className="h-[1px] w-12 bg-amber-500/30"></div>
               </div>
               
               <h3 className="font-cinzel text-2xl md:text-3xl mb-4 text-white/90">
                 Twilight Cinema 
                 <span className="italic font-georgia text-amber-500 block md:inline mt-2 md:mt-0">
                   Screening
                 </span>
               </h3>
               
               <p className="text-white/50 text-sm leading-loose font-light mb-8">
                  Conclude an unforgettable evening with a private cinematic experience.
               </p>

               <button className="border border-amber-500/30 px-8 py-3 text-[10px] uppercase font-bold tracking-widest text-white hover:bg-amber-500/10 transition-colors">
                  Inquire About Availability
               </button>
            </div>

         </div>
      </section>

    </div>
  );
}
