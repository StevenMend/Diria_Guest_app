// src/types/staff.ts - Staff-related types
export type DepartmentType = 
  | 'restaurants' 
  | 'housekeeping' 
  | 'maintenance' 
  | 'concierge' 
  | 'spa' 
  | 'tours';

export interface StaffMetadata {
  id: string;
  name: string;
  email: string;
  department: DepartmentType;
  department_id: string | null;
  restaurant_id: string | null;
  restaurant?: {
    id: string;
    slug: string;
    name: string;
  };
  is_active: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  description: string | null;
  property_id: string;
  manager_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StaffRequest {
  id: string;
  guest_id: string;
  guest_name: string;
  room_number: string;
  department_id: string | null;
  type: string;
  title: string;
  description: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assigned_to: string | null;
  assigned_to_name: string | null;
  created_at: string;
  acknowledged_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  rating: number | null;
  feedback: string | null;
  updated_at: string;
}