'use client';

import { useAuth } from '@/contexts/auth-context';
import { useCategoryIndicators } from '@/hooks/use-categories';
import { getCategoryConfig } from '@/config/categories';
import { CategoryPageShell } from '@/components/categories/category-page-shell';
import { IndicatorCardOperator } from '@/components/categories/indicator-card-operator';
import { IndicatorCardReadonly } from '@/components/categories/indicator-card-readonly';
import { IndicatorCardSuperAdmin } from '@/components/categories/indicator-card-superadmin';
import type { CategoryCode } from '@/types';

const CATEGORY_CODE: CategoryCode = 'TR';
const ASSESSMENT_YEAR = new Date().getFullYear();

export default function CategoryTRPage() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useCategoryIndicators(CATEGORY_CODE);

  const config = getCategoryConfig(CATEGORY_CODE)!;

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground">Memuat data indikator...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-destructive text-sm">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const indicators = data?.indicators ?? [];
  const earnedPoints = indicators.reduce((sum, ind) => sum + (ind.answer?.earned_points ?? 0), 0);
  const isOperator = user.role === 'OPERATOR_TR';
  const isSuperAdmin = user.role === 'SUPER_ADMIN';

  return (
    <CategoryPageShell config={config} role={user.role} earnedPoints={earnedPoints}>
      <div className="space-y-3">
        {indicators.length === 0 ? (
          <div className="text-center py-16 text-sm text-on-surface-variant">
            Tidak ada indikator ditemukan.
          </div>
        ) : (
          indicators.map((indicator) =>
            isSuperAdmin ? (
              <IndicatorCardSuperAdmin
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                onUpdate={() => refetch()}
                onDelete={() => refetch()}
              />
            ) : isOperator ? (
              <IndicatorCardOperator
                key={indicator.id}
                indicator={indicator}
                categoryCode={CATEGORY_CODE}
                assessmentYear={ASSESSMENT_YEAR}
              />
            ) : (
              <IndicatorCardReadonly key={indicator.id} indicator={indicator} />
            )
          )
        )}
      </div>
    </CategoryPageShell>
  );
}
