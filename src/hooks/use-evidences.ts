'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  uploadEvidence,
  deleteEvidence,
  type UploadEvidencePayload,
} from '@/lib/api/evidences';
import { categoryIndicatorsQueryKey } from './use-categories';
import type { CategoryCode } from '@/types';

export function useEvidenceMutations(categoryCode: CategoryCode) {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (payload: UploadEvidencePayload) => uploadEvidence(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryIndicatorsQueryKey(categoryCode) });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteEvidence(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryIndicatorsQueryKey(categoryCode) });
    },
  });

  return {
    uploadEvidence: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,

    deleteEvidence: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error,
  };
}
