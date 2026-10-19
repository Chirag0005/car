export type ServiceTier = 'express' | 'premium' | 'ultimate';

export interface ServicePackage {
  id: ServiceTier;
  number: string;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  priceAud: number;
  duration: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export type VehicleCategory = 'Sedan / Hatch' | 'Coupe / Sports' | 'SUV / 4WD' | 'Supercar / Exotic' | 'Truck / Commercial' | 'Ute / Commercial';

export type ServiceLocationType = 'studio' | 'mobile';

export interface BookingFormData {
  serviceId: ServiceTier;
  vehicleCategory: VehicleCategory;
  vehicleMakeModel: string;
  vehicleYear: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string; // DD/MM/YYYY
  preferredTime: string;
  locationType: ServiceLocationType;
  suburb: string;
  specialNotes: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  service: string;
  rating: number;
  comment: string;
  date: string;
  tag: string;
}
