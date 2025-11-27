import { ToursPort } from './port';
import { MockToursAdapter } from './mock.adapter';
import { RemoteToursAdapter } from './remote.adapter';

export function createToursRepository(): ToursPort {
  const useRemote = import.meta.env.VITE_USE_REMOTE === 'true';
  
  if (useRemote) {
    console.log('🌐 Using RemoteToursAdapter (Supabase/API)');
    return new RemoteToursAdapter();
  }
  
  console.log('🔧 Using MockToursAdapter (Seed data)');
  return new MockToursAdapter();
}

export type { 
  Tour, 
  TourBooking, 
  CreateTourBookingDTO, 
  UpdateBookingStatusDTO,
  TourFilters,
  TourBookingStats,
  BookingRequest,
  Booking 
} from './types';
