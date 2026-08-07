import { apiClient } from './client';

export interface SaveAnswerPayload {
  indicator_code: string;
  assessment_year: number;
  raw_input_data: Record<string, unknown>;
}

export interface SaveAnswerResponse {
  earned_points: number;
  calculated_value: number | null;
  overall_score: number;
}

export interface SubmitAssessmentPayload {
  assessment_year: number;
}

export interface SubmitAssessmentResponse {
  campus_assessment_id: number;
  status: 'SUBMITTED';
  overall_score: number;
}

export async function saveAnswer(payload: SaveAnswerPayload): Promise<SaveAnswerResponse> {
  return apiClient<SaveAnswerResponse>('/assessments/answers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function submitAssessment(
  payload: SubmitAssessmentPayload
): Promise<SubmitAssessmentResponse> {
  return apiClient<SubmitAssessmentResponse>('/assessments/submit', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
