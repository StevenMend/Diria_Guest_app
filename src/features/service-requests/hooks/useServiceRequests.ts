// src/features/service-requests/hooks/useServiceRequests.ts
import { useState, useEffect } from 'react';
import { createServiceRequestsRepository } from '../api';
import type { ServiceRequest, CreateRequestDTO, UpdateRequestDTO, RequestStatus, RequestType } from '../api';

interface UseServiceRequestsReturn {
  requests: ServiceRequest[];
  filteredRequests: ServiceRequest[];
  completedRequests: ServiceRequest[];  // ✅ NUEVO: Para pagination
  selectedStatus: RequestStatus | 'all';
  setSelectedStatus: (status: RequestStatus | 'all') => void;
  selectedType: RequestType | 'all';
  setSelectedType: (type: RequestType | 'all') => void;
  createRequest: (dto: CreateRequestDTO) => Promise<ServiceRequest>;
  updateRequest: (id: string, updates: UpdateRequestDTO) => Promise<ServiceRequest>;
  takeRequest: (id: string, staffId: string, staffName: string) => Promise<ServiceRequest>;  // ✅ NUEVO: Con race condition fix
  deleteRequest: (id: string) => Promise<void>;
  loadMoreCompleted: () => Promise<void>;  // ✅ NUEVO: Pagination
  hasMoreCompleted: boolean;               // ✅ NUEVO: Pagination flag
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

const REQUEST_TYPES: RequestType[] = [
  'housekeeping',
  'transportation',
  'concierge',
  'maintenance',
  'dining',
  'spa',
  'tour',
  'general'
];

const REQUEST_STATUSES: RequestStatus[] = [
  'pending',
  'assigned',
  'in-progress',
  'completed',
  'cancelled'
];

const COMPLETED_PAGE_SIZE = 20;  // ✅ NUEVO: Tamaño de página para completed

export function useServiceRequests(): UseServiceRequestsReturn {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [completedRequests, setCompletedRequests] = useState<ServiceRequest[]>([]);  // ✅ NUEVO
  const [completedOffset, setCompletedOffset] = useState(0);  // ✅ NUEVO
  const [hasMoreCompleted, setHasMoreCompleted] = useState(false);  // ✅ NUEVO
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<RequestType | 'all'>('all');

  const repo = createServiceRequestsRepository();

  // ✅ MODIFICADO: Load requests with pagination for completed
  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await repo.getAll();
      
      // ✅ NUEVO: Separar completed de active
      const active = data.filter(r => r.status !== 'completed');
      const completed = data
        .filter(r => r.status === 'completed')
        .sort((a, b) => {
          const dateA = new Date(a.completed_at || a.updated_at).getTime();
          const dateB = new Date(b.completed_at || b.updated_at).getTime();
          return dateB - dateA;  // Más recientes primero
        })
        .slice(0, COMPLETED_PAGE_SIZE);  // ✅ Solo primeros 20 completed

      setRequests([...active, ...completed]);
      setCompletedRequests(completed);
      setCompletedOffset(COMPLETED_PAGE_SIZE);
      setHasMoreCompleted(data.filter(r => r.status === 'completed').length > COMPLETED_PAGE_SIZE);
      
      console.log('✅ Requests loaded:', {
        active: active.length,
        completed: completed.length,
        hasMore: data.filter(r => r.status === 'completed').length > COMPLETED_PAGE_SIZE
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: Load more completed requests (pagination)
  const loadMoreCompleted = async () => {
    try {
      const allData = await repo.getAll();
      const allCompleted = allData
        .filter(r => r.status === 'completed')
        .sort((a, b) => {
          const dateA = new Date(a.completed_at || a.updated_at).getTime();
          const dateB = new Date(b.completed_at || b.updated_at).getTime();
          return dateB - dateA;
        });

      const nextBatch = allCompleted.slice(completedOffset, completedOffset + COMPLETED_PAGE_SIZE);
      
      if (nextBatch.length > 0) {
        setCompletedRequests(prev => [...prev, ...nextBatch]);
        setRequests(prev => [...prev, ...nextBatch]);
        setCompletedOffset(prev => prev + COMPLETED_PAGE_SIZE);
        setHasMoreCompleted(allCompleted.length > completedOffset + COMPLETED_PAGE_SIZE);
        
        console.log('✅ Loaded more completed:', {
          newCount: nextBatch.length,
          totalNow: completedOffset + nextBatch.length,
          hasMore: allCompleted.length > completedOffset + COMPLETED_PAGE_SIZE
        });
      }
    } catch (err) {
      console.error('❌ Load more error:', err);
    }
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch = selectedStatus === 'all' || request.status === selectedStatus;
    const typeMatch = selectedType === 'all' || request.type === selectedType;
    return statusMatch && typeMatch;
  });

  const createRequest = async (dto: CreateRequestDTO): Promise<ServiceRequest> => {
    try {
      const newRequest = await repo.create(dto);
      setRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create request';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // ✅ NUEVO: Take request with race condition fix
  const takeRequest = async (id: string, staffId: string, staffName: string): Promise<ServiceRequest> => {
    try {
      console.log('📝 Taking request:', id);
      
      // ✅ FIX: Verificar que no esté asignado antes de actualizar
      const current = requests.find(r => r.id === id);
      if (current?.assigned_to) {
        throw new Error('Request already taken by another staff member');
      }

      const updated = await repo.update(id, {
        assigned_to: staffId,
        status: 'assigned',
        // @ts-ignore - assigned_to_name no está en el tipo pero existe en DB
        assigned_to_name: staffName
      });
      
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      console.log('✅ Request taken successfully');
      return updated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to take request';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateRequest = async (id: string, updates: UpdateRequestDTO): Promise<ServiceRequest> => {
    try {
      const updated = await repo.update(id, updates);
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      
      // ✅ Si se completó, actualizar completedRequests también
      if (updated.status === 'completed') {
        setCompletedRequests(prev => {
          const exists = prev.find(r => r.id === id);
          if (exists) {
            return prev.map(r => r.id === id ? updated : r);
          }
          return [updated, ...prev];
        });
      }
      
      return updated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update request';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteRequest = async (id: string): Promise<void> => {
    try {
      await repo.delete(id);
      setRequests(prev => prev.filter(r => r.id !== id));
      setCompletedRequests(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete request';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return {
    requests,
    filteredRequests,
    completedRequests,        // ✅ NUEVO
    selectedStatus,
    setSelectedStatus,
    selectedType,
    setSelectedType,
    createRequest,
    updateRequest,
    takeRequest,              // ✅ NUEVO
    deleteRequest,
    loadMoreCompleted,        // ✅ NUEVO
    hasMoreCompleted,         // ✅ NUEVO
    loading,
    error,
    reload: loadRequests
  };
}

export { REQUEST_TYPES, REQUEST_STATUSES };