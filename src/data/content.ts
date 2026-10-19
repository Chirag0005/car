import type { ServicePackage, ReviewItem } from '../types';

export const BUSINESS_CONFIG = {
  brandName: "VELOCITY",
  brandSubtitle: "AUTO DETAILING",
  country: "United States",
  city: "Los Angeles",
  address: "18 Automotive Way, Precision Studio Suite 100",
  phone: "+1 (800) 555-0199",
  phoneDisplay: "(800) 555-0199",
  email: "bookings@velocityautodetailing.com",
  hours: "Monday – Friday: 7:30 AM – 6:00 PM | Saturday: 8:00 AM – 4:00 PM | Sunday: By Appointment",
  instagram: "@velocity_detailing",
  disclaimer: "Demonstration business showcase. All package pricing and service descriptions can be tailored to your operations."
};

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: "express",
    number: "01",
    name: "EXPRESS WASH",
    tagline: "Essential Exterior Maintenance",
    description: "A thorough exterior clean that removes everyday dirt and leaves your vehicle looking fresh.",
    priceAud: 39,
    duration: "45 - 60 Mins",
    image: "/images/service-express.jpg",
    features: [
      "Exterior pH-neutral hand wash & pre-foam",
      "Wheel faces and tyre barrel cleaning",
      "Microfibre touchless air dry & plush towel finish",
      "Exterior crystal glass cleaning",
      "High-gloss tyre dressing applied"
    ],
    popular: false
  },
  {
    id: "premium",
    number: "02",
    name: "PREMIUM DETAIL",
    badge: "MOST POPULAR",
    tagline: "Total Interior & Exterior Rejuvenation",
    description: "A deeper clean for drivers who want their vehicle looking its absolute best, inside and out.",
    priceAud: 129,
    duration: "2.5 - 3.5 Hours",
    image: "/images/service-interior.jpg",
    features: [
      "Everything in Express Wash included",
      "Complete deep interior vacuum (carpets, seats, boot)",
      "Interior surface wipe-down & dust extraction",
      "Dashboard, vents & trim detailing with UV matte feed",
      "Door jambs, boot shuts & crevices steam sanitized",
      "Hydrophobic spray sealant applied to paintwork (up to 3 months)"
    ],
    popular: true
  },
  {
    id: "ultimate",
    number: "03",
    name: "ULTIMATE DETAIL",
    badge: "CONNOISSEUR FINISH",
    tagline: "Paint Correction & Ceramic Shield",
    description: "A comprehensive detailing experience focused on restoring gloss, refining the finish, and elevating your vehicle's appearance.",
    priceAud: 249,
    duration: "5 - 7 Hours",
    image: "/images/service-paint.jpg",
    features: [
      "Deep interior detailing & leather steam treatment",
      "Full exterior chemical decontamination (iron & tar removal)",
      "Clay bar surface treatment for glass-smooth paint",
      "Single-stage machine paint enhancement & gloss refinement",
      "High-grade ceramic coating topper applied",
      "Hydrophobic glass sealant on all exterior windows"
    ],
    popular: false
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "CHOOSE YOUR SERVICE",
    subtitle: "Tailored to Your Vehicle",
    description: "Select the detailing package that suits your vehicle and needs, whether an express refresh or complete ceramic enhancement."
  },
  {
    step: "02",
    title: "BOOK YOUR VISIT",
    subtitle: "Seamless Scheduling",
    description: "Choose an available appointment date and provide your vehicle details. Select our flagship studio or mobile detailing unit."
  },
  {
    step: "03",
    title: "ENJOY THE FINISH",
    subtitle: "Showroom Transformation",
    description: "Arrive for your appointment and enjoy a vehicle that looks its best. Experience unrivaled gloss, slick paint, and spotless comfort."
  }
];

export const BENEFITS_DATA = [
  {
    id: "01",
    title: "ATTENTION TO DETAIL",
    description: "Every vehicle receives careful attention, from the exterior finish to the intricate interior stitching and vents.",
    icon: "Sparkles"
  },
  {
    id: "02",
    title: "PREMIUM PRODUCTS",
    description: "Quality detailing products and German/Japanese formulas selected specifically to deliver an exceptional, enduring finish.",
    icon: "ShieldCheck"
  },
  {
    id: "03",
    title: "SERVICE THAT FITS YOUR DAY",
    description: "Convenient booking designed around your schedule, offering dedicated studio bays and self-contained mobile units.",
    icon: "Clock"
  },
  {
    id: "04",
    title: "A FINISH WORTH COMING BACK FOR",
    description: "Consistent care focused on helping your vehicle look its best every day, preserving resale value and paint integrity.",
    icon: "Award"
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "1",
    author: "Marcus Vance",
    location: "Beverly Hills, CA",
    vehicle: "Porsche 911 GT3 (992)",
    service: "Ultimate Detail & Ceramic Sealant",
    rating: 5,
    comment: "The gloss on my GT3 is unbelievable. Swirl marks from the dealership were completely eliminated. The team's passion for automotive care is unmatched.",
    date: "14/03/2026",
    tag: "Verified Client"
  },
  {
    id: "2",
    author: "Sophie Henderson",
    location: "Tribeca, NY",
    vehicle: "Audi RS6 Avant",
    service: "Premium Detail",
    rating: 5,
    comment: "With two kids and a dog, my RS6 interior was in desperate need of revival. Velocity made the cabin feel factory-fresh again. The matte leather finish is perfect.",
    date: "02/03/2026",
    tag: "Verified Client"
  },
  {
    id: "3",
    author: "Damian Thorne",
    location: "Scottsdale, AZ",
    vehicle: "BMW M4 Competition",
    service: "Ultimate Detail",
    rating: 5,
    comment: "Flawless communication, pristine workshop, and extreme attention to detail. Even the wheel barrels and exhaust tips look brand new. 10/10 service.",
    date: "21/02/2026",
    tag: "Verified Client"
  },
  {
    id: "4",
    author: "Elena Rostova",
    location: "Miami Beach, FL",
    vehicle: "Range Rover Sport SV",
    service: "Premium Detail",
    rating: 5,
    comment: "Super convenient booking system. The car was ready right on time and looks incredible under the sun. Will be booking their monthly maintenance program.",
    date: "10/02/2026",
    tag: "Verified Client"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Paint Correction & Ceramic Mirror",
    category: "Paintwork",
    image: "/images/hero-car.jpg",
    tag: "Ceramic Finish"
  },
  {
    id: "g2",
    title: "BBS Forged Alloy & Electric Lime Caliper",
    category: "Wheels",
    image: "/images/gallery-wheel.jpg",
    tag: "Wheel Detailing"
  },
  {
    id: "g3",
    title: "Hydrophobic 9H Ceramic Water Beading",
    category: "Protection",
    image: "/images/gallery-beading.jpg",
    tag: "Ceramic Shield"
  },
  {
    id: "g4",
    title: "Carbon Fiber & Hand-Crafted Cockpit",
    category: "Interior",
    image: "/images/service-interior.jpg",
    tag: "Interior Detail"
  },
  {
    id: "g5",
    title: "Precision Dual-Action Machine Polishing",
    category: "Paintwork",
    image: "/images/service-paint.jpg",
    tag: "Paint Enhancement"
  },
  {
    id: "g6",
    title: "Touchless pH-Neutral Snow Foam Cleansing",
    category: "Wash",
    image: "/images/service-express.jpg",
    tag: "Exterior Wash"
  }
];
