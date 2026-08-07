'use client';

import { useEffect, useRef } from 'react';
import { useDashboard } from '@/hooks/use-dashboard';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/lib/utils/format';
import {
  TrendingUp, MapPin, Zap, Trash2, Droplets, Truck, BookOpen, Download, FileText, Share2, Plus, MoreVertical, Timer
} from 'lucide-react';
import type { ApiError } from '@/lib/api/client';
import Chart from 'chart.js/auto';

const categoryConfig: Record<string, { icon: React.ReactNode; bgColor: string; iconColor: string; }> = {
  SI: { icon: <MapPin size={20} />, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  EC: { icon: <Zap size={20} />, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
  WS: { icon: <Trash2 size={20} />, bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  WR: { icon: <Droplets size={20} />, bgColor: 'bg-cyan-50', iconColor: 'text-cyan-600' },
  TR: { icon: <Truck size={20} />, bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  ED: { icon: <BookOpen size={20} />, bgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
};

function getStatusBadge(percentage: number) {
  if (percentage >= 100) return { label: 'Completed', color: 'bg-emerald-100 text-emerald-700' };
  if (percentage >= 50) return { label: 'In Progress', color: 'bg-amber-100 text-amber-700' };
  return { label: 'Not Started', color: 'bg-slate-100 text-slate-500' };
}

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useDashboard();
  const router = useRouter();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!data?.trend_history || !chartRef.current || chartInstanceRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.trend_history.map((t) => t.year.toString()),
        datasets: [{
          label: 'Annual Score',
          data: data.trend_history.map((t) => t.score),
          borderColor: '#006c49',
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx: chartCtx, chartArea } = chart;
            if (!chartArea) return 'rgba(16, 185, 129, 0)';
            const gradient = chartCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.15)');
            return gradient;
          },
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#006c49',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          filler: { propagate: true },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            ticks: { color: '#6c7a71', font: { size: 12 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#6c7a71', font: { size: 12 } },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data?.trend_history]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Memuat data dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-destructive">{(error as ApiError).message || 'Gagal memuat data'}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    campus_name,
    current_year,
    assessment_status,
    overall_score,
    max_overall_score,
    estimated_rank,
    category_breakdown,
    trend_history,
  } = data;

  const scorePct = max_overall_score > 0 ? (overall_score / max_overall_score) * 100 : 0;
  const previousYear = trend_history?.[trend_history.length - 2];
  const yearOverYearGrowth = previousYear
    ? ((overall_score - previousYear.score) / previousYear.score) * 100
    : 0;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Dashboard Overview</h2>
          <p className="text-on-surface-variant font-body-md mt-1">
            Real-time performance tracking for {campus_name} {current_year} Self-Assessment.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-outline-variant text-on-surface font-medium rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2 text-sm">
            <Share2 size={18} />
            Export Data
          </button>
          <button
            onClick={() => router.push('/categories')}
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:brightness-110 transition-all shadow-md flex items-center gap-2 text-sm"
          >
            <Plus size={18} />
            New Assessment
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
        {/* Left Column: Overall Score + Trend Chart */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Overall Score Card */}
          <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  Active Cycle
                </span>
                <h3 className="font-headline-md text-headline-md mt-2">Assessment {current_year}</h3>
              </div>
              <span className={`px-3 py-1 font-bold rounded-full border text-label-md ${
                assessment_status === 'DRAFT'
                  ? 'bg-amber-100 text-amber-700 border-amber-200'
                  : 'bg-emerald-100 text-emerald-700 border-emerald-200'
              }`}>
                {assessment_status === 'DRAFT' ? 'In Progress' : assessment_status}
              </span>
            </div>

            <div className="mb-8 text-center py-6">
              <p className="text-on-surface-variant font-label-md uppercase tracking-widest mb-2">
                Current Total Score
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-extrabold text-on-surface tracking-tighter">
                  {formatNumber(overall_score, 0)}
                </span>
                <span className="text-on-surface-variant font-title-md">/ {formatNumber(max_overall_score, 0)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between text-label-md font-medium">
                <span>Global Target</span>
                <span className="text-primary">{scorePct.toFixed(1)}% Achieved</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  style={{ width: `${Math.min(scorePct, 100)}%` }}
                />
              </div>
            </div>

            {/* Comparison */}
            <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-6">
              <div>
                <p className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">
                  Previous Year ({current_year - 1})
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-title-lg text-on-surface">{formatNumber(previousYear?.score || 0, 0)}</span>
                  {yearOverYearGrowth > 0 && (
                    <span className="flex items-center text-[11px] text-primary font-bold">
                      <TrendingUp size={14} />
                      {yearOverYearGrowth.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider mb-1">
                  Estimated Rank
                </p>
                <p className="font-title-lg text-on-surface">
                  {estimated_rank ? `Top ${estimated_rank}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Trend Chart Card */}
          {(trend_history?.length ?? 0) > 0 && (
            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
              <h4 className="font-title-md mb-6">Historical Performance Trend</h4>
              <div className="h-64 w-full">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Category Grid + Report Card */}
        <div className="xl:col-span-6 flex flex-col gap-6">
          {/* Category Grid (2x3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category_breakdown.map((cat) => {
              const pct = cat.max_points > 0 ? (cat.earned_points / cat.max_points) * 100 : 0;
              const status = getStatusBadge(pct);
              const config = categoryConfig[cat.category_code] || categoryConfig.SI;

              return (
                <div
                  key={cat.category_code}
                  className="bg-white border border-outline-variant rounded-xl p-5 hover:border-primary/40 transition-all flex flex-col cursor-pointer"
                  onClick={() => router.push(`/categories/${cat.category_code.toLowerCase()}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 ${config.bgColor} ${config.iconColor} rounded-lg`}>
                      {config.icon}
                    </div>
                    <span className={`${status.color} text-[10px] px-2 py-0.5 rounded-full font-bold`}>
                      {status.label}
                    </span>
                  </div>

                  <h5 className="font-title-md text-on-surface leading-tight mb-1">
                    {cat.category_name}
                  </h5>
                  <p className="text-on-surface-variant font-label-md mb-4 text-[11px]">
                    {cat.category_code}
                  </p>

                  <div className="mt-auto">
                    <div className="flex justify-between text-[11px] font-bold mb-1">
                      <span>
                        {formatNumber(cat.earned_points, 0)} / {formatNumber(cat.max_points, 0)}
                      </span>
                      <span>{pct.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <button
                      className={`w-full py-2 text-[12px] font-bold rounded-lg transition-colors ${
                        pct >= 100
                          ? 'bg-slate-50 border border-slate-200 text-on-surface hover:bg-slate-100'
                          : 'bg-primary text-white hover:brightness-110 shadow-sm'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/categories/${cat.category_code.toLowerCase()}`);
                      }}
                    >
                      {pct >= 100 ? 'Review Entry' : 'Continue'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wide Report Card */}
          <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Recent Activity */}
              <div className="col-span-2 p-6 border-r border-outline-variant">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-title-md">Recent Evidence Uploads</h4>
                  <a href="#" className="text-primary font-label-md hover:underline text-sm">
                    View All
                  </a>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText size={18} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-body-md font-medium text-on-surface">Campus_Tree_Inventory_2024.pdf</p>
                      <p className="text-[11px] text-on-surface-variant">Uploaded 2 hours ago</p>
                    </div>
                    <button className="p-1.5 text-on-surface-variant hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText size={18} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-body-md font-medium text-on-surface">Solar_Panel_Array_West.jpg</p>
                      <p className="text-[11px] text-on-surface-variant">Uploaded 5 hours ago</p>
                    </div>
                    <button className="p-1.5 text-on-surface-variant hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText size={18} className="text-primary shrink-0" />
                    <div className="flex-1">
                      <p className="text-body-md font-medium text-on-surface">Water_Recycle_System_Data.xlsx</p>
                      <p className="text-[11px] text-on-surface-variant">Uploaded yesterday</p>
                    </div>
                    <button className="p-1.5 text-on-surface-variant hover:text-primary">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Deadlines and Report */}
              <div className="p-6 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-600 mb-4">
                    <Timer size={20} />
                    <span className="font-bold text-[13px] uppercase tracking-wider">Submission Deadline</span>
                  </div>
                  <div className="mb-6">
                    <p className="text-2xl font-extrabold text-on-surface">Oct 31, {current_year}</p>
                    <p className="text-[12px] text-on-surface-variant mt-1">
                      45 days remaining to finalize your self-assessment entries.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                    <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-2">
                      Live Progress Report
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold">{scorePct.toFixed(0)}% Draft</span>
                      <Download size={20} />
                    </div>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors backdrop-blur-md border border-white/20 text-sm">
                      Download Full PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
