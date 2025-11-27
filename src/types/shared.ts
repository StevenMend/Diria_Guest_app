// src/types/shared.ts - Core shared contracts
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type UserRole = 'guest' | 'staff' | 'admin';
