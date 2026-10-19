import React from 'react';
import { Sparkles, ShieldCheck, Clock, Award, CheckCircle } from 'lucide-react';
import { BENEFITS_DATA } from '../data/content';

export const Benefits: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-slate-900" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-slate-900" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-slate-900" />;
      case 'Award':
        return <Award className="w-6 h-6 text-slate-900" />;
      default:
        return <CheckCircle className="w-6 h-6 text-slate-900" />;
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F1F5F9] border border-slate-200 text-slate-800 mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-600" />
            <span>OUR STANDARDS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
            CARE YOU CAN SEE.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-lime-600">
              QUALITY YOU CAN TRUST.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            We treat every customer's vehicle as if it were our own, adhering to uncompromising standards of precision and paint preservation.
          </p>
        </div>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS_DATA.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-slate-400 hover:bg-white transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Icon & ID */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm group-hover:border-slate-900 group-hover:bg-[#C6FF3D] flex items-center justify-center transition-colors">
                    {getIcon(benefit.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                    {benefit.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-display text-[#0F172A] uppercase tracking-tight">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Accent Line */}
              <div className="mt-8 pt-4 border-t border-slate-200/60">
                <div className="w-8 h-0.5 bg-slate-300 group-hover:w-full group-hover:bg-[#C6FF3D] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
