import { apiClient } from './client';
import type { Campus } from '@/types';

export interface CreateCampusPayload {
  code: string;
  name: string;
  institution_type: string;
  climate: string;
  setting: string;
}

export type UpdateCampusPayload = Partial<CreateCampusPayload>;

export async function getCampuses(): Promise<Campus[]> {
  return apiClient<Campus[]>('/campuses');
}

export async function getCampus(id: number): Promise<Campus> {
  return apiClient<Campus>(`/campuses/${id}`);
}

export async function createCampus(payload: CreateCampusPayload): Promise<Campus> {
  return apiClient<Campus>('/campuses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCampus(id: number, payload: UpdateCampusPayload): Promise<Campus> {
  return apiClient<Campus>(`/campuses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteCampus(id: number): Promise<void> {
  await apiClient<void>(`/campuses/${id}`, {
    method: 'DELETE',
  });
}
