'use client';

import { useState } from 'react';
import type { Indicator, CategoryCode } from '@/types';
import { useToast } from '@/contexts/toast-context';
import { useUpdateIndicator, useDeleteIndicator, useCreateIndicator } from '@/hooks/use-categories';
import type { AdminIndicatorPayload } from '@/lib/api/categories';

interface IndicatorCardSuperAdminProps {
  indicator: Indicator;
  categoryCode: CategoryCode;
  onUpdate?: () => void;
  onDelete?: () => void;
}

type FieldType = 'int' | 'float' | 'date' | 'varchar' | 'choice';
type InputType = 'NUMERIC_FORMULA' | 'SINGLE_CHOICE';

interface FieldForm {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  unit?: string;
}

interface TierForm {
  option_label: string;
  point_multiplier: number;
}

export function IndicatorCardSuperAdmin({
  indicator,
  categoryCode,
  onUpdate,
  onDelete,
}: IndicatorCardSuperAdminProps) {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(indicator.id === 0);
  const { mutateAsync: updateIndicator, isPending: isUpdating } = useUpdateIndicator(categoryCode);
  const { mutateAsync: createIndicator, isPending: isCreating } = useCreateIndicator(categoryCode);
  const { mutateAsync: deleteIndicator, isPending: isDeleting } = useDeleteIndicator(categoryCode);
  const isSaving = isUpdating || isCreating;

  const CATEGORY_ID_MAP: Record<CategoryCode, number> = {
    SI: 1,
    EC: 2,
    WS: 3,
    WR: 4,
    TR: 5,
    ED: 6,
    GD: 7,
  };

  // Form state
  const [code, setCode] = useState(indicator.code);
  const [title, setTitle] = useState(indicator.title);
  const [inputType, setInputType] = useState<InputType>(indicator.input_type);
  const [maxPoints, setMaxPoints] = useState(indicator.max_points);
  const [fields, setFields] = useState<FieldForm[]>(
    (indicator.fields ?? []).map((f) => ({
      key: f.key,
      label: f.label,
      type: f.type,
      required: f.required,
      unit: f.unit,
    }))
  );
  const [tiers, setTiers] = useState<TierForm[]>(
    (indicator.tiers ?? []).map((t) => ({
      option_label: t.option_label,
      point_multiplier: t.point_multiplier,
    }))
  );

  // Handle field operations
  function addField() {
    setFields([
      ...fields,
      {
        key: '',
        label: '',
        type: 'int',
        required: true,
      },
    ]);
  }

  function removeField(index: number) {
    setFields(fields.filter((_, i) => i !== index));
  }

  function updateField(index: number, updates: Partial<FieldForm>) {
    setFields(fields.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  }

  // Handle tier operations
  function addTier() {
    setTiers([
      ...tiers,
      {
        option_label: '',
        point_multiplier: 0,
      },
    ]);
  }

  function removeTier(index: number) {
    setTiers(tiers.filter((_, i) => i !== index));
  }

  function updateTier(index: number, updates: Partial<TierForm>) {
    setTiers(tiers.map((t, i) => (i === index ? { ...t, ...updates } : t)));
  }

  // Handle save
  async function handleSave() {
    // Validation
    if (!code.trim()) {
      showToast('error', 'Kode indikator wajib diisi.');
      return;
    }
    if (!title.trim()) {
      showToast('error', 'Judul indikator wajib diisi.');
      return;
    }
    if (maxPoints <= 0) {
      showToast('error', 'Poin maksimal harus lebih dari 0.');
      return;
    }
    if (fields.length === 0) {
      showToast('error', 'Minimal harus ada 1 field.');
      return;
    }

    // Validate fields
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (!field.key.trim()) {
        showToast('error', `Field #${i + 1}: Key wajib diisi.`);
        return;
      }
      if (!field.label.trim()) {
        showToast('error', `Field #${i + 1}: Label wajib diisi.`);
        return;
      }
    }

    // Validate tiers for SINGLE_CHOICE
    if (inputType === 'SINGLE_CHOICE') {
      if (tiers.length === 0) {
        showToast('error', 'Minimal harus ada 1 pilihan untuk Single Choice.');
        return;
      }
      for (let i = 0; i < tiers.length; i++) {
        const tier = tiers[i];
        if (!tier.option_label.trim()) {
          showToast('error', `Pilihan #${i + 1}: Label wajib diisi.`);
          return;
        }
      }
    }

    try {
      const payload: AdminIndicatorPayload = {
        category_id: indicator.category_id || CATEGORY_ID_MAP[categoryCode],
        code: code.trim(),
        title: title.trim(),
        input_type: inputType,
        max_points: maxPoints,
        fields: fields.map((f) => ({
          key: f.key.trim(),
          label: f.label.trim(),
          type: f.type,
          required: f.required,
          ...(f.unit && { unit: f.unit.trim() }),
        })),
        ...(inputType === 'SINGLE_CHOICE' && {
          tiers: tiers.map((t) => ({
            option_label: t.option_label.trim(),
            point_multiplier: t.point_multiplier,
            operator: 'CHOICE',
            min_value: null,
            max_value: null,
          }))
        }),
      };

      if (indicator.id === 0) {
        await createIndicator(payload);
        showToast('success', `Indikator ${code} berhasil ditambahkan.`);
      } else {
        await updateIndicator({ id: indicator.id, payload });
        showToast('success', `Indikator ${code} berhasil diperbarui.`);
      }

      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      showToast(
        'error',
        error instanceof Error ? error.message : 'Gagal menyimpan indikator.'
      );
    }
  }

  // Handle delete
  async function handleDelete() {
    if (!confirm(`Yakin ingin menghapus indikator ${indicator.code}?`)) {
      return;
    }

    try {
      await deleteIndicator(indicator.id);

      showToast('success', `Indikator ${indicator.code} berhasil dihapus.`);
      onDelete?.();
    } catch (error) {
      showToast(
        'error',
        error instanceof Error ? error.message : 'Gagal menghapus indikator.'
      );
    }
  }

  function handleCancel() {
    if (indicator.id === 0) {
      onDelete?.();
      return;
    }
    setCode(indicator.code);
    setTitle(indicator.title);
    setInputType(indicator.input_type);
    setMaxPoints(indicator.max_points);
    setFields(
      (indicator.fields ?? []).map((f) => ({
        key: f.key,
        label: f.label,
        type: f.type,
        required: f.required,
        unit: f.unit,
      }))
    );
    setTiers(
      (indicator.tiers ?? []).map((t) => ({
        option_label: t.option_label,
        point_multiplier: t.point_multiplier,
      }))
    );
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="bg-white border-2 border-primary rounded-xl p-5 shadow-lg">
        {/* Edit Mode Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide">
            ✏️ Edit Indikator
          </h3>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors disabled:opacity-50"
          >
            Batal
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Code */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Kode Indikator <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSaving}
              placeholder="Contoh: SI9"
              className="w-full h-9 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">
              Judul / Pertanyaan <span className="text-red-500">*</span>
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
              rows={2}
              placeholder="Deskripsi lengkap indikator..."
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50 resize-none"
            />
          </div>

          {/* Input Type & Max Points */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Tipe Input <span className="text-red-500">*</span>
              </label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as InputType)}
                disabled={isSaving}
                className="w-full h-9 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50"
              >
                <option value="NUMERIC_FORMULA">Numeric Formula</option>
                <option value="SINGLE_CHOICE">Single Choice</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Poin Maksimal <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={maxPoints}
                onChange={(e) => setMaxPoints(parseInt(e.target.value) || 0)}
                disabled={isSaving}
                className="w-full h-9 rounded-lg border border-input bg-transparent px-3 text-sm transition-colors outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Fields Management */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-on-surface">
                Dynamic Fields <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={addField}
                disabled={isSaving}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                + Tambah Field
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600">
                      Field #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      disabled={isSaving || fields.length === 1}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-30"
                    >
                      Hapus
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="key (contoh: jumlah_kebun)"
                      value={field.key}
                      onChange={(e) => updateField(index, { key: e.target.value })}
                      disabled={isSaving}
                      className="h-8 rounded border border-slate-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                    />
                    <input
                      type="text"
                      placeholder="Label (contoh: Jumlah Kebun)"
                      value={field.label}
                      onChange={(e) => updateField(index, { label: e.target.value })}
                      disabled={isSaving}
                      className="h-8 rounded border border-slate-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(index, { type: e.target.value as FieldType })
                      }
                      disabled={isSaving}
                      className="h-8 rounded border border-slate-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                    >
                      <option value="int">Integer</option>
                      <option value="float">Float</option>
                      <option value="date">Date</option>
                      <option value="varchar">Text</option>
                      <option value="choice">Choice</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Unit (opsional)"
                      value={field.unit ?? ''}
                      onChange={(e) => updateField(index, { unit: e.target.value })}
                      disabled={isSaving}
                      className="h-8 rounded border border-slate-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                    />
                    <label className="flex items-center gap-1.5 px-2">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateField(index, { required: e.target.checked })
                        }
                        disabled={isSaving}
                        className="w-3.5 h-3.5"
                      />
                      <span className="text-xs text-slate-700">Required</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tiers Management (for SINGLE_CHOICE) */}
          {inputType === 'SINGLE_CHOICE' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-on-surface">
                  Pilihan (Options) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addTier}
                  disabled={isSaving}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                >
                  + Tambah Pilihan
                </button>
              </div>

              <div className="space-y-3">
                {tiers.map((tier, index) => (
                  <div
                    key={index}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-700">
                        Pilihan #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTier(index)}
                        disabled={isSaving || tiers.length === 1}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-30"
                      >
                        Hapus
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Label pilihan (contoh: Tidak ada)"
                          value={tier.option_label}
                          onChange={(e) => updateTier(index, { option_label: e.target.value })}
                          disabled={isSaving}
                          className="w-full h-8 rounded border border-blue-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          placeholder="Point multiplier (0-1)"
                          value={tier.point_multiplier}
                          onChange={(e) => updateTier(index, { point_multiplier: parseFloat(e.target.value) || 0 })}
                          disabled={isSaving}
                          className="w-full h-8 rounded border border-blue-300 bg-white px-2 text-xs outline-none focus:border-primary disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-outline-variant">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 text-xs font-semibold text-on-surface bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Menyimpan...
              </>
            ) : (
              '💾 Simpan Perubahan'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Display Mode
  return (
    <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm transition-shadow hover:shadow-md group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {indicator.code}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {indicator.input_type === 'NUMERIC_FORMULA' ? 'Formula' : 'Choice'}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-on-surface leading-snug">
            {indicator.title}
          </h4>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs text-on-surface-variant">Maks. poin</p>
          <p className="text-lg font-bold text-on-surface">{indicator.max_points}</p>
        </div>
      </div>

      {/* Fields Preview */}
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Dynamic Fields ({(indicator.fields ?? []).length})
        </p>
        <div className="space-y-1.5">
          {(indicator.fields ?? []).map((field) => (
            <div
              key={field.id}
              className="flex items-center justify-between text-xs bg-slate-50 border border-slate-100 rounded px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-600 font-medium">
                  {field.key}
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-on-surface">{field.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                  {field.type}
                </span>
                {field.required && (
                  <span className="text-[10px] font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    Required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-outline-variant opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <svg
                className="animate-spin h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Menghapus...
            </>
          ) : (
            '🗑️ Hapus'
          )}
        </button>
      </div>
    </div>
  );
}
