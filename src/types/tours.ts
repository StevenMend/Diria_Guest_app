// src/types/tours.ts
import { BaseEntity, Status } from './index';

export interface PartnerInfo {
  name: string;
  responseTime: string;
  cancellationRate: string;
  guestRating: number;
  reliability: number;
  lastContact: string;
  status: 'online' | 'busy' | 'offline';
  phone: string;
  emergencyProtocol: string;
}

export interface Equipment {
  available: number;
  total: number;
  status: 'optimal' | 'maintenance' | 'limited';
  lastMaintenance: string;
}

export interface GroupOptimization {
  minGroup: number;
  maxGroup: number;
  currentBookings: number;
  efficiency: number;
}

export interface TourPackage {
  name: string;
  price: number;
  savings: number;
}

export interface TourData extends BaseEntity {
  name: string;
  category: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  price: string;
  rating: number;
  description: string;
  includes: string;
  groupSize: string;
  partnerInfo: PartnerInfo;
  equipment: Equipment;
  weatherSensitivity: 'low' | 'medium' | 'high';
  skillRequired: string;
  safetyRating: string;
  insurance: string;
  groupOptimization: GroupOptimization;
  packages: TourPackage[];
}

export interface BookingData extends BaseEntity {
  guests: number;
  date: string;
  time: string;
  skillLevel: string;
  medicalConditions: string[];
  emergencyContact: { name: string; phone: string };
  insurance: boolean;
  waiverSigned: boolean;
  specialRequests: string;
  tour: string;
  guestId: string;
  status: Status;
}

export interface WeatherImpact {
  condition: string;
  severity: 'low' | 'medium' | 'high';
  timeline: string;
  affectedTours: string[];
  alternatives: string[];
}
