import React, { useState } from 'react';
import { Sparkles, Shield, MapPin, ChevronRight, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]"
    >
      {/* Background Subtle Ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#C6FF3D]/15 via-slate-200/20 to-transparent blur-3xl opacity-80" />
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-lime-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Automotive Campaign Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
            
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white border border-slate-200 text-slate-800 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#84CC16] -ml-3.5" />
                <span>PREMIUM CARE. EXCEPTIONAL FINISH.</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-slate-100 border border-slate-200 text-slate-600">
                <MapPin className="w-3 h-3 text-slate-900" />
                <span>PREMIER AUTOMOTIVE DETAILING</span>
              </span>
            </div>

            {/* Campaign Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-[0.92]">
                YOUR CAR.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-slate-700 to-[#65A30D]">
                  REIMAGINED.
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="text-base sm:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
              Precision car washing and detailing that brings out the best in every drive. Experience showroom depth, flawless gloss, and enduring ceramic protection.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-wider uppercase text-[#0F172A] bg-[#C6FF3D] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#b5f524] hover:shadow-lg hover:shadow-lime-300/40 hover:scale-[1.02] active:scale-[0.98] border border-[#aae81a] focus:outline-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>BOOK YOUR DETAILING</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => handleScrollTo('services')}
                className="inline-flex items-center justify-center px-7 py-4 text-sm font-bold tracking-wider uppercase text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-sm transition-all duration-200"
              >
                <span>EXPLORE OUR SERVICES</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 w-full max-w-md">
              <div>
                <div className="text-xl sm:text-2xl font-black font-display text-[#0F172A]">500+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Supercars Treated</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-display text-[#0F172A] flex items-center gap-1">
                  5.0 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Flawless Rating</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black font-display text-[#0F172A]">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Gloss Guarantee</div>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Car Visual */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* The Cinematic Car Container */}
            <div
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/80 border border-slate-200 bg-white group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 4}deg)`,
                transition: 'transform 0.25s ease-out',
              }}
            >
              {/* Glossy Car Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/hero-car.jpg"
                  alt="Velocity Auto Detailing - Flawless Gloss Black Luxury Sports Car"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Showcase Badges over the car image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs backdrop-blur-md bg-white/90 border border-slate-200 px-4 py-2.5 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900 tracking-wide">Ceramic Coating Certified</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Studio Bay & Mobile Units</span>
                </div>
              </div>

              {/* Top spec tag */}
              <div className="absolute top-4 right-4 backdrop-blur-md bg-[#0F172A]/85 border border-white/20 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-[#C6FF3D]">
                STUDIO SPEC: 9H CERAMIC
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Polished Animated Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center justify-center space-y-2 pt-4">
        <button
          onClick={() => handleScrollTo('services')}
          className="group flex flex-col items-center text-xs tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] tracking-[0.2em] font-bold mb-1">DISCOVER MORE</span>
          <div className="w-6 h-10 rounded-full border border-slate-300 group-hover:border-slate-800 flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-[#0F172A] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
