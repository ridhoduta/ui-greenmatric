'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCampuses,
  getCampus,
  createCampus,
  updateCampus,
  deleteCampus,
  type CreateCampusPayload,
  type UpdateCampusPayload,
} from '@/lib/api/campuses';

export const CAMPUSES_QUERY_KEY = ['campuses'];
export const campusQueryKey = (id: number) => ['campus', id];

export function useCampuses() {
  return useQuery({
    queryKey: CAMPUSES_QUERY_KEY,
    queryFn: getCampuses,
  });
}

export function useCampus(id: number) {
  return useQuery({
    queryKey: campusQueryKey(id),
    queryFn: () => getCampus(id),
    enabled: !!id,
  });
}

export function useCampusMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateCampusPayload) => createCampus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAMPUSES_QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCampusPayload }) =>
      updateCampus(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CAMPUSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: campusQueryKey(id) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCampus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAMPUSES_QUERY_KEY });
    },
  });

  return {
    createCampus: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
    
    updateCampus: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    
    deleteCampus: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}
