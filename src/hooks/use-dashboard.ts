'use client';

import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/lib/api/dashboard';
import { useAuth } from '@/contexts/auth-context';

export const DASHBOARD_QUERY_KEY = ['dashboard-stats'];

export function useDashboard() {
  const { user } = useAuth();

  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: getDashboardStats,
    enabled: !!user, // Only run query if user is authenticated
    retry: 1, // Only retry once on failure
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
}
