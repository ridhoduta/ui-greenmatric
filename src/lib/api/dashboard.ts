import { apiClient } from './client';
import type { DashboardStats } from '@/types';

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient<DashboardStats>('/assessments/dashboard');
}
