// src/features/service-requests/queries/staff-queries.ts
import { useQuery } from '@tanstack/react-query';
import { serviceRequestsKeys } from './keys';
import { createServiceRequestsRepository } from '../api';

/**
 * Query hook for fetching department's service requests
 * @param departmentId - Department ID
 * @param options - React Query options
 */
export const useStaffRequestsQuery = (departmentId: string, enabled = true) => {
  const adapter = createServiceRequestsRepository();
  
  return useQuery({
    queryKey: serviceRequestsKeys.byDepartment(departmentId),
    queryFn: () => adapter.getByDepartment(departmentId),
    staleTime: 1000 * 15, // 15 seconds - Staff needs fresher data
    refetchInterval: 1000 * 30, // Poll every 30 seconds
    enabled: enabled && !!departmentId,
  });
};