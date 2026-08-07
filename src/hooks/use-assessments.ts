'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  saveAnswer,
  submitAssessment,
  type SaveAnswerPayload,
  type SubmitAssessmentPayload,
} from '@/lib/api/assessments';
import { categoryIndicatorsQueryKey } from './use-categories';
import { DASHBOARD_QUERY_KEY } from './use-dashboard';
import type { CategoryCode } from '@/types';

export function useSaveAnswer(categoryCode: CategoryCode) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveAnswerPayload) => saveAnswer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryIndicatorsQueryKey(categoryCode) });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    },
  });
}

export function useSubmitAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitAssessmentPayload) => submitAssessment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    },
  });
}
