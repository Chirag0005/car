import React from 'react';
import { SERVICES_DATA } from '../data/content';
import type { ServiceTier } from '../types';
import { Check, Sparkles, Clock, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectService: (serviceId: ServiceTier) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectService }) => {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white border border-slate-200 text-slate-800 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-lime-600" />
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
            PRICING PACKAGES
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Straightforward transparent pricing with zero hidden surcharges. Choose the care level your car deserves.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICES_DATA.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-slate-900 shadow-2xl lg:-translate-y-4 ring-4 ring-slate-900/5'
                    : 'bg-white border border-slate-200/90 hover:border-slate-400 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular Pill */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase bg-[#C6FF3D] text-[#0F172A] border border-[#aae81a] shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#0F172A]" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black font-display text-[#0F172A] uppercase">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-slate-900" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-lime-700">
                    {pkg.tagline}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    {pkg.description}
                  </p>

                  {/* Price Block */}
                  <div className="mt-8 pb-8 border-b border-slate-100 flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-400 uppercase">Starting at</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-slate-900 mr-0.5">$</span>
                      <span className="text-5xl font-black font-display text-[#0F172A]">
                        {pkg.priceAud}
                      </span>
                    </div>
                  </div>

                  {/* Included features list */}
                  <div className="mt-8 space-y-3.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      WHAT'S INCLUDED:
                    </div>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-lime-100 border border-lime-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-lime-800" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(pkg.id)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
                      isPopular
                        ? 'bg-[#0F172A] text-white hover:bg-black shadow-md hover:shadow-lg'
                        : 'bg-slate-100 text-[#0F172A] hover:bg-slate-200 border border-slate-300/80'
                    }`}
                  >
                    <span>SELECT {pkg.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto italic">
            "Prices are indicative and may vary depending on vehicle size and condition. Final pricing should be confirmed with our detailing specialist."
          </p>
        </div>

      </div>
    </section>
  );
};
