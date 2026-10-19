import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import { Sliders, Sparkles, MoveHorizontal, ZoomIn, X } from 'lucide-react';

export const BeforeAfterGallery: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const categories = ['All', 'Paintwork', 'Interior', 'Wheels', 'Protection', 'Wash'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(containerRef.current);
    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white border border-slate-200 text-slate-800 shadow-sm mb-4">
              <Sliders className="w-3.5 h-3.5 text-lime-600" />
              <span>TRANSFORMATION SHOWCASE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
              SEE THE DIFFERENCE.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-xl">
              Drag the interactive slider below to reveal the direct transformation on the exact same vehicle—from road-worn grime to our flawless mirror ceramic finish.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <MoveHorizontal className="w-4 h-4 text-slate-900" />
              <span>DRAG SLIDER OR USE ARROW KEYS</span>
            </span>
          </div>
        </div>

        {/* Interactive Before & After Slider */}
        <div className="relative mb-24">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after detailing comparison slider"
            className="relative w-full aspect-[16/9] max-h-[640px] rounded-3xl overflow-hidden shadow-xl shadow-slate-300/80 border border-slate-300/80 select-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-slate-900 bg-slate-900"
          >
            {/* After Image (Full background layer) */}
            <img
              src="/images/after-clean.jpg"
              alt="After Detailing - Flawless Mirror Gloss Ceramic Finish"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            
            {/* After Label */}
            <div className="absolute top-6 right-6 z-20 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-[#C6FF3D] text-[#0F172A] border border-[#aae81a] shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AFTER — CERAMIC POLISH</span>
              </span>
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/images/before-dirty.jpg"
                alt="Before Detailing - Road Grime and Dirty Paint"
                className="absolute inset-0 h-full object-cover object-center max-w-none"
                style={{
                  width: containerWidth ? `${containerWidth}px` : (containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'),
                }}
              />
              
              {/* Before Label */}
              <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-[#0F172A]/90 text-white border border-white/20 shadow-lg backdrop-blur-md">
                  <span>BEFORE — ROAD GRIME</span>
                </span>
              </div>
            </div>

            {/* Slider Dividing Bar & Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Vertical Glowing Line */}
              <div className="w-0.5 h-full bg-[#C6FF3D] shadow-[0_0_12px_#C6FF3D] -translate-x-1/2" />
              
              {/* Center Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0F172A] border-2 border-[#C6FF3D] shadow-lg flex items-center justify-center pointer-events-auto cursor-ew-resize">
                <MoveHorizontal className="w-5 h-5 text-[#C6FF3D]" />
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 px-2">
            <span>Visual comparison: Same vehicle before and after multi-stage ceramic detailing.</span>
            <span className="font-mono text-slate-900 font-bold">{Math.round(sliderPosition)}% SPLIT</span>
          </div>
        </div>

        {/* Secondary Showcase Gallery */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-[#0F172A] uppercase tracking-tight">
                STUDIO CRAFTSMANSHIP GALLERY
              </h3>
              <p className="text-sm text-slate-600">A closer look at wheel arches, leather interiors, and hydrophobic beading.</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item.image)}
                className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-[16/11] cursor-pointer shadow-md hover:shadow-xl hover:border-slate-400 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#C6FF3D] tracking-wider bg-black/70 px-2 py-0.5 rounded border border-white/20">
                      {item.tag}
                    </span>
                    <h4 className="text-sm font-bold text-white uppercase mt-1.5">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged Detailing Showcase"
            className="max-w-full max-h-[85vh] rounded-3xl object-contain shadow-2xl border border-white/20"
          />
        </div>
      )}
    </section>
  );
};
