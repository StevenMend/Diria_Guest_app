// src/types/guest.ts
import { BaseEntity, Priority } from './index';

export interface GuestInfo extends BaseEntity {
  name: string;
  room: string;
  tier: 'Standard' | 'Gold' | 'Platinum';
  checkIn: string;
  checkOut: string;
  preferences: GuestPreferences;
  avatar?: string;
}

export interface GuestPreferences {
  dietaryRestrictions: string[];
  interests: string[];
  language: string;
  notifications: boolean;
  privacy: 'public' | 'private';
}

export interface GuestNotification extends BaseEntity {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
  priority: Priority;
}

export interface LoyaltyInfo {
  points: number;
  tier: string;
  nextTier: string;
  pointsToNext: number;
}

export interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  forecast: string;
  icon: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  available: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  available: boolean;
  rating: number;
  price?: string;
}
