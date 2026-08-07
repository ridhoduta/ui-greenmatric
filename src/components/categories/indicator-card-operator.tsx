'use client';

import { useState } from 'react';
import type { Indicator, CategoryCode } from '@/types';
import { useSaveAnswer } from '@/hooks/use-assessments';
import { useToast } from '@/contexts/toast-context';

interface IndicatorCardOperatorProps {
  indicator: Indicator;
  categoryCode: CategoryCode;
  assessmentYear: number;
}

export function IndicatorCardOperator({
  indicator,
  categoryCode,
  assessmentYear,
}: IndicatorCardOperatorProps) {
  const { mutateAsync: saveAnswer, isPending } = useSaveAnswer(categoryCode);
  const { showToast } = useToast();

  // Build initial form state from existing answer or empty
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const existing = indicator.answer?.raw_input_data ?? {};
    const initial: Record<string, string> = {};
    for (const field of indicator.fields ?? []) {
      const val = existing[field.key];
      initial[field.key] = val !== undefined && val !== null ? String(val) : '';
    }
    return initial;
  });

  const [isDirty, setIsDirty] = useState(false);

  function handleFieldChange(key: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }

  async function handleSave() {
    const raw_input_data: Record<string, unknown> = {};

    for (const field of indicator.fields ?? []) {
      const val = fieldValues[field.key];
      if (val === '') {
        raw_input_data[field.key] = null;
      } else if (field.type === 'int' || field.type === 'float') {
        raw_input_data[field.key] = parseFloat(val);
      } else {
        raw_input_data[field.key] = val;
      }
    }

    try {
      await saveAnswer({
        indicator_code: indicator.code,
        assessment_year: assessmentYear,
        raw_input_data,
      });
      showToast('success', `Indikator ${indicator.code} berhasil disimpan.`);
      setIsDirty(false);
    } catch {
      showToast('error', `Gagal menyimpan indikator ${indicator.code}. Silakan coba lagi.`);
    }
  }

  const earnedPoints = indicator.answer?.earned_points ?? 0;
  const hasAnswer = indicator.answer != null;

  return (
    <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {indicator.code}
            </span>
            {hasAnswer && !isDirty && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ✓ Tersimpan
              </span>
            )}
            {isDirty && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                ● Belum disimpan
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-on-surface leading-snug">
            {indicator.title}
          </h4>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-on-surface-variant">Maks. poin</p>
          <p className="text-sm font-bold text-on-surface">{indicator.max_points}</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3 mb-4">
        {(indicator.fields ?? []).map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <label
              htmlFor={`${indicator.code}-${field.key}`}
              className="text-xs font-medium text-on-surface-variant"
            >
              {field.label}
              {field.unit && (
                <span className="ml-1 text-on-surface-variant/60">({field.unit})</span>
              )}
            </label>
            {field.type === 'choice' ? (
              <select
                id={`${indicator.code}-${field.key}`}
                value={fieldValues[field.key] ?? ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                disabled={isPending}
                required={field.required}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50"
              >
                <option value="" disabled>Pilih opsi...</option>
                {(indicator.tiers ?? []).map((tier) => (
                  <option key={tier.id} value={tier.option_label}>
                    {tier.option_label}
                  </option>
                ))}
              </select>
            ) : field.type === 'date' ? (
              <input
                id={`${indicator.code}-${field.key}`}
                type="date"
                required={field.required}
                value={fieldValues[field.key] ?? ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                disabled={isPending}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50"
              />
            ) : field.type === 'varchar' ? (
              <input
                id={`${indicator.code}-${field.key}`}
                type="text"
                required={field.required}
                placeholder="Masukkan teks..."
                value={fieldValues[field.key] ?? ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                disabled={isPending}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 placeholder:text-muted-foreground"
              />
            ) : (
              <input
                id={`${indicator.code}-${field.key}`}
                type="number"
                step="any"
                min="0"
                required={field.required}
                placeholder="Masukkan nilai..."
                value={fieldValues[field.key] ?? ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                disabled={isPending}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 placeholder:text-muted-foreground"
              />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-outline-variant pt-3">
        {hasAnswer ? (
          <span className="text-xs text-on-surface-variant">
            Poin diperoleh:{' '}
            <span className="font-bold text-on-surface">{earnedPoints}</span>
          </span>
        ) : (
          <span className="text-xs text-on-surface-variant/60">Belum ada data</span>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending || !isDirty}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Menyimpan...
            </>
          ) : (
            'Simpan'
          )}
        </button>
      </div>
    </div>
  );
}
