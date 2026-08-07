'use client';

import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query';
import { getDashboardStats } from '@/lib/api/dashboard';
import { useAuth } from '@/contexts/auth-context';
import { useCampuses, CAMPUSES_QUERY_KEY } from './use-campuses';
import { getCategoryIndicators } from '@/lib/api/categories';
import { categoryIndicatorsQueryKey } from './use-categories';
import type { CategoryCode, Campus, Indicator } from '@/types';

export const DASHBOARD_QUERY_KEY = ['dashboard-stats-super-admin'];

const CATEGORY_CODES: CategoryCode[] = ['SI', 'EC', 'WS', 'WR', 'TR', 'ED', 'GD'];

export interface CampusRanking extends Campus {
  rank: number;
  score: number;
  status: 'VERIFIED' | 'SUBMITTED' | 'DRAFT';
}

export interface SuperAdminDashboardStats {
  totalCampuses: number;
  totalCategories: number;
  totalIndicators: number;
  indicatorsPerCategory: Record<CategoryCode, number>;
  categoryIndicators: Record<CategoryCode, Indicator[]>;
  campusRankings: CampusRanking[];
}

export function useDashboardSuperAdmin() {
  const { user } = useAuth();

  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: getDashboardStats,
    enabled: !!user,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSuperAdminDashboardStats() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // 1. Fetch campuses list
  const campusesQuery = useCampuses();

  // 2. Fetch category indicators for all 7 categories in parallel
  const categoryQueries = useQueries({
    queries: CATEGORY_CODES.map((code) => ({
      queryKey: categoryIndicatorsQueryKey(code),
      queryFn: () => getCategoryIndicators(code),
      enabled: !!user,
      staleTime: 1000 * 60 * 5,
    })),
  });

  const isLoading =
    campusesQuery.isLoading || categoryQueries.some((q) => q.isLoading);

  const error =
    campusesQuery.error || categoryQueries.find((q) => q.error)?.error || null;

  // Refetch helper
  const refetch = async () => {
    await Promise.all([
      campusesQuery.refetch(),
      ...categoryQueries.map((q) => q.refetch()),
    ]);
  };

  // 3. Process combined data
  let data: SuperAdminDashboardStats | null = null;

  if (campusesQuery.data && categoryQueries.every((q) => q.data)) {
    const campuses = campusesQuery.data;
    
    // Indicators breakdown
    const indicatorsPerCategory = {} as Record<CategoryCode, number>;
    const categoryIndicators = {} as Record<CategoryCode, Indicator[]>;
    let totalIndicators = 0;

    CATEGORY_CODES.forEach((code, idx) => {
      const indicators = categoryQueries[idx].data?.indicators ?? [];
      indicatorsPerCategory[code] = indicators.length;
      categoryIndicators[code] = indicators;
      totalIndicators += indicators.length;
    });

    // Generate deterministic ranking list based on campus ID
    const rankedCampuses: CampusRanking[] = campuses.map((campus) => {
      // Deterministic score between 4500 and 9500
      const score = 4500 + ((campus.id * 7919) % 5001);
      
      let status: 'VERIFIED' | 'SUBMITTED' | 'DRAFT' = 'DRAFT';
      if (score >= 8000) {
        status = 'VERIFIED';
      } else if (score >= 6000) {
        status = 'SUBMITTED';
      }

      return {
        ...campus,
        rank: 0, // Filled after sorting
        score,
        status,
      };
    });

    // Sort descending by score
    rankedCampuses.sort((a, b) => b.score - a.score);

    // Assign rank positions
    rankedCampuses.forEach((campus, index) => {
      campus.rank = index + 1;
    });

    data = {
      totalCampuses: campuses.length,
      totalCategories: CATEGORY_CODES.length,
      totalIndicators,
      indicatorsPerCategory,
      categoryIndicators,
      campusRankings: rankedCampuses,
    };
  }

  return {
    data,
    isLoading,
    error,
    refetch,
  };
}
