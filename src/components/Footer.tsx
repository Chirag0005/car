import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../data/content';
import { ArrowUp, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F8FAFC] border-t border-slate-200 text-slate-600 overflow-hidden">
      
      {/* Top CTA Banner */}
      <div className="border-b border-slate-200 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-lime-700">
              ELEVATE YOUR AUTOMOTIVE EXPERIENCE
            </span>
            <h3 className="text-3xl sm:text-4xl font-black font-display text-[#0F172A] uppercase mt-1 tracking-tight">
              GIVE YOUR CAR THE FINISH IT DESERVES.
            </h3>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#0F172A] text-white hover:bg-black shadow-lg transition-all shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C6FF3D]" />
            <span>BOOK AN APPOINTMENT</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#0F172A] flex items-center justify-center text-[#C6FF3D] font-black font-display">
                V
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black tracking-wider text-xl text-[#0F172A]">
                  VELOCITY
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-400 -mt-1 font-semibold">
                  AUTO DETAILING
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Premier automotive detailing studio. Dedicated to preserving the aesthetic integrity and paint depth of everyday, sports, and collector vehicles.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-400 transition-colors"
                aria-label="Instagram Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-400 transition-colors"
                aria-label="YouTube Channel"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-black transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">Services & Packages</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-black transition-colors">Before & After Gallery</a>
              </li>
              <li>
                <a href="#process" className="hover:text-black transition-colors">Our Detailing Process</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-black transition-colors">Pricing Packages</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-black transition-colors">Client Reviews</a>
              </li>
            </ul>
          </div>

          {/* Services Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
              Detailing Packages
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-black transition-colors">Express Hand Wash</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">Premium Interior & Exterior</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">Ultimate Ceramic Detail</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">Paint Correction & Enhancement</a>
              </li>
              <li>
                <a href="#services" className="hover:text-black transition-colors">9H Ceramic Shield Protection</a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
              Flagship Studio
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phone}`} className="hover:text-black font-semibold">
                  {BUSINESS_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-black font-semibold">
                  {BUSINESS_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Disclaimer & Back to Top */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span>© {currentYear} Velocity Auto Detailing. All rights reserved.</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-black underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-black underline underline-offset-4"
            >
              Terms of Service
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-400 text-slate-700 hover:text-black shadow-sm transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-slate-900" />
          </button>
        </div>
      </div>

      {/* Legal Dialog */}
      {legalModal && (
        <div
          onClick={() => setLegalModal(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full p-6 text-left space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold font-display uppercase text-[#0F172A] text-lg">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h4>
              <button
                onClick={() => setLegalModal(null)}
                className="text-slate-400 hover:text-black text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {legalModal === 'privacy'
                ? 'Velocity Auto Detailing is committed to protecting your privacy. Customer details collected via our booking and inquiry forms are strictly used for scheduling and customer support.'
                : 'All services are subject to on-site vehicle inspection. Indicative quotes may be adjusted if the vehicle requires extreme pet hair extraction, heavy bio-hazard cleaning, or severe road contamination. Full terms provided upon booking confirmation.'}
            </p>
            <button
              onClick={() => setLegalModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#0F172A] text-white font-bold text-xs uppercase hover:bg-black transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
