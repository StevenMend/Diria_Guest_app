// ============================================
// RESTAURANTS - REMOTE ADAPTER (Phase B.1)
// 100% Supabase - No more JSON loading
// ============================================

import { supabase } from '../../../lib/api/supabase';
import { AuthService, GuestService, PropertyService } from '../../../lib/services';
import { RestaurantsPort } from './port';
import {
  Restaurant,
  RestaurantReservation,
  CreateRestaurantReservationDTO,
  UpdateReservationStatusDTO,
  RestaurantFilters,
  RestaurantReservationStats,
  ReservationRequest,
  Reservation,
} from './types';

export class RemoteRestaurantsAdapter implements RestaurantsPort {
  
  // ========== RESTAURANTS CATALOG ==========
  
  async getAll(filters?: RestaurantFilters): Promise<Restaurant[]> {
    console.log('🌐 RemoteRestaurantsAdapter.getAll() - Fetching from Supabase', filters);
    
    let query = supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('rating', { ascending: false });
    
    if (filters?.cuisine) {
      query = query.eq('cuisine', filters.cuisine);
    }
    
    if (filters?.priceRange) {
      query = query.eq('price_range', filters.priceRange);
    }
    
    if (filters?.isFeatured !== undefined) {
      query = query.eq('is_featured', filters.isFeatured);
    }
    
    if (filters?.acceptsWalkins !== undefined) {
      query = query.eq('accepts_walkins', filters.acceptsWalkins);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('❌ Error fetching restaurants:', error);
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }
    
    console.log(`✅ Loaded ${data.length} restaurants from Supabase`);
    return data as Restaurant[];
  }
  
  async getById(idOrSlug: string): Promise<Restaurant> {
    console.log('🔍 RemoteRestaurantsAdapter.getById():', idOrSlug);
    
    let query = supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true);
    
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
    
    if (isUUID) {
      query = query.eq('id', idOrSlug);
    } else {
      query = query.eq('slug', idOrSlug);
    }
    
    const { data, error } = await query.single();
    
    if (error) {
      console.error('❌ Error fetching restaurant:', error);
      throw new Error(`Restaurant not found: ${idOrSlug}`);
    }
    
    console.log('✅ Restaurant loaded:', data.name);
    return data as Restaurant;
  }
  
  async getByCuisine(cuisine: string): Promise<Restaurant[]> {
    console.log('📂 RemoteRestaurantsAdapter.getByCuisine():', cuisine);
    
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('cuisine', cuisine)
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching restaurants by cuisine:', error);
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }
    
    console.log(`✅ Loaded ${data.length} restaurants in cuisine: ${cuisine}`);
    return data as Restaurant[];
  }
  
  async getFeatured(): Promise<Restaurant[]> {
    console.log('⭐ RemoteRestaurantsAdapter.getFeatured()');
    
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(6);
    
    if (error) {
      console.error('❌ Error fetching featured restaurants:', error);
      throw new Error(`Failed to fetch featured restaurants: ${error.message}`);
    }
    
    console.log(`✅ Loaded ${data.length} featured restaurants`);
    return data as Restaurant[];
  }
  
  // ========== RESERVATIONS ==========
  
  async createReservation(dto: CreateRestaurantReservationDTO): Promise<RestaurantReservation> {
    console.log('🌐 RemoteRestaurantsAdapter.createReservation()', dto);
    
    const userId = await AuthService.getCurrentUserId();
    const guestInfo = await GuestService.getGuestInfo(userId);
    const propertyId = await PropertyService.getDefaultPropertyId();
    
    const { data, error } = await supabase
      .from('restaurant_reservations')
      .insert({
        restaurant_id: dto.restaurant_id,
        guest_id: userId,
        property_id: propertyId,
        guest_name: guestInfo.name,
        guest_email: guestInfo.email || null,
        guest_phone: guestInfo.phone || null,
        room_number: guestInfo.room_number || null,
        reservation_date: dto.reservation_date,
        time_slot: dto.time_slot,
        party_size: dto.party_size,
        status: 'pending',
        occasion: dto.occasion || null,
        dietary_restrictions: dto.dietary_restrictions || null,
        seating_preference: dto.seating_preference || null,
        special_requests: dto.special_requests || null,
      })
      .select(`
        *,
        restaurant:restaurants(*)
      `)
      .single();
    
    if (error) {
      console.error('❌ Error creating reservation:', error);
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
    
    console.log('✅ Reservation created successfully:', data.id);
    return data as RestaurantReservation;
  }
  
  async getReservationsByGuest(guestId: string): Promise<RestaurantReservation[]> {
    console.log('📋 RemoteRestaurantsAdapter.getReservationsByGuest():', guestId);
    
    const { data, error } = await supabase
      .from('restaurant_reservations')
      .select(`
        *,
        restaurant:restaurants(*)
      `)
      .eq('guest_id', guestId)
      .order('reservation_date', { ascending: true })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('❌ Error fetching reservations:', error);
      throw new Error(`Failed to fetch reservations: ${error.message}`);
    }
    
    console.log(`✅ Loaded ${data.length} reservations for guest`);
    return data as RestaurantReservation[];
  }
  
  async getReservationById(id: string): Promise<RestaurantReservation> {
    console.log('🔍 RemoteRestaurantsAdapter.getReservationById():', id);
    
    const { data, error } = await supabase
      .from('restaurant_reservations')
      .select(`
        *,
        restaurant:restaurants(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('❌ Error fetching reservation:', error);
      throw new Error(`Reservation not found: ${id}`);
    }
    
    console.log('✅ Reservation loaded:', data.id);
    return data as RestaurantReservation;
  }
  
  async updateReservationStatus(
    id: string,
    dto: UpdateReservationStatusDTO
  ): Promise<RestaurantReservation> {
    console.log('🔄 RemoteRestaurantsAdapter.updateReservationStatus():', id, dto);
    
    const updateData: any = {
      status: dto.status,
      updated_at: new Date().toISOString(),
    };
    
    if (dto.table_number) {
      updateData.table_number = dto.table_number;
    }
    
    if (dto.status === 'confirmed') {
      updateData.confirmed_at = new Date().toISOString();
    } else if (dto.status === 'seated') {
      updateData.seated_at = new Date().toISOString();
    } else if (dto.status === 'completed') {
      updateData.completed_at = new Date().toISOString();
    } else if (dto.status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
      updateData.cancellation_reason = dto.cancellation_reason || null;
    }
    
    const { data, error } = await supabase
      .from('restaurant_reservations')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        restaurant:restaurants(*)
      `)
      .single();
    
    if (error) {
      console.error('❌ Error updating reservation status:', error);
      throw new Error(`Failed to update reservation: ${error.message}`);
    }
    
    console.log('✅ Reservation status updated:', data.status);
    return data as RestaurantReservation;
  }
  
  async cancelReservation(id: string, reason?: string): Promise<RestaurantReservation> {
    console.log('❌ RemoteRestaurantsAdapter.cancelReservation():', id, reason);
    
    return this.updateReservationStatus(id, {
      status: 'cancelled',
      cancellation_reason: reason,
    });
  }
  
  // ========== STATS ==========
  
  async getReservationStats(restaurantId?: string): Promise<RestaurantReservationStats> {
    console.log('📊 RemoteRestaurantsAdapter.getReservationStats()', restaurantId);
    
    let query = supabase.from('restaurant_reservations').select('status');
    
    if (restaurantId) {
      query = query.eq('restaurant_id', restaurantId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('❌ Error fetching reservation stats:', error);
      throw new Error(`Failed to fetch stats: ${error.message}`);
    }
    
    const stats: RestaurantReservationStats = {
      total: data.length,
      pending: data.filter(r => r.status === 'pending').length,
      confirmed: data.filter(r => r.status === 'confirmed').length,
      seated: data.filter(r => r.status === 'seated').length,
      completed: data.filter(r => r.status === 'completed').length,
      cancelled: data.filter(r => r.status === 'cancelled').length,
      no_show: data.filter(r => r.status === 'no_show').length,
    };
    
    console.log('✅ Reservation stats calculated:', stats);
    return stats;
  }
  
  // ========== LEGACY COMPATIBILITY ==========
  
  async getByName(name: string): Promise<Restaurant> {
    console.warn('⚠️ getByName is deprecated, use getById with slug');
    return this.getById(name);
  }
  
  async createLegacyReservation(request: ReservationRequest): Promise<Reservation> {
    console.warn('⚠️ createLegacyReservation is deprecated, use createReservation');
    
    const restaurants = await this.getAll();
    const restaurant = restaurants.find(r => r.name === request.restaurant || r.slug === request.restaurant);
    
    if (!restaurant) {
      throw new Error(`Restaurant not found: ${request.restaurant}`);
    }
    
    const dto: CreateRestaurantReservationDTO = {
      restaurant_id: restaurant.id,
      reservation_date: request.date,
      time_slot: request.time,
      party_size: request.guests,
      occasion: request.occasion,
      dietary_restrictions: request.dietaryRestrictions,
      seating_preference: request.seatingPreference,
      special_requests: request.specialRequests,
    };
    
    const reservation = await this.createReservation(dto);
    
    return {
      id: reservation.id,
      restaurant: restaurant.name,
      guests: reservation.party_size,
      date: reservation.reservation_date,
      time: reservation.time_slot,
      occasion: reservation.occasion || undefined,
      dietaryRestrictions: reservation.dietary_restrictions || undefined,
      seatingPreference: reservation.seating_preference || undefined,
      specialRequests: reservation.special_requests || undefined,
      status: reservation.status as 'pending' | 'confirmed' | 'cancelled',
      createdAt: reservation.created_at,
    };
  }
}
