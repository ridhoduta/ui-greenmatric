'use client';

import { useState, useEffect, useRef } from 'react';
import type { Indicator, CategoryCode } from '@/types';
import { useSaveAnswer } from '@/hooks/use-assessments';
import { useEvidenceMutations } from '@/hooks/use-evidences';
import { useToast } from '@/contexts/toast-context';
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES, formatFileUrl } from '@/lib/utils/constants';
import {
  FileText,
  FileImage,
  Paperclip,
  Upload,
  Trash2,
  ExternalLink,
  Plus,
  X,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface IndicatorCardOperatorProps {
  indicator: Indicator;
  categoryCode: CategoryCode;
  assessmentYear: number;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') {
    return <FileText className="h-4 w-4 text-red-500 shrink-0" />;
  }
  if (['jpg', 'jpeg', 'png'].includes(ext || '')) {
    return <FileImage className="h-4 w-4 text-blue-500 shrink-0" />;
  }
  return <Paperclip className="h-4 w-4 text-slate-500 shrink-0" />;
}

function parseRawInputData(raw: unknown): Record<string, unknown> {
  if (!raw) return {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  if (typeof raw === 'object') {
    return raw as Record<string, unknown>;
  }
  return {};
}

export function IndicatorCardOperator({
  indicator,
  categoryCode,
  assessmentYear,
}: IndicatorCardOperatorProps) {
  const { mutateAsync: saveAnswer, isPending: isSaving } = useSaveAnswer(categoryCode);
  const { uploadEvidence, isUploading, deleteEvidence } = useEvidenceMutations(categoryCode);
  const { showToast } = useToast();

  // Field values state
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const existing = parseRawInputData(indicator.answer?.raw_input_data);
    const initial: Record<string, string> = {};
    for (const field of indicator.fields ?? []) {
      const val = existing[field.key];
      initial[field.key] = val !== undefined && val !== null ? String(val) : '';
    }
    return initial;
  });

  const [isDirty, setIsDirty] = useState(false);

  // Sync field values when indicator prop changes and user hasn't edited
  useEffect(() => {
    if (!isDirty) {
      const existing = parseRawInputData(indicator.answer?.raw_input_data);
      const initial: Record<string, string> = {};
      for (const field of indicator.fields ?? []) {
        const val = existing[field.key];
        initial[field.key] = val !== undefined && val !== null ? String(val) : '';
      }
      setFieldValues(initial);
    }
  }, [indicator.answer, indicator.fields, isDirty]);

  // Evidence UI states
  const [isEvidenceSectionOpen, setIsEvidenceSectionOpen] = useState(true);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docName, setDocName] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate size (max 2MB)
    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`Ukuran file (${formatFileSize(file.size)}) melebihi batas maksimal 2MB.`);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate type (PDF, JPG, JPEG, PNG)
    const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidType = ALLOWED_FILE_TYPES.includes(file.type) || validExtensions.includes(fileExt);

    if (!isValidType) {
      setUploadError('Format file tidak didukung. Gunakan PDF, JPG, atau PNG.');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setSelectedFile(file);
    if (!docName.trim()) {
      setDocName(file.name);
    }
  }

  async function handleUploadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!indicator.answer?.id) {
      showToast('error', 'Silakan simpan jawaban indikator terlebih dahulu sebelum mengunggah bukti.');
      return;
    }

    if (!selectedFile) {
      setUploadError('Silakan pilih file bukti fisik terlebih dahulu.');
      return;
    }

    try {
      await uploadEvidence({
        assessment_answer_id: indicator.answer.id,
        file: selectedFile,
        document_name: docName.trim() || selectedFile.name,
        description: docDescription.trim() || undefined,
      });

      showToast('success', `Dokumen bukti "${docName.trim() || selectedFile.name}" berhasil diunggah.`);
      // Reset form
      setSelectedFile(null);
      setDocName('');
      setDocDescription('');
      setUploadError(null);
      setIsUploadFormOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch {
      showToast('error', 'Gagal mengunggah dokumen bukti. Silakan coba lagi.');
    }
  }

  async function handleDeleteEvidence(evidenceId: number, name: string) {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus bukti "${name}"?`)) {
      return;
    }

    try {
      setDeletingId(evidenceId);
      await deleteEvidence(evidenceId);
      showToast('success', `Dokumen bukti "${name}" berhasil dihapus.`);
    } catch {
      showToast('error', `Gagal menghapus bukti "${name}". Silakan coba lagi.`);
    } finally {
      setDeletingId(null);
    }
  }

  const earnedPoints = indicator.answer?.earned_points ?? 0;
  const hasAnswer = indicator.answer != null && indicator.answer.id !== undefined;
  const evidences = indicator.answer?.evidences ?? [];

  return (
    <div className="bg-white border border-outline-variant rounded-xl p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              {indicator.code}
            </span>
            {hasAnswer && !isDirty && (
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                Tersimpan
              </span>
            )}
            {isDirty && (
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                Belum disimpan
              </span>
            )}
            {indicator.answer?.calculated_value !== null && indicator.answer?.calculated_value !== undefined && (
              <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                Nilai: {indicator.answer.calculated_value}
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold text-on-surface leading-snug truncate">
            {indicator.title}
          </h4>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] text-on-surface-variant">Maks</p>
          <p className="text-sm font-bold text-on-surface">{indicator.max_points}</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-2.5 mb-3">
        {(indicator.fields ?? []).map((field) => (
          <div key={field.key} className="flex flex-col gap-0.5">
            <label
              htmlFor={`${indicator.code}-${field.key}`}
              className="text-[11px] font-medium text-on-surface-variant"
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
                disabled={isSaving}
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
                disabled={isSaving}
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
                disabled={isSaving}
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
                disabled={isSaving}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 placeholder:text-muted-foreground"
              />
            )}
          </div>
        ))}
      </div>

      {/* Answer Action Footer */}
      <div className="flex items-center justify-between border-t border-outline-variant pt-2.5 mb-3">
        {hasAnswer ? (
          <span className="text-[11px] text-on-surface-variant">
            Poin: <span className="font-bold text-on-surface">{earnedPoints}</span>
          </span>
        ) : (
          <span className="text-[11px] text-on-surface-variant/60">Belum ada jawaban</span>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-semibold text-white transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Menyimpan...
            </>
          ) : (
            'Simpan'
          )}
        </button>
      </div>

      {/* Evidence Section */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsEvidenceSectionOpen((prev) => !prev)}
            className="flex items-center gap-1.5 text-[11px] font-bold text-on-surface hover:text-primary transition-colors"
          >
            <Paperclip className="h-3 w-3 text-primary" />
            <span>Bukti Dokumen</span>
            <span className="rounded-full bg-slate-200/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-700">
              {evidences.length}
            </span>
            {isEvidenceSectionOpen ? (
              <ChevronUp className="h-3 w-3 text-slate-400" />
            ) : (
              <ChevronDown className="h-3 w-3 text-slate-400" />
            )}
          </button>

          {hasAnswer && (
            <button
              type="button"
              onClick={() => {
                setIsEvidenceSectionOpen(true);
                setIsUploadFormOpen((prev) => !prev);
              }}
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-primary hover:underline"
            >
              {isUploadFormOpen ? (
                <>
                  <X className="h-3 w-3" />
                  Tutup
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3" />
                  Unggah
                </>
              )}
            </button>
          )}
        </div>

        {isEvidenceSectionOpen && (
          <div className="mt-2.5 space-y-2.5">
            {/* Warning if no answer saved yet */}
            {!hasAnswer && (
              <div className="flex items-center gap-1.5 rounded-md bg-amber-50 p-2 text-[11px] text-amber-800 border border-amber-200/60">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                <span>Simpan jawaban terlebih dahulu untuk mengunggah bukti.</span>
              </div>
            )}

            {/* Upload Form */}
            {hasAnswer && isUploadFormOpen && (
              <form
                onSubmit={handleUploadSubmit}
                className="rounded-lg border border-primary/20 bg-white p-3 shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h5 className="text-[11px] font-bold text-on-surface flex items-center gap-1">
                    <Upload className="h-3 w-3 text-primary" />
                    Unggah Bukti
                  </h5>
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadFormOpen(false);
                      setSelectedFile(null);
                      setUploadError(null);
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {uploadError && (
                  <div className="flex items-center gap-1.5 rounded-md bg-red-50 p-2 text-xs text-red-700 border border-red-200">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* File picker */}
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Pilih File <span className="text-red-500">*</span>
                    <span className="text-[11px] text-muted-foreground ml-1">(PDF, JPG, PNG — Maks. 2MB)</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer border border-input rounded-lg bg-slate-50 p-1"
                  />
                  {selectedFile && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">
                      ✓ File terpilih: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>

                {/* Document Name (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Nama Dokumen <span className="text-[11px] text-muted-foreground">(Opsional)</span>
                  </label>
                  <input
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Contoh: Peta Ruang Terbuka Hijau 2026"
                    disabled={isUploading}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 placeholder:text-muted-foreground"
                  />
                </div>

                {/* Description (Optional) */}
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">
                    Keterangan / Deskripsi <span className="text-[11px] text-muted-foreground">(Opsional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={docDescription}
                    onChange={(e) => setDocDescription(e.target.value)}
                    placeholder="Contoh: Dokumen lampiran master plan dan foto area hijau kampus"
                    disabled={isUploading}
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadFormOpen(false);
                      setSelectedFile(null);
                      setUploadError(null);
                    }}
                    disabled={isUploading}
                    className="rounded-lg border border-input px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading || !selectedFile}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1 text-xs font-semibold text-white transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-50 shadow-xs"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Mengunggah...
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3" />
                        Unggah Bukti
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Evidence List */}
            {evidences.length === 0 ? (
              <p className="text-xs text-on-surface-variant/60 italic py-1">
                Belum ada dokumen bukti fisik yang diunggah.
              </p>
            ) : (
              <div className="space-y-2">
                {evidences.map((evidence) => {
                  const isDeletingThis = deletingId === evidence.id;
                  const fileUrl = formatFileUrl(evidence.file_url);

                  return (
                    <div
                      key={evidence.id}
                      className="flex items-start justify-between gap-2.5 rounded-lg bg-white border border-slate-200/80 p-2.5 transition-all hover:border-slate-300 shadow-2xs"
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <div className="mt-0.5 p-1 rounded-md bg-slate-100">
                          {getFileIcon(evidence.document_name || evidence.file_url)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-on-surface hover:text-primary hover:underline truncate inline-flex items-center gap-1"
                              title="Buka dokumen bukti"
                            >
                              <span className="truncate">{evidence.document_name}</span>
                              <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                            </a>
                          </div>
                          {evidence.description && (
                            <p className="text-[11px] text-on-surface-variant mt-0.5 line-clamp-2">
                              {evidence.description}
                            </p>
                          )}
                          {evidence.created_at && (
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {new Date(evidence.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteEvidence(evidence.id, evidence.document_name)}
                        disabled={isDeletingThis}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors shrink-0 disabled:opacity-50"
                        title="Hapus dokumen bukti"
                      >
                        {isDeletingThis ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
