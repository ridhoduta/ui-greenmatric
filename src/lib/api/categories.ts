import { apiClient } from './client';
import type { CategoryCode, Indicator } from '@/types';

export interface CategoryIndicatorsData {
  category_code: CategoryCode;
  category_name: string;
  indicators: Indicator[];
}

export async function getCategoryIndicators(
  categoryCode: CategoryCode
): Promise<CategoryIndicatorsData> {
  return apiClient<CategoryIndicatorsData>(
    `/categories/${categoryCode.toLowerCase()}/indicators`
  );
}

export interface AdminIndicatorPayload {
  category_id: number;
  code: string;
  title: string;
  input_type: string;
  max_points: number;
  fields: {
    key: string;
    label: string;
    type: string;
    required: boolean;
    unit?: string;
  }[];
  tiers?: {
    option_label: string;
    point_multiplier: number;
    operator: string;
    min_value: number | null;
    max_value: number | null;
  }[];
}

export async function createAdminIndicator(
  payload: AdminIndicatorPayload
): Promise<Indicator> {
  return apiClient<Indicator>('/admin/indicators', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateAdminIndicator(
  id: number,
  payload: Partial<AdminIndicatorPayload>
): Promise<Indicator> {
  return apiClient<Indicator>(`/admin/indicators/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminIndicator(id: number): Promise<void> {
  return apiClient<void>(`/admin/indicators/${id}`, {
    method: 'DELETE',
  });
}
