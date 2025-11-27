// src/types/restaurants.ts
import { BaseEntity, Status } from './index';

export interface RestaurantData extends BaseEntity {
  name: string;
  cuisine: string;
  image: string;
  hours: string;
  location: string;
  dressCode: string;
  specialty: string;
  rating: number;
  status: string;
  statusColor: string;
  kitchenLoad: number;
  serverAvailability: number;
  tableRotation: number;
  avgServiceTime: string;
  waitTime: string;
  specialties: string[];
  dietarySupport: string[];
  packages: string[];
}

export interface ReservationData extends BaseEntity {
  guests: number;
  date: string;
  time: string;
  occasion: string;
  dietaryRestrictions: string[];
  seatingPreference: string;
  specialRequests: string;
  restaurant: string;
  guestId: string;
  status: Status;
}

export interface RestaurantOperationalData {
  availableNow: string;
  avgWaitTime: string;
  kitchenCapacity: string;
  specialRequests: number;
}
