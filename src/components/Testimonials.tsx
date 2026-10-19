import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/content';
import { Star, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-white border-t border-slate-200/60 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F1F5F9] border border-slate-200 text-slate-800 mb-4 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-lime-600" />
              <span>CLIENT EXPERIENCES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
              GOOD WORK SPEAKS FOR ITSELF.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-xl">
              From everyday daily drivers to limited-run supercars, our customers trust us to protect their pride and joy.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 hover:text-black shadow-sm transition-colors"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 hover:text-black shadow-sm transition-colors"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((review, idx) => (
            <div
              key={review.id}
              className={`p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                idx === currentIndex
                  ? 'border-2 border-slate-900 bg-white shadow-xl ring-2 ring-slate-900/5'
                  : 'bg-[#F8FAFC] border border-slate-200/90 hover:border-slate-300 hover:bg-white shadow-sm'
              }`}
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Vehicle Info */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#0F172A] text-sm">
                    {review.author}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {review.tag}
                  </span>
                </div>
                
                <div className="text-xs text-slate-600 mt-1">
                  {review.vehicle}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {review.service} • {review.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demonstration Disclaimer & External Review Placeholder */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-600 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Demonstration testimonials for design presentation. Real client reviews can be configured via Google Reviews API.
            </span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-black underline shrink-0"
          >
            <span>Leave a Review / Feedback</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
