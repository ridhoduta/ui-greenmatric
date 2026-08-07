'use client';

import { useState } from 'react';
import { useSuperAdminDashboardStats } from '@/hooks/use-dashboard-super-admin';
import { useAuth } from '@/contexts/auth-context';
import { CategoryIndicatorsAccordion } from '@/components/super-admin/category-indicators-accordion';
import { formatNumber } from '@/lib/utils/format';
import {
  School, LayoutGrid, FileText, Search, Trophy
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useSuperAdminDashboardStats();
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'SUPER_ADMIN') {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
        <p className="text-destructive font-medium">Akses ditolak. Halaman ini hanya untuk Super Admin.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground font-medium">Memuat data dashboard super admin...</p>
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
          <p className="text-sm text-muted-foreground">{(error as any).message || 'Terjadi kesalahan saat memuat dashboard.'}</p>
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

  if (!data) return null;

  const { totalCampuses, totalCategories, totalIndicators, indicatorsPerCategory, categoryIndicators, campusRankings } = data;

  const filteredRankings = campusRankings.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 border-b border-outline-variant pb-6">
        <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Super Admin Dashboard</h2>
        <p className="text-on-surface-variant text-sm mt-1">
          Pantau statistik global indikator dan pemeringkatan mandiri kampus seluruh member.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Total Campus */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl">
            <School size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Kampus</p>
            <p className="text-3xl font-black text-on-surface mt-1">{totalCampuses}</p>
          </div>
        </div>

        {/* Card 2: Total Categories */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-700 rounded-xl">
            <LayoutGrid size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Kategori</p>
            <p className="text-3xl font-black text-on-surface mt-1">{totalCategories}</p>
          </div>
        </div>

        {/* Card 3: Total Indicators */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-700 rounded-xl">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Indikator</p>
            <p className="text-3xl font-black text-on-surface mt-1">{totalIndicators}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Category accordion & Rankings */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        
        {/* Left Column: Category Accordion */}
        <div className="xl:col-span-2">
          <CategoryIndicatorsAccordion categoryIndicators={categoryIndicators} />
        </div>

        {/* Right Column: Campus Rankings */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
            
            {/* Header Table & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                <h3 className="text-lg font-bold text-on-surface">Peringkat Kampus (Evaluasi Mandiri)</h3>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari kampus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-1.5 border border-outline-variant rounded-lg text-sm bg-transparent outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors"
                />
              </div>
            </div>

            {/* Rankings Table */}
            <div className="overflow-x-auto border border-outline-variant rounded-xl">
              <table className="w-full border-collapse text-left text-sm text-on-surface">
                <thead>
                  <tr className="bg-slate-50 border-b border-outline-variant text-xs font-bold text-on-surface-variant uppercase">
                    <th className="py-3 px-4 w-16 text-center">Rank</th>
                    <th className="py-3 px-4">Kampus</th>
                    <th className="py-3 px-4 text-center">Skor Total</th>
                    <th className="py-3 px-4">Progres</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-medium">
                  {filteredRankings.length > 0 ? (
                    filteredRankings.map((campus) => {
                      const maxScore = 10000;
                      const progressPct = (campus.score / maxScore) * 100;

                      return (
                        <tr key={campus.id} className="hover:bg-slate-50/55 transition-colors">
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                              campus.rank === 1
                                ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-300'
                                : campus.rank === 2
                                ? 'bg-slate-100 text-slate-800 ring-2 ring-slate-300'
                                : campus.rank === 3
                                ? 'bg-orange-100 text-orange-800 ring-2 ring-orange-300'
                                : 'text-on-surface-variant'
                            }`}>
                              {campus.rank}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-on-surface">{campus.name}</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-mono mt-0.5">{campus.code}</div>
                          </td>
                          <td className="py-4 px-4 text-center font-mono text-xs font-bold text-primary">
                            {formatNumber(campus.score, 0)}
                          </td>
                          <td className="py-4 px-4 w-44">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-muted-foreground w-8 shrink-0">{progressPct.toFixed(0)}%</span>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              campus.status === 'VERIFIED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : campus.status === 'SUBMITTED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {campus.status === 'VERIFIED' ? 'Verified' : campus.status === 'SUBMITTED' ? 'Submitted' : 'Draft'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground text-sm">
                        Tidak ada data kampus ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}