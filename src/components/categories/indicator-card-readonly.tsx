'use client';

import type { Indicator } from '@/types';
import { formatFileUrl } from '@/lib/utils/constants';
import { Paperclip, ExternalLink } from 'lucide-react';

interface IndicatorCardReadonlyProps {
  indicator: Indicator;
}

export function IndicatorCardReadonly({ indicator }: IndicatorCardReadonlyProps) {
  const earnedPoints = indicator.answer?.earned_points ?? 0;
  const hasAnswer = indicator.answer != null;
  const pct = indicator.max_points > 0 ? (earnedPoints / indicator.max_points) * 100 : 0;
  const evidences = indicator.answer?.evidences ?? [];

  const statusColor = hasAnswer
    ? pct >= 80
      ? 'text-emerald-600 bg-emerald-50'
      : pct >= 40
      ? 'text-amber-600 bg-amber-50'
      : 'text-red-600 bg-red-50'
    : 'text-slate-500 bg-slate-100';

  const statusLabel = hasAnswer
    ? pct >= 80 ? 'Baik' : pct >= 40 ? 'Cukup' : 'Kurang'
    : 'Kosong';

  return (
    <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              {indicator.code}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${statusColor}`}>
              {statusLabel}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-on-surface leading-snug truncate">
            {indicator.title}
          </h4>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-on-surface">{earnedPoints}</p>
          <p className="text-[10px] text-on-surface-variant">/ {indicator.max_points} poin</p>
        </div>
      </div>

      {/* Progress mini-bar */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 80 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-400' : hasAnswer ? 'bg-red-400' : 'bg-slate-200'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Data preview */}
      {hasAnswer && indicator.answer?.raw_input_data && (
        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
            Data Input
          </p>
          <div className="space-y-0.5">
            {(indicator.fields ?? []).map((field) => {
              const val = indicator.answer?.raw_input_data[field.key];
              return (
                <div key={field.key} className="flex justify-between text-[11px]">
                  <span className="text-on-surface-variant truncate mr-2">{field.label}</span>
                  <span className="font-mono font-medium text-on-surface shrink-0">
                    {val !== null && val !== undefined
                      ? field.type === 'choice'
                        ? String(val)
                        : `${(field.type === 'int' || field.type === 'float') ? Number(val).toLocaleString('id-ID') : val}${field.unit ? ` ${field.unit}` : ''}`
                      : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Evidences preview */}
      {hasAnswer && evidences.length > 0 && (
        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-100 p-2">
          <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mb-1 flex items-center gap-1">
            <Paperclip className="h-2.5 w-2.5 text-primary" />
            Bukti ({evidences.length})
          </p>
          <div className="space-y-1">
            {evidences.map((ev) => (
              <a
                key={ev.id}
                href={formatFileUrl(ev.file_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-1.5 p-1 rounded bg-white border border-slate-200/70 hover:border-primary/50 text-[11px] text-on-surface hover:text-primary transition-colors shadow-2xs"
              >
                <span className="truncate font-medium">{ev.document_name}</span>
                <ExternalLink className="h-2.5 w-2.5 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {!hasAnswer && (
        <p className="text-[11px] text-on-surface-variant/60 italic mt-1">
          Belum ada data dari operator.
        </p>
      )}
    </div>
  );
}
