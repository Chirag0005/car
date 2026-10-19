import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../data/content';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    serviceInterest: 'Premium Detail',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = 'Please provide your name.';
    if (!formState.email.trim() || !formState.email.includes('@')) {
      errs.email = 'Please provide a valid email.';
    }
    if (!formState.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formState.message.trim()) errs.message = 'Please provide a brief message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#F8FAFC] border-t border-slate-200/60">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white border border-slate-200 text-slate-800 mb-4 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-lime-600" />
            <span>DIRECT INQUIRIES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#0F172A] uppercase leading-tight">
            READY FOR A BETTER FINISH?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Tell us about your vehicle and let us help you find the right detailing service or custom ceramic package.
          </p>
        </div>

        {/* Content Grid: Form + Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#0F172A] uppercase">
                  MESSAGE RECEIVED
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#0F172A] font-bold">{formState.name}</span>. Our detailing specialist will review your vehicle request and respond within 2 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        vehicle: '',
                        serviceInterest: 'Premium Detail',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Marcus Vance"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                        errors.name ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <span className="text-[11px] text-red-500">{errors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="marcus@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                        errors.email ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <span className="text-[11px] text-red-500">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="(555) 234-5678"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                        errors.phone ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && <span className="text-[11px] text-red-500">{errors.phone}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Vehicle Year, Make & Model
                    </label>
                    <input
                      type="text"
                      value={formState.vehicle}
                      onChange={(e) => setFormState({ ...formState, vehicle: e.target.value })}
                      placeholder="e.g. 2024 Porsche 911 GT3"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Package or Service of Interest
                  </label>
                  <select
                    value={formState.serviceInterest}
                    onChange={(e) => setFormState({ ...formState, serviceInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="Express Wash">Express Wash (From $39)</option>
                    <option value="Premium Detail">Premium Detail (From $129)</option>
                    <option value="Ultimate Detail">Ultimate Detail (From $249)</option>
                    <option value="Bespoke Ceramic Coating">Bespoke Ceramic Coating & Correction</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    How Can We Assist? *
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your vehicle's condition, particular concerns, or questions..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.message ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && <span className="text-[11px] text-red-500">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#0F172A] text-white hover:bg-black shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-[#C6FF3D]" />
                  <span>TRANSMIT INQUIRY</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-slate-700" />
                  <span>Demonstration contact form. Connect your SMTP or CRM webhook for live transmission.</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Studio Information & Light Automotive Map Visualization */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Studio Details Card */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-black font-display text-[#0F172A] uppercase tracking-tight">
                STUDIO & CONTACT INFO
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Studio Location</span>
                    <span className="text-[#0F172A] font-medium">{BUSINESS_CONFIG.address}</span>
                    <span className="text-xs text-slate-500 block mt-0.5">Secure, climate-controlled inspection bay</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Phone Inquiries</span>
                    <a href={`tel:${BUSINESS_CONFIG.phone}`} className="text-[#0F172A] font-semibold hover:text-lime-600 transition-colors">
                      {BUSINESS_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Email Bookings</span>
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-[#0F172A] font-semibold hover:text-lime-600 transition-colors">
                      {BUSINESS_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-slate-900" />
                  </div>
                  <div>
                    <span className="text-xs uppercase text-slate-400 font-bold block">Operating Hours</span>
                    <span className="text-[#0F172A] font-medium text-xs sm:text-sm block">
                      Monday – Friday: 7:30 AM – 6:00 PM
                    </span>
                    <span className="text-[#0F172A] font-medium text-xs sm:text-sm block">
                      Saturday: 8:00 AM – 4:00 PM
                    </span>
                    <span className="text-slate-500 text-xs block">
                      Sunday: Reserved for bespoke ceramic bookings
                    </span>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">Follow our daily builds:</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-black hover:underline"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>{BUSINESS_CONFIG.instagram}</span>
                </a>
              </div>
            </div>

            {/* Stylized Architectural Map Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white aspect-[16/9] shadow-lg flex flex-col items-center justify-center p-6 text-center group">
              <div className="absolute inset-0 bg-slate-50/50" />
              
              {/* Studio Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900/10 animate-ping absolute inset-0" />
                  <div className="relative w-9 h-9 rounded-full bg-[#0F172A] border-2 border-white flex items-center justify-center text-[#C6FF3D] shadow-md">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>

                <span className="font-display font-black text-sm uppercase text-[#0F172A] tracking-wider">
                  VELOCITY FLAGSHIP STUDIO
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  Full Metro Coverage & Mobile Detailing Available
                </span>
                <span className="text-[10px] font-mono text-slate-700 mt-2 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  METRO AREA • CLIMATE-CONTROLLED STUDIO BAY
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
