import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import type { ServiceTier, ServicePackage } from '../types';
import { Check, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: ServiceTier) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-white border-t border-slate-200/60">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-slate-100 border border-slate-200 text-slate-800 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-lime-600" />
              <span>CRAFTED CARE PACKAGES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
              MORE THAN A WASH.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-xl">
              Expert care. Premium products. A finish you can see. Every package is engineered for precision, paint preservation, and showroom elegance.
            </p>
          </div>

          <div className="mt-6 md:mt-0 text-left md:text-right">
            <span className="text-xs text-slate-500 font-mono tracking-wider block">
              STANDARD INDICATIVE RATES
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              * Tailored for all passenger cars, coupes, and SUVs
            </span>
          </div>
        </div>

        {/* 3 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServicePackage) => {
            const isHovered = hoveredCard === service.id;
            const isPopular = service.popular;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-[#0F172A] shadow-xl shadow-slate-300/60 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-md hover:shadow-xl hover:shadow-slate-200/60'
                }`}
              >
                {/* Popular Badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase bg-[#C6FF3D] text-[#0F172A] border border-[#aae81a] shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      {service.badge}
                    </span>
                  </div>
                )}

                {/* Card Imagery Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={`${service.name} Detailing at Velocity Auto Detailing`}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Service Number Watermark */}
                  <div className="absolute bottom-3 left-6 font-display font-black text-3xl sm:text-4xl text-white">
                    SERVICE {service.number}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Header & Tagline */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black font-display tracking-tight text-[#0F172A] uppercase">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-slate-900" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                      {service.tagline}
                    </p>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        INCLUDED IN THIS DETAIL:
                      </div>
                      <ul className="space-y-2.5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Booking Button */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Starting From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-slate-500">$</span>
                        <span className="text-3xl sm:text-4xl font-black font-display text-[#0F172A]">
                          {service.priceAud}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectService(service.id)}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
                        isPopular
                          ? 'bg-[#C6FF3D] text-[#0F172A] border border-[#aae81a] hover:bg-[#b5f524] shadow-md'
                          : 'bg-[#0F172A] text-white hover:bg-slate-800 shadow-sm'
                      }`}
                    >
                      <span>BOOK THIS SERVICE</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote on pricing */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Note: All prices are standard estimates and may vary slightly based on vehicle size and paint condition. Final quotes confirmed before work begins.
          </p>
        </div>
      </div>
    </section>
  );
};
