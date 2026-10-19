import React from 'react';
import { PROCESS_STEPS } from '../data/content';
import { Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onOpenBooking: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenBooking }) => {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 border border-slate-200 text-slate-800 mb-4">
            <Calendar className="w-3.5 h-3.5 text-lime-600" />
            <span>THE EXPERIENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
            YOUR DETAILING. SIMPLIFIED.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            From seamless online booking to our precision turnaround, we respect your time as much as we value your vehicle.
          </p>
        </div>

        {/* 3 Step Process Grid with Connecting Circuit Line */}
        <div className="relative">
          {/* Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-8 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {PROCESS_STEPS.map((item, index) => (
              <div
                key={item.step}
                className="group relative flex flex-col p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
              >
                {/* Step Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="font-display font-black text-5xl sm:text-6xl text-slate-300 group-hover:text-[#0F172A] transition-colors">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 group-hover:border-slate-400 flex items-center justify-center transition-colors shadow-sm">
                    {index === 0 && <Sparkles className="w-5 h-5 text-slate-900" />}
                    {index === 1 && <Calendar className="w-5 h-5 text-slate-900" />}
                    {index === 2 && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </div>
                </div>

                {/* Subtitle & Title */}
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-700 uppercase">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl font-black font-display tracking-tight text-[#0F172A] uppercase mt-1">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Bottom subtle indicator */}
                <div className="mt-8 pt-6 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500 group-hover:text-slate-900 transition-colors">
                  <span className="font-medium">Phase {item.step} of 03</span>
                  <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#C6FF3D] text-[#0F172A] border border-[#aae81a] hover:bg-[#b5f524] shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>START YOUR BOOKING TODAY</span>
          </button>
        </div>

      </div>
    </section>
  );
};
