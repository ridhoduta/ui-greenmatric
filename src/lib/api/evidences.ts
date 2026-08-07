import { apiClient, apiClientMultipart } from './client';
import type { Evidence } from '@/types';

export interface UploadEvidencePayload {
  assessment_answer_id: number;
  document_name: string;
  description?: string;
  file: File;
}

export async function uploadEvidence(payload: UploadEvidencePayload): Promise<Evidence> {
  const formData = new FormData();
  formData.append('file', payload.file);
  formData.append('assessment_answer_id', payload.assessment_answer_id.toString());
  formData.append('document_name', payload.document_name);
  if (payload.description) {
    formData.append('description', payload.description);
  }

  return apiClientMultipart<Evidence>('/evidences/upload', formData);
}

export async function deleteEvidence(id: number): Promise<void> {
  await apiClient<void>(`/evidences/${id}`, {
    method: 'DELETE',
  });
}
