import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { Process } from './components/Process';
import { Benefits } from './components/Benefits';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import type { ServiceTier } from './types';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceTier>('premium');

  const handleOpenBooking = (serviceId?: ServiceTier) => {
    if (serviceId) {
      setPreselectedService(serviceId);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#C6FF3D] selection:text-[#0F172A]">
      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Sticky Light Glass Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Flow */}
      <main>
        {/* 1. Cinematic Hero in Light Presentation */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Interactive Services Section */}
        <Services onSelectService={(id) => handleOpenBooking(id)} />

        {/* 3. Interactive Before & After Slider & Showcase Gallery (Same Car Before/After) */}
        <BeforeAfterGallery />

        {/* 4. How It Works - 3 Step Process */}
        <Process onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Why Choose Us - Benefit Cards */}
        <Benefits />

        {/* 6. Side-by-Side Pricing Comparison */}
        <Pricing onSelectService={(id) => handleOpenBooking(id)} />

        {/* 7. Testimonials & Social Proof */}
        <Testimonials />

        {/* 8. Contact & Flagship Studio Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Multi-step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={preselectedService}
      />
    </div>
  );
};

export default App;
