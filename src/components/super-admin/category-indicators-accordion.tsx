'use client';

import { useState } from 'react';
import {
  Building2, Zap, Trash2, Droplets, Car, GraduationCap, ShieldCheck,
  ChevronDown, Calculator, ListOrdered
} from 'lucide-react';
import type { CategoryCode, Indicator } from '@/types';
import { CATEGORIES } from '@/config/categories';

const CATEGORY_UI_CONFIG: Record<
  CategoryCode,
  { icon: React.ReactNode; bgColor: string; textColor: string; badgeBg: string }
> = {
  SI: { icon: <Building2 size={18} />, bgColor: 'bg-emerald-50', textColor: 'text-emerald-700', badgeBg: 'bg-emerald-100 text-emerald-800' },
  EC: { icon: <Zap size={18} />, bgColor: 'bg-blue-50', textColor: 'text-blue-700', badgeBg: 'bg-blue-100 text-blue-800' },
  WS: { icon: <Trash2 size={18} />, bgColor: 'bg-orange-50', textColor: 'text-orange-700', badgeBg: 'bg-orange-100 text-orange-800' },
  WR: { icon: <Droplets size={18} />, bgColor: 'bg-cyan-50', textColor: 'text-cyan-700', badgeBg: 'bg-cyan-100 text-cyan-800' },
  TR: { icon: <Car size={18} />, bgColor: 'bg-purple-50', textColor: 'text-purple-700', badgeBg: 'bg-purple-100 text-purple-800' },
  ED: { icon: <GraduationCap size={18} />, bgColor: 'bg-rose-50', textColor: 'text-rose-700', badgeBg: 'bg-rose-100 text-rose-800' },
  GD: { icon: <ShieldCheck size={18} />, bgColor: 'bg-indigo-50', textColor: 'text-indigo-700', badgeBg: 'bg-indigo-100 text-indigo-800' },
};

export interface CategoryIndicatorsAccordionProps {
  categoryIndicators: Record<CategoryCode, Indicator[]>;
}

interface CategoryCardProps {
  code: CategoryCode;
  indicators: Indicator[];
  isExpanded: boolean;
  onToggle: () => void;
}

function CategoryCard({ code, indicators, isExpanded, onToggle }: CategoryCardProps) {
  const ui = CATEGORY_UI_CONFIG[code];
  const cat = CATEGORIES.find((c) => c.code === code);
  const numericCount = indicators.filter((i) => i.input_type === 'NUMERIC_FORMULA').length;
  const choiceCount = indicators.filter((i) => i.input_type === 'SINGLE_CHOICE').length;

  return (
    <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
      {/* Header — Always Visible */}
      <button
        type="button"
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-slate-50/60 ${
          isExpanded ? 'border-b border-outline-variant' : ''
        }`}
        aria-expanded={isExpanded}
        aria-controls={`accordion-body-${code}`}
        id={`accordion-header-${code}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${ui.bgColor} ${ui.textColor} shrink-0`}>
            {ui.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${ui.badgeBg} uppercase`}>
                {code}
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                {cat?.weight_percentage ?? 0}% bobot
              </span>
            </div>
            <p className="font-bold text-sm text-on-surface mt-0.5 truncate">{cat?.name ?? code}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${ui.badgeBg}`}>
            {indicators.length} Indikator
          </span>
          <ChevronDown
            size={16}
            className={`text-on-surface-variant transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expandable body */}
      <div
        id={`accordion-body-${code}`}
        role="region"
        aria-labelledby={`accordion-header-${code}`}
        style={{ maxHeight: isExpanded ? `${indicators.length * 60 + 80}px` : '0px' }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        {/* Sub-stats bar */}
        <div className="flex gap-4 px-4 py-2 bg-slate-50/80 border-b border-slate-100 text-[11px] font-semibold text-on-surface-variant">
          <span className="flex items-center gap-1">
            <Calculator size={12} className="text-blue-500" />
            {numericCount} Numerik
          </span>
          <span className="flex items-center gap-1">
            <ListOrdered size={12} className="text-purple-500" />
            {choiceCount} Pilihan
          </span>
          <span className="flex items-center gap-1 ml-auto">
            Maks. {cat?.max_points?.toLocaleString('id-ID') ?? 0} Poin
          </span>
        </div>

        {/* Indicator list */}
        <ul className="divide-y divide-slate-50">
          {indicators.length === 0 ? (
            <li className="px-4 py-6 text-center text-xs text-muted-foreground italic">
              Belum ada indikator untuk kategori ini.
            </li>
          ) : (
            indicators.map((indicator) => (
              <li key={indicator.id} className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className={`mt-0.5 shrink-0 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${ui.badgeBg}`}>
                    {indicator.code}
                  </span>
                  <p className="text-xs text-on-surface leading-snug">{indicator.title}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    indicator.input_type === 'NUMERIC_FORMULA'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-purple-50 text-purple-700'
                  }`}>
                    {indicator.input_type === 'NUMERIC_FORMULA' ? 'Numerik' : 'Pilihan'}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant font-mono">
                    {indicator.max_points}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export function CategoryIndicatorsAccordion({ categoryIndicators }: CategoryIndicatorsAccordionProps) {
  const [expandedCodes, setExpandedCodes] = useState<Set<CategoryCode>>(new Set());

  function toggleCategory(code: CategoryCode) {
    setExpandedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  }

  const allCodes = CATEGORIES.map((c) => c.code) as CategoryCode[];
  const allExpanded = allCodes.length > 0 && allCodes.every((c) => expandedCodes.has(c));

  function toggleAll() {
    if (allExpanded) {
      setExpandedCodes(new Set());
    } else {
      setExpandedCodes(new Set(allCodes));
    }
  }

  return (
    <div>
      {/* Section header with toggle-all */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
          Indikator per Kategori
        </h3>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs text-primary font-semibold hover:underline transition-colors"
        >
          {allExpanded ? 'Tutup Semua' : 'Buka Semua'}
        </button>
      </div>

      {/* Accordion cards stacked */}
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const indicators = categoryIndicators[cat.code] ?? [];
          return (
            <CategoryCard
              key={cat.code}
              code={cat.code}
              indicators={indicators}
              isExpanded={expandedCodes.has(cat.code)}
              onToggle={() => toggleCategory(cat.code)}
            />
          );
        })}
      </div>
    </div>
  );
}
