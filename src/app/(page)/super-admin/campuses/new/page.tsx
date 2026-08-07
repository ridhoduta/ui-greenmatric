'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCampusMutations } from '@/hooks/use-campuses';
import type { CreateCampusPayload } from '@/lib/api/campuses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const INSTITUTION_TYPE_OPTIONS = [
  { value: 'university', label: 'University' },
  { value: 'institute', label: 'Institute' },
  { value: 'polytechnic', label: 'Polytechnic' },
  { value: 'academy', label: 'Academy' },
  { value: 'college', label: 'College' },
];

const CLIMATE_OPTIONS = [
  { value: 'tropical', label: 'Tropical' },
  { value: 'subtropical', label: 'Subtropical' },
  { value: 'temperate', label: 'Temperate' },
  { value: 'arid', label: 'Arid' },
  { value: 'continental', label: 'Continental' },
];

const SETTING_OPTIONS = [
  { value: 'urban', label: 'Urban' },
  { value: 'suburban', label: 'Suburban' },
  { value: 'rural', label: 'Rural' },
];

const initialForm: CreateCampusPayload = {
  code: '',
  name: '',
  institution_type: '',
  climate: '',
  setting: '',
};

export default function NewCampusPage() {
  const router = useRouter();
  const { createCampus, isCreating, createError } = useCampusMutations();

  const [form, setForm] = useState<CreateCampusPayload>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateCampusPayload, string>>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateCampusPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateCampusPayload, string>> = {};
    if (!form.code.trim()) newErrors.code = 'Campus code is required.';
    if (!form.name.trim()) newErrors.name = 'Campus name is required.';
    if (!form.institution_type) newErrors.institution_type = 'Institution type is required.';
    if (!form.climate) newErrors.climate = 'Climate is required.';
    if (!form.setting) newErrors.setting = 'Setting is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createCampus(form);
      router.push('/super-admin/campuses');
    } catch {
      // error is captured in createError from the hook
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-on-surface">Tambah Kampus</h2>
        <p className="mt-1 text-on-surface-variant">
          Isi form berikut untuk mendaftarkan kampus baru ke dalam sistem.
        </p>
      </div>

      <Card className="border-outline-variant bg-white shadow-sm">
        <form onSubmit={handleSubmit} noValidate>
          <CardHeader>
            <CardTitle>Informasi Kampus</CardTitle>
            <CardDescription>
              Semua field wajib diisi sebelum menyimpan.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Code */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="code">Kode Kampus</Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="Contoh: UGM, ITB, UI"
                value={form.code}
                onChange={handleChange}
                aria-invalid={!!errors.code}
                aria-describedby={errors.code ? 'code-error' : undefined}
              />
              {errors.code && (
                <p id="code-error" className="text-xs text-destructive">
                  {errors.code}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nama Kampus</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Contoh: Universitas Gadjah Mada"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Institution Type */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="institution_type">Jenis Institusi</Label>
              <select
                id="institution_type"
                name="institution_type"
                value={form.institution_type}
                onChange={handleChange}
                aria-invalid={!!errors.institution_type}
                aria-describedby={errors.institution_type ? 'institution-type-error' : undefined}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
              >
                <option value="" disabled>Pilih jenis institusi</option>
                {INSTITUTION_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.institution_type && (
                <p id="institution-type-error" className="text-xs text-destructive">
                  {errors.institution_type}
                </p>
              )}
            </div>

            {/* Climate */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="climate">Iklim</Label>
              <select
                id="climate"
                name="climate"
                value={form.climate}
                onChange={handleChange}
                aria-invalid={!!errors.climate}
                aria-describedby={errors.climate ? 'climate-error' : undefined}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
              >
                <option value="" disabled>Pilih iklim</option>
                {CLIMATE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.climate && (
                <p id="climate-error" className="text-xs text-destructive">
                  {errors.climate}
                </p>
              )}
            </div>

            {/* Setting */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="setting">Lingkungan Kampus</Label>
              <select
                id="setting"
                name="setting"
                value={form.setting}
                onChange={handleChange}
                aria-invalid={!!errors.setting}
                aria-describedby={errors.setting ? 'setting-error' : undefined}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
              >
                <option value="" disabled>Pilih lingkungan kampus</option>
                {SETTING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.setting && (
                <p id="setting-error" className="text-xs text-destructive">
                  {errors.setting}
                </p>
              )}
            </div>

            {/* API-level error */}
            {createError && (
              <p className="text-sm text-destructive">
                Gagal menyimpan: {createError.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              id="btn-cancel-campus"
              onClick={() => router.push('/super-admin/campuses')}
              disabled={isCreating}
            >
              Batal
            </Button>
            <Button
              type="submit"
              id="btn-save-campus"
              disabled={isCreating}
            >
              {isCreating ? 'Menyimpan...' : 'Simpan Kampus'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
