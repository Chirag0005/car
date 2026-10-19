import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = ['home', 'services', 'gallery', 'process', 'pricing', 'reviews', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Before & After', href: '#gallery', id: 'gallery' },
    { label: 'Our Process', href: '#process', id: 'process' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-sm shadow-slate-200/50'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-[#C6FF3D] transition-transform group-hover:scale-105 shadow-sm">
                <span className="font-display font-black text-xl tracking-tighter">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black tracking-wider text-lg sm:text-xl text-[#0F172A] transition-colors">
                  VELOCITY
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-500 -mt-1 font-semibold">
                  AUTO DETAILING
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-slate-100/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-inner">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-all rounded-full ${
                      isActive
                        ? 'text-[#0F172A] bg-white shadow-sm font-bold'
                        : 'text-slate-600 hover:text-[#0F172A] hover:bg-white/60'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F172A]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Phone & Book Now */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                className="hidden lg:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
                title="Call Velocity Auto Detailing"
              >
                <Phone className="w-3.5 h-3.5 text-slate-900" />
                <span>{BUSINESS_CONFIG.phoneDisplay}</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#0F172A] bg-[#C6FF3D] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#b5f524] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-[#aae81a] focus:outline-none"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                  <span>BOOK NOW</span>
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-[#0F172A] bg-[#C6FF3D] rounded-full border border-[#aae81a]"
              >
                BOOK
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-black focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 mt-3 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between py-2 text-base font-medium tracking-wide transition-colors ${
                    activeSection === link.id
                      ? 'text-[#0F172A] font-bold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
              
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="flex items-center gap-3 py-2 text-sm text-slate-700 font-medium"
                >
                  <Phone className="w-4 h-4 text-slate-900" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-[#0F172A] bg-[#C6FF3D] border border-[#aae81a] rounded-xl shadow-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>BOOK YOUR DETAILING</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
