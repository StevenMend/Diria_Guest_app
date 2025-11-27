// src/types/coordination.ts
import { BaseEntity, Priority, UserRole } from './index';

export interface CoordinationEvent extends BaseEntity {
  type: 'guest.request.created' | 'staff.request.updated' | 'admin.metrics.updated';
  source: UserRole;
  target: UserRole[];
  data: Record<string, any>;
  priority: Priority;
  processed: boolean;
}

export interface WebSocketMessage {
  eventType: string;
  data: any;
  timestamp: string;
  userId?: string;
  department?: string;
  channel: string;
}

export interface LiveUpdate extends BaseEntity {
  type: 'confirmation' | 'issue' | 'emergency';
  title: string;
  message: string;
  department: string;
  guest?: string;
  room?: string;
  priority: Priority;
  status: 'new' | 'acknowledged' | 'resolved';
  escalationTimer?: number;
  linkedRequests?: string[];
  assignedTo?: string;
  details?: Record<string, any>;
}

export interface BroadcastMessage extends BaseEntity {
  from: string;
  department: string;
  message: string;
  recipients: string[];
  priority: 'normal' | 'urgent';
  acknowledged: string[];
}
