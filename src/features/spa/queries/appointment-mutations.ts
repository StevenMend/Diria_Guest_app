import { useMutation, useQueryClient } from '@tanstack/react-query';
import { spaAdapter } from '../api';
import { spaKeys } from './keys';
import type { CreateSpaAppointmentDTO, UpdateSpaAppointmentDTO } from '../types';

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSpaAppointmentDTO) => spaAdapter.createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpaAppointmentDTO }) =>
      spaAdapter.updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      spaAdapter.cancelAppointment(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}

export function useConfirmAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, therapistId }: { id: string; therapistId?: string }) =>
      spaAdapter.confirmAppointment(id, therapistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}

export function useStartAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => spaAdapter.startAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}

export function useCompleteAppointment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => spaAdapter.completeAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spaKeys.appointments() });
    },
  });
}