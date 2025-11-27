import { ServiceRequestsPort } from './port';
import { MockServiceRequestsAdapter } from './mock.adapter';
import { RemoteServiceRequestsAdapter } from './remote.adapter';
import { StaffRemoteServiceRequestsAdapter } from './staff-remote.adapter';
import { useAuthStore } from '../../../lib/stores/useAuthStore';

export function createServiceRequestsRepository(): ServiceRequestsPort {
  const useRemote = import.meta.env.VITE_USE_REMOTE === 'true';
  
  if (useRemote) {
    // Detectar si es staff o guest
    const session = useAuthStore.getState().session;
    const isStaff = session?.user?.role === 'staff';
    
    if (isStaff) {
      console.log('🌐 Using StaffRemoteServiceRequestsAdapter (All requests)');
      return new StaffRemoteServiceRequestsAdapter();
    }
    
    console.log('🌐 Using RemoteServiceRequestsAdapter (Guest requests only)');
    return new RemoteServiceRequestsAdapter();
  }
  
  console.log('🔧 Using MockServiceRequestsAdapter (Seed data)');
  return new MockServiceRequestsAdapter();
}

export type { ServiceRequest, CreateRequestDTO, UpdateRequestDTO, RequestType, RequestStatus, RequestPriority } from './types';
