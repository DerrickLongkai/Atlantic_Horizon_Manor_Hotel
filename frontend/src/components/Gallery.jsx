import React, { useEffect, useState } from "react";

// STEP 1: Import all gallery images used in the slideshow.
// Keeping imports explicit ensures bundlers (Vite/Webpack) include them correctly.
import g1 from "../images/HomePage/gallery1.webp";
import g2 from "../images/HomePage/gallery2.jpg";
import g3 from "../images/HomePage/gallery3.jpg";
import g4 from "../images/HomePage/gallery4.jpg";
import g5 from "../images/HomePage/gallery5.jpg";
import g6 from "../images/HomePage/gallery6.jpg";

// STEP 2: Define a simple array of slide objects.
// Using objects allows future extensibility (e.g., alt text, captions, metadata).
const slides = [
  { src: g1 },
  { src: g2 },
  { src: g3 },
  { src: g4 },
  { src: g5 },
  { src: g6 }
];
// Homepage gallery component with a cinematic slideshow effect.
export default function Gallery() {
  // index → tracks the currently visible slide.
  // mounted → ensures animations only trigger after the component has mounted.
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Enable animation effects after initial mount.
    setMounted(true);

    // Auto‑advance slides every 8 seconds.
    // Using modulo ensures the slideshow loops seamlessly.
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    // Cleanup interval on unmount to prevent memory leaks.
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-[#0c0e0a]">
      
      {/* 
        BACKGROUND SLIDES
        - Each slide is absolutely positioned to fill the container.
        - Opacity transitions create a smooth crossfade effect.
        - The inner div applies the Ken Burns zoom animation.
      */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* 
            Ken Burns Effect:
            - Slow zoom from scale-100 → scale-110.
            - Only applied to the active slide.
            - Uses linear timing for a cinematic feel.
          */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
              i === index && mounted ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        </div>
      ))}

      {/* 
        NAVIGATION INDICATORS
        - Minimal luxury-style horizontal bars.
        - No numbers or text — purely visual.
        - Buttons are accessible via aria-label.
        - Active indicator expands in width and uses gold color.
      */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group relative py-4 px-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`h-[2px] transition-all duration-500 ${
                i === index
                  ? "w-12 bg-amber-500" // Active indicator
                  : "w-6 bg-white/20 group-hover:bg-white/40" // Inactive indicator
              }`}
            />
          </button>
        ))}
      </div>

      {/* 
        SIDE VIGNETTES
        - Soft gradient overlays on left/right edges.
        - Adds cinematic depth without blocking the main image.
        - pointer-events-none ensures they never interfere with interactions.
      */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/40 to-transparent z-20 pointer-events-none" />
    </section>
  );
}

