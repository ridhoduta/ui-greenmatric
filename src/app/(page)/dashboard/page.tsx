'use client';
import { useDashboard } from '@/hooks/use-dashboard';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/lib/utils/format';
import { CATEGORIES } from '@/config/categories';
import type { CategoryCode } from '@/types';
import {
  Building2, Car, GraduationCap, ShieldCheck, Zap, Trash2, Droplets, LayoutGrid, ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { ApiError } from '@/lib/api/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CATEGORY_UI_CONFIG: Record<
  CategoryCode,
  { icon: React.ReactNode; bgColor: string; iconColor: string; barColor: string; chartColor: string }
> = {
  SI: { icon: <Building2 size={24} />, bgColor: 'bg-emerald-50 text-emerald-700', iconColor: 'text-emerald-700', barColor: 'bg-emerald-500', chartColor: '#10b981' },
  EC: { icon: <Zap size={24} />, bgColor: 'bg-blue-50 text-blue-700', iconColor: 'text-blue-700', barColor: 'bg-blue-500', chartColor: '#3b82f6' },
  WS: { icon: <Trash2 size={24} />, bgColor: 'bg-orange-50 text-orange-700', iconColor: 'text-orange-700', barColor: 'bg-orange-500', chartColor: '#f97316' },
  WR: { icon: <Droplets size={24} />, bgColor: 'bg-cyan-50 text-cyan-700', iconColor: 'text-cyan-700', barColor: 'bg-cyan-500', chartColor: '#06b6d4' },
  TR: { icon: <Car size={24} />, bgColor: 'bg-purple-50 text-purple-700', iconColor: 'text-purple-700', barColor: 'bg-purple-500', chartColor: '#a855f7' },
  ED: { icon: <GraduationCap size={24} />, bgColor: 'bg-rose-50 text-rose-700', iconColor: 'text-rose-700', barColor: 'bg-rose-500', chartColor: '#f43f5e' },
  GD: { icon: <ShieldCheck size={24} />, bgColor: 'bg-indigo-50 text-indigo-700', iconColor: 'text-indigo-700', barColor: 'bg-indigo-500', chartColor: '#6366f1' },
};

function ScoreCircle({ score, maxScore }: { score: number; maxScore: number }) {
  const pct = maxScore > 0 ? Math.min((score / maxScore) * 100, 100) : 0;
  const radius = 54;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        <circle
          stroke="#e2e8f0"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#059669"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.8s ease-out' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-emerald-700">{pct.toFixed(0)}%</span>
        <span className="text-[10px] font-medium text-muted-foreground">Total Skor</span>
      </div>
    </div>
  );
}

function CategoryBarChart({ breakdown }: { breakdown: { category_code: CategoryCode; earned_points: number; max_points: number }[] }) {
  const labels = breakdown.map((b) => b.category_code);
  const earned = breakdown.map((b) => b.earned_points);
  const max = breakdown.map((b) => b.max_points);
  const colors = breakdown.map((b) => CATEGORY_UI_CONFIG[b.category_code]?.chartColor ?? '#94a3b8');

  const data = {
    labels,
    datasets: [
      {
        label: 'Poin Diraih',
        data: earned,
        backgroundColor: colors,
        borderRadius: 6,
        barThickness: 28,
      },
      {
        label: 'Maksimal',
        data: max,
        backgroundColor: colors.map((c) => c + '20'),
        borderRadius: 6,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: 'bold' as const } },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9' },
        ticks: { font: { size: 10 } },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: dashboardData, isLoading, error, refetch } = useDashboard();
  const router = useRouter();

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

  if (!dashboardData || !user) return null;

  const {
    campus_name,
    overall_score,
    max_overall_score,
    category_breakdown,
  } = dashboardData;

  const breakdown = category_breakdown ?? [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
            <LayoutGrid size={16} />
            <span>Dashboard {campus_name}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Dashboard {campus_name}</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Lihat Progres dan Pantau Kinerja Keberlanjutan Kampus Anda.
          </p>
        </div>
      </div>

      {/* Top Stats: Score Circle + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Score Circle */}
        <div className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider">Skor Keseluruhan</h3>
          <ScoreCircle score={overall_score} maxScore={max_overall_score} />
          <div className="mt-4 text-center">
            <p className="text-lg font-extrabold text-on-surface">
              {formatNumber(overall_score, 0)} <span className="text-sm font-normal text-muted-foreground">/ {formatNumber(max_overall_score, 0)}</span>
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-outline-variant rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-on-surface mb-4 uppercase tracking-wider">Breakdown Skor per Kategori</h3>
          <CategoryBarChart breakdown={breakdown} />
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col cursor-pointer group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${ui.bgColor} transition-colors group-hover:scale-105 duration-300`}>
                  {ui.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  pct >= 100
                    ? 'bg-emerald-100 text-emerald-700'
                    : pct > 0
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {pct >= 100 ? 'Selesai' : pct > 0 ? 'Progres' : 'Belum Mulai'}
                </span>
              </div>

              <div className="flex-1 mb-6">
                <h3 className="text-lg font-bold text-on-surface leading-snug mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-widest block mb-3">
                  KODE: {category.code} · BOBOT: {category.weight_percentage}%
                </span>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex justify-between text-xs font-bold text-on-surface">
                  <span>{formatNumber(earned, 0)} / {formatNumber(max, 0)} Poin</span>
                  <span className={ui.iconColor}>{pct.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${ui.barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">
                    {canEdit ? 'Akses: Edit & Pantau' : 'Akses: Pantau Saja'}
                  </span>
                  <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {canEdit ? 'Mulai Pengisian' : 'Lihat Detail'}
                    <ArrowRight size={14} />
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
