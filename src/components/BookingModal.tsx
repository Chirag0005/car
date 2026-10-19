import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SERVICES_DATA } from '../data/content';
import type { ServiceTier, VehicleCategory, BookingFormData } from '../types';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Car,
  MapPin,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: ServiceTier;
}

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  'Coupe / Sports',
  'Sedan / Hatch',
  'SUV / 4WD',
  'Supercar / Exotic',
  'Truck / Commercial',
];

const TIME_SLOTS = [
  '08:00 AM',
  '09:30 AM',
  '11:00 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'premium',
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialServiceId,
    vehicleCategory: 'Coupe / Sports',
    vehicleMakeModel: '',
    vehicleYear: '2024',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    preferredDate: '',
    preferredTime: '09:30 AM',
    locationType: 'studio',
    suburb: 'Alexandria',
    specialNotes: '',
  });

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initial service when opened with a specific card
  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
  }, [initialServiceId]);

  // Set default appointment date to tomorrow in DD/MM/YYYY
  useEffect(() => {
    if (!formData.preferredDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const yyyy = tomorrow.getFullYear();
      setFormData((prev) => ({ ...prev, preferredDate: `${dd}/${mm}/${yyyy}` }));
    }
  }, [formData.preferredDate]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedPackage = SERVICES_DATA.find((s) => s.id === formData.serviceId) || SERVICES_DATA[1];

  // Price estimate calculation with vehicle category modifier
  const getEstimatedPrice = () => {
    let base = selectedPackage.priceAud;
    if (formData.vehicleCategory === 'SUV / 4WD' || formData.vehicleCategory === 'Truck / Commercial' || (formData.vehicleCategory as string) === 'Ute / Commercial') {
      base += 30;
    } else if (formData.vehicleCategory === 'Supercar / Exotic') {
      base += 50;
    }
    return base;
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.serviceId) newErrors.serviceId = 'Please select a service package.';
    }

    if (step === 2) {
      if (!formData.clientName.trim()) newErrors.clientName = 'Full name is required.';
      if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
        newErrors.clientEmail = 'Please provide a valid email address.';
      }
      if (!formData.clientPhone.trim() || formData.clientPhone.replace(/\D/g, '').length < 7) {
        newErrors.clientPhone = 'Valid phone number is required (e.g. (555) 234-5678).';
      }
      if (!formData.vehicleMakeModel.trim()) {
        newErrors.vehicleMakeModel = 'Vehicle Make and Model is required (e.g. Porsche 911 GT3).';
      }
    }

    if (step === 3) {
      if (!formData.preferredDate.trim()) newErrors.preferredDate = 'Please specify a preferred date.';
      if (!formData.preferredTime) newErrors.preferredTime = 'Please select an appointment time slot.';
      if (formData.locationType === 'mobile' && !formData.suburb.trim()) {
        newErrors.suburb = 'Please enter your address for mobile concierge service.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    // Simulate booking API dispatch
    setTimeout(() => {
      const randomCode = 'VEL-' + Math.floor(10000 + Math.random() * 90000);
      setBookingReference(randomCode);
      setIsSubmitting(false);
      setCurrentStep(5);

      // Trigger Confetti Burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0F172A', '#C6FF3D', '#3B82F6', '#10B981'],
        });
      } catch (err) {
        console.log('Confetti effect triggered', err);
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F172A] flex items-center justify-center text-[#C6FF3D] font-black font-display">
              V
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display text-[#0F172A] tracking-wide uppercase">
                VELOCITY BOOKING SYSTEM
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                STUDIO BAY & MOBILE CONCIERGE
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-black border border-slate-200 transition-colors focus:outline-none"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Indicator (Steps 1 to 4) */}
        {currentStep < 5 && (
          <div className="px-6 py-3.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Vehicle & Contact' },
              { num: 3, label: 'Appointment' },
              { num: 4, label: 'Review' },
            ].map((s) => {
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isPassed
                        ? 'bg-[#0F172A] text-[#C6FF3D]'
                        : isCurrent
                        ? 'border-2 border-[#0F172A] text-[#0F172A] bg-lime-50'
                        : 'border border-slate-200 text-slate-400'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`hidden sm:inline font-medium uppercase tracking-wider text-[11px] ${
                      isCurrent ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {s.num < 4 && <div className="hidden sm:block w-8 h-[1px] bg-slate-200 mx-1" />}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* STEP 1: CHOOSE SERVICE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold font-display text-[#0F172A] uppercase">
                  STEP 1: SELECT YOUR DETAILING PACKAGE
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Click on the package you would like to book for your vehicle.
                </p>
              </div>

              {errors.serviceId && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errors.serviceId}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SERVICES_DATA.map((service) => {
                  const isSelected = formData.serviceId === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setFormData({ ...formData, serviceId: service.id })}
                      className={`relative p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                        isSelected
                          ? 'border-2 border-slate-900 bg-slate-50 shadow-md ring-2 ring-slate-900/5'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0F172A] flex items-center justify-center text-[#C6FF3D]">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          PACKAGE {service.number}
                        </span>
                        <h5 className="text-lg font-black font-display text-[#0F172A] uppercase mt-0.5">
                          {service.name}
                        </h5>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                          <Clock className="w-3 h-3 text-slate-700" />
                          <span>{service.duration}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Starting</span>
                        <div className="text-lg font-black font-display text-[#0F172A]">
                          <span className="text-xs text-slate-500">$</span>{service.priceAud}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Service Inclusions Preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Package Inclusions for {selectedPackage.name}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPackage.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-lime-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: VEHICLE & CONTACT DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold font-display text-[#0F172A] uppercase">
                  STEP 2: VEHICLE & CONTACT INFORMATION
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us about your vehicle and how to reach you regarding the booking.
                </p>
              </div>

              {/* Vehicle Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Vehicle Category / Size:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VEHICLE_CATEGORIES.map((cat) => {
                    const isSelected = formData.vehicleCategory === cat;
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setFormData({ ...formData, vehicleCategory: cat })}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                          isSelected
                            ? 'bg-[#0F172A] text-white border-slate-900 font-bold shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Vehicle Make, Model & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Vehicle Make & Model *
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleMakeModel}
                    onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                    placeholder="e.g. Porsche 911 GT3 or BMW M3"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.vehicleMakeModel ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.vehicleMakeModel && (
                    <span className="text-[11px] text-red-500">{errors.vehicleMakeModel}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleYear}
                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                    placeholder="2024"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Marcus Vance"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.clientName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.clientName && (
                    <span className="text-[11px] text-red-500">{errors.clientName}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="marcus@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.clientEmail ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.clientEmail && (
                    <span className="text-[11px] text-red-500">{errors.clientEmail}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="(555) 234-5678"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.clientPhone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.clientPhone && (
                    <span className="text-[11px] text-red-500">{errors.clientPhone}</span>
                  )}
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Specific Requests or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Please focus on minor scratches on hood, or leather conditioning..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>
          )}

          {/* STEP 3: APPOINTMENT & LOCATION */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold font-display text-[#0F172A] uppercase">
                  STEP 3: APPOINTMENT DATE & LOCATION
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Choose your preferred date, time slot, and studio or mobile concierge service.
                </p>
              </div>

              {/* Location Preference Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Service Delivery Location:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setFormData({ ...formData, locationType: 'studio' })}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      formData.locationType === 'studio'
                        ? 'bg-slate-50 border-2 border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                      <MapPin className="w-4 h-4 text-slate-900" />
                      <span>FLAGSHIP STUDIO DETAILING BAY</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Dedicated inspection studio with calibrated lighting and clean climate control.
                    </p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, locationType: 'mobile' })}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      formData.locationType === 'mobile'
                        ? 'bg-slate-50 border-2 border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#0F172A]">
                      <Car className="w-4 h-4 text-slate-900" />
                      <span>MOBILE DETAILING CONCIERGE (WE COME TO YOU)</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Fully self-contained mobile unit with purified water and power on board.
                    </p>
                  </div>
                </div>
              </div>

              {/* Suburb if mobile */}
              {formData.locationType === 'mobile' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Service Address / Location *
                  </label>
                  <input
                    type="text"
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    placeholder="e.g. 450 Grand Avenue, Suite 100"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.suburb ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.suburb && <span className="text-[11px] text-red-500">{errors.suburb}</span>}
                </div>
              )}

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-700" />
                    <span>Preferred Date (DD/MM/YYYY) *</span>
                  </label>
                  <input
                    type="text"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    placeholder="e.g. 24/10/2026"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${
                      errors.preferredDate ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.preferredDate && (
                    <span className="text-[11px] text-red-500">{errors.preferredDate}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-700" />
                    <span>Time Slot *</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-[#0F172A] focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-white text-slate-900">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PRICE ESTIMATE */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold font-display text-[#0F172A] uppercase">
                  STEP 4: REVIEW BOOKING DETAILS
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Please verify all details before submitting your appointment request.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                      SELECTED SERVICE
                    </span>
                    <h5 className="text-2xl font-black font-display text-[#0F172A] uppercase mt-0.5">
                      {selectedPackage.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-900" />
                      <span>Estimated Duration: {selectedPackage.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-900 hover:underline font-bold"
                  >
                    Change
                  </button>
                </div>

                {/* Vehicle & Customer Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs py-2">
                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-semibold">Vehicle:</span>
                    <div className="text-[#0F172A] font-bold text-sm">
                      {formData.vehicleYear} {formData.vehicleMakeModel || 'Not Specified'}
                    </div>
                    <div className="text-slate-600">{formData.vehicleCategory}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-semibold">Client:</span>
                    <div className="text-[#0F172A] font-bold text-sm">{formData.clientName}</div>
                    <div className="text-slate-600">{formData.clientEmail} • {formData.clientPhone}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-semibold">Appointment Date & Time:</span>
                    <div className="text-[#0F172A] font-bold text-sm">
                      {formData.preferredDate} at {formData.preferredTime}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 uppercase font-semibold">Location:</span>
                    <div className="text-[#0F172A] font-bold text-sm">
                      {formData.locationType === 'studio'
                        ? 'Flagship Studio Detailing Bay'
                        : `Mobile Service: ${formData.suburb}`}
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate-500 font-bold block">Estimated Total</span>
                    <span className="text-[11px] text-slate-400">Includes All Premium Consumables</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-500">$</span>
                    <span className="text-3xl font-black font-display text-[#0F172A] ml-1">
                      {getEstimatedPrice()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Demonstration Disclaimer Callout */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider block">
                    Interactive Demonstration Flow
                  </span>
                  <p className="text-amber-700 leading-relaxed">
                    This booking system is fully interactive for client presentation. Submitting will generate a simulated booking code and summary.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION SCREEN */}
          {currentStep === 5 && (
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in duration-300">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-slate-100 text-slate-900 border border-slate-300 mb-2">
                  BOOKING CODE: {bookingReference}
                </span>
                <h4 className="text-3xl sm:text-4xl font-black font-display text-[#0F172A] uppercase">
                  BOOKING REQUEST RECEIVED!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <span className="text-[#0F172A] font-bold">{formData.clientName}</span>. Your appointment for the <span className="text-[#0F172A] font-bold">{selectedPackage.name}</span> has been logged.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Vehicle:</span>
                  <span className="text-[#0F172A] font-semibold">{formData.vehicleYear} {formData.vehicleMakeModel}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-[#0F172A] font-semibold">{formData.preferredDate} ({formData.preferredTime})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service Location:</span>
                  <span className="text-[#0F172A] font-semibold">
                    {formData.locationType === 'studio' ? 'Flagship Studio' : `Mobile (${formData.suburb})`}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-bold">Estimated Quote:</span>
                  <span className="text-slate-900 font-black text-sm">${getEstimatedPrice()}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#0F172A] text-white hover:bg-black shadow-md transition-all"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer (Navigation Between Steps) */}
        {currentStep < 5 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-black hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider hover:bg-black shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>CONTINUE</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-[#0F172A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-black shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#C6FF3D]" />
                <span>{isSubmitting ? 'PROCESSING...' : 'CONFIRM DEMO BOOKING'}</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
