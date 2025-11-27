// src/hooks/guest/useGuestRequests.ts - UNIFIED ACTIVITIES VERSION
import { useMemo } from 'react';
import { useAuthStore } from '../../lib/stores/useAuthStore';
import { useRateRequestMutation } from '../../features/service-requests/queries';
import { 
  useUnifiedActivitiesQuery,
  type UnifiedActivity 
} from '../../features/service-requests/queries/unified-activities-queries';

interface UseGuestRequestsResult {
  activeRequests: UnifiedActivity[];
  completedRequests: UnifiedActivity[];
  allRequests: UnifiedActivity[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  submitRating: (requestId: string, rating: number, feedback?: string) => Promise<void>;
  hasUnratedCompleted: boolean;
}

export const useGuestRequests = (): UseGuestRequestsResult => {
  const session = useAuthStore((state) => state.session);
  const userId = session?.user?.id || '';

  // ✅ NUEVO: Usar unified query en vez de solo service_requests
  const { 
    data: allRequests = [], 
    isLoading: loading, 
    error: queryError,
    refetch 
  } = useUnifiedActivitiesQuery(userId, !!userId);

  const rateMutation = useRateRequestMutation(userId);

  // Filter active (all non-completed)
  const activeRequests = useMemo(
    () => allRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled'),
    [allRequests]
  );

  // Filter completed
  const completedRequests = useMemo(
    () => allRequests.filter(r => r.status === 'completed'),
    [allRequests]
  );

  // Check for unrated completed service requests
  // Note: Only service_requests support ratings currently
  const hasUnratedCompleted = useMemo(
    () => completedRequests.some(r => 
      r.type === 'service_request' && r.rating === null
    ),
    [completedRequests]
  );

  const submitRating = async (requestId: string, rating: number, feedback?: string) => {
    // Rating only works for service_requests
    await rateMutation.mutateAsync({ requestId, rating, feedback });
  };

  return {
    activeRequests,
    completedRequests,
    allRequests,
    loading,
    error: queryError?.message || null,
    refetch: async () => { await refetch(); },
    submitRating,
    hasUnratedCompleted,
  };
};
