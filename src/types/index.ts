// src/types/index.ts - Central type exports

// ============================================
// COMMON BASE TYPES (defined here, not imported)
// ============================================

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type UserRole = 'guest' | 'staff' | 'admin';

// ============================================
// RE-EXPORT FROM OTHER TYPE FILES
// ============================================

export * from './admin';
export * from './auth';
export * from './coordination';
export * from './guest';
export * from './partners';
export * from './requests';
export * from './restaurants';
export * from './staff';
export * from './tours';
