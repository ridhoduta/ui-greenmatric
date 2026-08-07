'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCategoryIndicators,
  createAdminIndicator,
  updateAdminIndicator,
  deleteAdminIndicator,
  type AdminIndicatorPayload
} from '@/lib/api/categories';
import type { CategoryCode } from '@/types';

export const categoryIndicatorsQueryKey = (categoryCode: CategoryCode) => [
  'category-indicators',
  categoryCode,
];

export function useCategoryIndicators(categoryCode: CategoryCode) {
  return useQuery({
    queryKey: categoryIndicatorsQueryKey(categoryCode),
    queryFn: () => getCategoryIndicators(categoryCode),
    enabled: !!categoryCode,
  });
}

export function useCreateIndicator(categoryCode?: CategoryCode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdminIndicatorPayload) => createAdminIndicator(payload),
    onSuccess: () => {
      if (categoryCode) {
        queryClient.invalidateQueries({
          queryKey: categoryIndicatorsQueryKey(categoryCode),
        });
      }
    },
  });
}

export function useUpdateIndicator(categoryCode?: CategoryCode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<AdminIndicatorPayload> }) =>
      updateAdminIndicator(id, payload),
    onSuccess: () => {
      if (categoryCode) {
        queryClient.invalidateQueries({
          queryKey: categoryIndicatorsQueryKey(categoryCode),
        });
      }
    },
  });
}

export function useDeleteIndicator(categoryCode?: CategoryCode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAdminIndicator(id),
    onSuccess: () => {
      if (categoryCode) {
        queryClient.invalidateQueries({
          queryKey: categoryIndicatorsQueryKey(categoryCode),
        });
      }
    },
  });
}
