import { ToursPort } from './port';
import { Tour, BookingRequest, Booking } from './types';
import toursData from '../../../data/seed/tours/activities.json';

export class MockToursAdapter implements ToursPort {
  private tours: Tour[] = toursData as Tour[];

  async getAll(): Promise<Tour[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.tours;
  }

  async getById(name: string): Promise<Tour> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const tour = this.tours.find(t => t.name === name);
    if (!tour) {
      throw new Error(`Tour "${name}" not found`);
    }
    return tour;
  }

  async createBooking(request: BookingRequest): Promise<Booking> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const booking: Booking = {
      ...request,
      id: `book-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    console.log('✅ Mock Booking Created:', booking);
    return booking;
  }
}
