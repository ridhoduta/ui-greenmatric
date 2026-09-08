'use client';

import type { CategoryCode, Role } from '@/types';
import type { CategoryConfig } from '@/config/categories';

const ROLE_LABELS: Partial<Record<Role, string>> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN_KAMPUS: 'Admin Kampus',
  OPERATOR_SI: 'Operator SI',
  OPERATOR_EC: 'Operator EC',
  OPERATOR_WS: 'Operator WS',
  OPERATOR_WR: 'Operator WR',
  OPERATOR_TR: 'Operator TR',
  OPERATOR_ED: 'Operator ED',
  OPERATOR_GD: 'Operator GD',
};

const CATEGORY_ICON_COLOR: Record<CategoryCode, { bg: string; text: string; bar: string }> = {
  SI: { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  EC: { bg: 'bg-blue-50',    text: 'text-blue-700',    bar: 'bg-blue-500'    },
  WS: { bg: 'bg-orange-50',  text: 'text-orange-700',  bar: 'bg-orange-500'  },
  WR: { bg: 'bg-cyan-50',    text: 'text-cyan-700',    bar: 'bg-cyan-500'    },
  TR: { bg: 'bg-purple-50',  text: 'text-purple-700',  bar: 'bg-purple-500'  },
  ED: { bg: 'bg-rose-50',    text: 'text-rose-700',    bar: 'bg-rose-500'    },
  GD: { bg: 'bg-indigo-50',  text: 'text-indigo-700',  bar: 'bg-indigo-500'  },
};

interface CategoryPageShellProps {
  config: CategoryConfig;
  role: Role;
  earnedPoints?: number;
  children: React.ReactNode;
}

export function CategoryPageShell({
  config,
  role,
  earnedPoints = 0,
  children,
}: CategoryPageShellProps) {
  const colors = CATEGORY_ICON_COLOR[config.code];
  const pct = config.max_points > 0 ? Math.min((earnedPoints / config.max_points) * 100, 100) : 0;
  const isOperator = role.startsWith('OPERATOR_');
  const isSuperAdmin = role === "SUPER_ADMIN";

  if (isSuperAdmin) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 lg:p-8">
        {children}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 lg:p-8">
      {/* Compact Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-lg font-extrabold text-xs ${colors.bg} ${colors.text}`}>
              {config.code}
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface leading-tight">
                {config.name}
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {config.description}
              </p>
            </div>
          </div>

          <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
            isOperator
              ? 'bg-primary/10 text-primary'
              : 'bg-slate-100 text-slate-600'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isOperator ? 'bg-primary' : 'bg-slate-400'}`} />
            {isOperator ? 'Mode Input' : 'Mode Monitoring'}
            <span className="opacity-60">·</span>
            {ROLE_LABELS[role] ?? role}
          </span>
        </div>

        {/* Compact Progress Bar */}
        <div className="mt-4 p-3 bg-white rounded-lg border border-outline-variant shadow-sm">
          <div className="flex items-center justify-between mb-1.5 text-xs font-medium">
            <span className="text-on-surface-variant">Poin Terkumpul</span>
            <span className={`font-bold ${colors.text}`}>
              {earnedPoints.toLocaleString('id-ID')} / {config.max_points.toLocaleString('id-ID')} poin
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-on-surface-variant">
            <span>{pct.toFixed(1)}% tercapai</span>
            <span>{config.weight_percentage}% bobot total</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
