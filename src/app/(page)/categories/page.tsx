'use client';

import { useDashboard } from '@/hooks/use-dashboard';
import { useAuth } from '@/contexts/auth-context';
import { CATEGORIES } from '@/config/categories';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/lib/utils/format';
import {
  Building2, Zap, Trash2, Droplets, Car, GraduationCap, ShieldCheck, ArrowRight, LayoutGrid
} from 'lucide-react';
import type { CategoryCode } from '@/types';

const CATEGORY_UI_CONFIG: Record<
  CategoryCode,
  { icon: React.ReactNode; bgColor: string; iconColor: string; barColor: string }
> = {
  SI: { icon: <Building2 size={18} />, bgColor: 'bg-emerald-50 text-emerald-700', iconColor: 'text-emerald-700', barColor: 'bg-emerald-500' },
  EC: { icon: <Zap size={18} />, bgColor: 'bg-blue-50 text-blue-700', iconColor: 'text-blue-700', barColor: 'bg-blue-500' },
  WS: { icon: <Trash2 size={18} />, bgColor: 'bg-orange-50 text-orange-700', iconColor: 'text-orange-700', barColor: 'bg-orange-500' },
  WR: { icon: <Droplets size={18} />, bgColor: 'bg-cyan-50 text-cyan-700', iconColor: 'text-cyan-700', barColor: 'bg-cyan-500' },
  TR: { icon: <Car size={18} />, bgColor: 'bg-purple-50 text-purple-700', iconColor: 'text-purple-700', barColor: 'bg-purple-500' },
  ED: { icon: <GraduationCap size={18} />, bgColor: 'bg-rose-50 text-rose-700', iconColor: 'text-rose-700', barColor: 'bg-rose-500' },
  GD: { icon: <ShieldCheck size={18} />, bgColor: 'bg-indigo-50 text-indigo-700', iconColor: 'text-indigo-700', barColor: 'bg-indigo-500' },
};

export default function CategoriesPage() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading, error, refetch } = useDashboard();
  const router = useRouter();

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground font-medium">Memuat daftar kategori...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-6">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h3 className="text-lg font-bold text-on-surface">Gagal Memuat Data</h3>
          <p className="text-sm text-muted-foreground">{error.message || 'Terjadi kesalahan saat memuat kategori.'}</p>
          <button
            onClick={() => refetch()}
            className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:brightness-110 transition-all shadow-md"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  const breakdown = dashboardData?.category_breakdown ?? [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-5">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
            <LayoutGrid size={16} />
            <span>Katalog Evaluasi</span>
          </div>
          <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Kategori Evaluasi Mandiri</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Pantau dan lengkapi pengisian indikator keberlanjutan kampus Anda.
          </p>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Tahun Evaluasi: {dashboardData?.current_year ?? new Date().getFullYear()}
          </span>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((category) => {
          const ui = CATEGORY_UI_CONFIG[category.code];
          const scoreData = breakdown.find((b) => b.category_code === category.code);
          const earned = scoreData?.earned_points ?? 0;
          const max = category.max_points;
          const pct = max > 0 ? Math.min((earned / max) * 100, 100) : 0;

          const isOperator = user.role === category.operator_role;
          const isAdmin = user.role === 'ADMIN_KAMPUS' || user.role === 'SUPER_ADMIN';
          const canEdit = isOperator || isAdmin;

          return (
            <div
              key={category.code}
              onClick={() => router.push(category.href)}
              className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Icon + Title + Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`shrink-0 p-2 rounded-lg ${ui.bgColor} transition-colors group-hover:scale-105 duration-300`}>
                    {ui.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-on-surface leading-snug group-hover:text-primary transition-colors truncate">
                      {category.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
                      {category.code} · {category.weight_percentage}%
                    </span>
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  pct >= 100
                    ? 'bg-emerald-100 text-emerald-700'
                    : pct > 0
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {pct >= 100 ? 'Selesai' : pct > 0 ? 'Progres' : 'Mulai'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                {category.description}
              </p>

              {/* Progress */}
              <div className="mt-auto space-y-2">
                <div className="flex justify-between text-xs font-bold text-on-surface">
                  <span>{formatNumber(earned, 0)} / {formatNumber(max, 0)} Poin</span>
                  <span className={ui.iconColor}>{pct.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${ui.barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">
                    {canEdit ? 'Edit & Pantau' : 'Pantau Saja'}
                  </span>
                  <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {canEdit ? 'Mulai' : 'Detail'}
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
