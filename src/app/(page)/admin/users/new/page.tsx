'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { useUserMutations } from '@/hooks/use-users';
import { useCampuses } from '@/hooks/use-campuses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Role } from '@/types';
import type { CreateUserPayload } from '@/lib/api/users';

const ALL_ROLES: { value: Role; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'ADMIN_KAMPUS', label: 'Admin Kampus' },
  { value: 'OPERATOR_SI', label: 'Operator SI' },
  { value: 'OPERATOR_EC', label: 'Operator EC' },
  { value: 'OPERATOR_WS', label: 'Operator WS' },
  { value: 'OPERATOR_WR', label: 'Operator WR' },
  { value: 'OPERATOR_TR', label: 'Operator TR' },
  { value: 'OPERATOR_ED', label: 'Operator ED' },
  { value: 'OPERATOR_GD', label: 'Operator GD' },
];

interface FormValues {
  name: string;
  email: string;
  password: string;
  role: Role | '';
  campus_id: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  campus_id?: string;
  general?: string;
}

export default function NewUserPage() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const { createUser, isCreating } = useUserMutations();
  const { data: campuses, isLoading: campusesLoading } = useCampuses();

  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const [form, setForm] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    role: '',
    campus_id: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = 'Nama wajib diisi.';
    }

    if (!form.email.trim()) {
      errs.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Format email tidak valid.';
    }

    if (!form.password) {
      errs.password = 'Password wajib diisi.';
    } else if (form.password.length < 8) {
      errs.password = 'Password minimal 8 karakter.';
    }

    if (!form.role) {
      errs.role = 'Role wajib dipilih.';
    }

    if (isSuperAdmin && !form.campus_id) {
      errs.campus_id = 'Campus wajib dipilih untuk Super Admin.';
    }

    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload: CreateUserPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role as Role,
    };

    if (isSuperAdmin && form.campus_id) {
      payload.campus_id = parseInt(form.campus_id, 10);
    }

    try {
      await createUser(payload);
      showToast('success', `User "${payload.name}" berhasil dibuat.`);
      router.push('/admin/users');
    } catch (err: unknown) {
      // Handle API validation errors (422)
      if (
        err &&
        typeof err === 'object' &&
        'errors' in err &&
        err.errors &&
        typeof err.errors === 'object'
      ) {
        const apiErrors = err.errors as Record<string, string[] | string>;
        const fieldErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(apiErrors)) {
          fieldErrors[field as keyof FormErrors] = Array.isArray(messages)
            ? messages[0]
            : messages;
        }
        setErrors(fieldErrors);
      } else if (err && typeof err === 'object' && 'message' in err) {
        setErrors({ general: (err as { message: string }).message });
      } else {
        setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali
          </button>
        </div>
        <h2 className="text-3xl font-bold text-on-surface">Tambah User Baru</h2>
        <p className="mt-1 text-on-surface-variant">
          Buat akun user baru atau undang operator ke dalam sistem.
        </p>
      </div>

      <Card className="border-outline-variant bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Informasi User</CardTitle>
          <CardDescription>
            Isi semua field yang diperlukan untuk membuat user baru.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {errors.general && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">
                Nama Lengkap
                <span className="text-destructive ml-0.5" aria-hidden="true">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={form.name}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={isCreating}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">
                Email
                <span className="text-destructive ml-0.5" aria-hidden="true">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                value={form.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={isCreating}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">
                Password
                <span className="text-destructive ml-0.5" aria-hidden="true">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  value={form.password}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  disabled={isCreating}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-destructive" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">
                Role
                <span className="text-destructive ml-0.5" aria-hidden="true">*</span>
              </Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled={isCreating}
                aria-required="true"
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? 'role-error' : undefined}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
              >
                <option value="" disabled>
                  Pilih role
                </option>
                {ALL_ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p id="role-error" className="text-xs text-destructive" role="alert">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Campus — only shown for SUPER_ADMIN */}
            {isSuperAdmin && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="campus_id">
                  Kampus
                  <span className="text-destructive ml-0.5" aria-hidden="true">*</span>
                </Label>
                <select
                  id="campus_id"
                  name="campus_id"
                  value={form.campus_id}
                  onChange={handleChange}
                  disabled={isCreating || campusesLoading}
                  aria-required="true"
                  aria-invalid={!!errors.campus_id}
                  aria-describedby={errors.campus_id ? 'campus_id-error' : undefined}
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"
                >
                  <option value="" disabled>
                    {campusesLoading ? 'Memuat kampus...' : 'Pilih kampus'}
                  </option>
                  {campuses?.map((campus) => (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                  ))}
                </select>
                {errors.campus_id && (
                  <p id="campus_id-error" className="text-xs text-destructive" role="alert">
                    {errors.campus_id}
                  </p>
                )}
              </div>
            )}

            {/* Required field notice */}
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive" aria-hidden="true">*</span> Field wajib diisi
            </p>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isCreating}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="min-w-[120px]"
              >
                {isCreating ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
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
                  </span>
                ) : (
                  'Buat User'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
