import React, { useEffect } from 'react';
import { COLORS } from '../../colors';

// 1. Import all images from the Chauffeur folder
// Note: Path goes two levels up from src/pages/Lincoln/ back to src, then into images
import maybachImg from '../../images/Lincoln/Chauffeur/maybach.png';
import rollsRoyceImg from '../../images/Lincoln/Chauffeur/RollsRoyce.avif';
import servicesImg from '../../images/Lincoln/Chauffeur/services.png';
import lobbyImg from '../../images/Lincoln/Chauffeur/lobby.jpg';
import helicopterImg from '../../images/Lincoln/Chauffeur/helicoptor.png'; // Keeping your folder spelling
import greetingsImg from '../../images/Lincoln/Chauffeur/greetings.jpg';

export default function PrivateChauffer() {
  
  // Auto-scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#111310] min-h-screen text-white font-lato selection:bg-amber-500/30 selection:text-amber-200">

      {/* MAIN HERO - MAYBACH */}
      <section className="relative aspect-[4/3] md:aspect-video min-h-[500px] md:min-h-0 w-full overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          {/* Using imported maybachImg */}
          <img src={maybachImg} className="w-full h-full object-cover opacity-60 scale-105" alt="Maybach Fleet" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111310]/80 via-transparent to-[#111310]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111310]/90 via-[#111310]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="h-[1px] w-16 bg-amber-500/50"></div>
              <span className="text-amber-500 uppercase tracking-[0.5em] text-[10px] md:text-xs font-black drop-shadow-lg">
                The Estate Motorcade
              </span>
            </div>

            <h1 className="font-cinzel text-4xl md:text-5xl lg:text-7xl tracking-widest uppercase leading-[1.1] md:leading-[1.1] text-white/95 mb-8">
              Private<br />
              <span className="text-amber-500 italic font-georgia block mt-2 ml-12 drop-shadow-2xl">
                Chauffeur
              </span>
            </h1>

            <p className="text-sm md:text-base text-white/60 max-w-lg leading-loose font-light border-l border-amber-500/30 pl-6 text-left">
              Arrive with an unspoken statement. The Lincoln estate maintains an exquisite, privately-owned fleet of the world's most prestigious vehicles.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20">
          <span className="text-[9px] uppercase tracking-[0.4em] font-light">Explore The Fleet</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* THE FLEET: ROLLS ROYCE & SERVICES */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 border-t border-white/5 relative bg-[#111310]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            <div className="lg:col-span-5 space-y-10 relative z-10">
              <div className="flex items-center gap-4 text-amber-500 font-bold tracking-[0.3em] text-[10px] uppercase">
                <span>01. The Motorcade</span>
                <div className="h-[1px] w-12 bg-amber-500/30"></div>
              </div>
              <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl leading-tight text-white/90">
                Heritage & <span className="italic font-georgia text-amber-500 block">Modern Luxury</span>
              </h2>
              <p className="text-white/50 text-sm leading-loose font-light">
                Whether you prefer the silent, gliding elegance of a modern Rolls-Royce Phantom or the commanding presence of a Maybach.
              </p>
            </div>

            <div className="lg:col-span-7 relative space-y-12 pb-12">
              <div className="relative aspect-video w-full overflow-hidden shadow-2xl lg:ml-12 border border-white/5">
                {/* Using imported rollsRoyceImg */}
                <img src={rollsRoyceImg} className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100" alt="Rolls Royce" />
              </div>
              <div className="relative aspect-video w-[85%] overflow-hidden shadow-2xl border border-white/5">
                {/* Using imported servicesImg */}
                <img src={servicesImg} className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100" alt="Services" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVIATION & ARRIVALS */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0c09] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

            <div className="lg:col-span-7 order-2 lg:order-1 relative space-y-12">
              <div className="relative aspect-video w-[85%] lg:w-[75%] overflow-hidden shadow-2xl left-[15%] lg:left-[25%] border border-white/5">
                {/* Using imported lobbyImg */}
                <img src={lobbyImg} className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100" alt="Lobby" />
              </div>
              <div className="relative aspect-video w-full lg:w-[90%] overflow-hidden shadow-2xl border border-white/5 lg:-ml-6 -mt-12 lg:-mt-24 z-10">
                {/* Using imported helicopterImg */}
                <img src={helicopterImg} className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100" alt="Helicopter" />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-10 order-1 lg:order-2 relative z-10 lg:pl-12">
              <div className="flex items-center gap-4 text-amber-500 font-bold tracking-[0.3em] text-[10px] uppercase">
                <span>02. The Arrival</span>
                <div className="h-[1px] w-12 bg-amber-500/30"></div>
              </div>
              <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl leading-tight text-white/90">
                Aviation & <span className="italic font-georgia text-amber-500 block">Airfield Transfers</span>
              </h2>
              <p className="text-white/50 text-sm leading-loose font-light">
                Should you require rapid transit, the estate boasts a private helipad, allowing you to arrive at the manor grounds in absolute privacy.
              </p>
              <div className="pt-8">
                <button className="relative overflow-hidden group/btn border border-amber-500/30 px-10 py-4 text-white text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:border-amber-500 bg-amber-500/5 hover:bg-transparent">
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-500">
                    Coordinate Arrival
                  </span>
                  <div className="absolute inset-0 h-full w-0 bg-amber-500 group-hover/btn:w-full transition-all duration-500 ease-out"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL TOUCH - DEPARTURE */}
      <section className="relative aspect-video min-h-[400px] md:max-h-[80vh] w-full flex items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          {/* Using imported greetingsImg */}
          <img src={greetingsImg} className="w-full h-full object-cover" alt="Departure" />
          <div className="absolute inset-0 bg-[#111310]/60 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl px-6">
          <h3 className="font-cinzel text-3xl md:text-5xl text-white/90 mb-6 drop-shadow-2xl">
            Your Chariot <span className="italic font-georgia text-amber-500">Awaits</span>
          </h3>
          <p className="text-white/50 text-sm font-light mb-10 leading-loose">
            Whether setting out for a Michelin-starred dinner or departing for the airport.
          </p>
        </div>
      </section>

    </div>
  );
}
