'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmail, validatePassword } from '@/lib/utils/validation';
import { ApiError } from '@/lib/api/client';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 422 && error.errors) {
          setErrors({
            email: error.errors.email as string,
            password: error.errors.password as string,
          });
        } else {
          setErrors({ general: error.message });
        }
      } else {
        setErrors({ general: 'Terjadi kesalahan. Silakan coba lagi.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-800">
      {/* Left Column: Visual Design with Green Background */}
      <div className="hidden md:flex md:w-5/12 bg-linear-to-br from-[#056b46] via-[#045638] to-[#023824] text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [bg-size:16px_16px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
        <div className="absolute top-1/4 -left-12 w-40 h-40 rounded-full bg-emerald-300/10 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 text-emerald-200/80 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Selamat Datang
          </h2>
          <p className="mt-2 text-xl font-semibold text-emerald-200">
            Portal UI GreenMetric
          </p>
          <p className="mt-4 text-sm text-emerald-100/70 leading-relaxed max-w-sm">
            Masuk untuk mengakses dasbor evaluasi, pelaporan data indikator keberlanjutan, dan peringkat institusi Anda.
          </p>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-emerald-200/60">
          © 2026 UI GreenMetric World University Rankings
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Portal Masuk Pengguna
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Masuk ke Akun</h1>
            <p className="text-sm text-slate-500 mt-1">Silakan masukkan kredensial institusi Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
                Email Institusi / ID Universitas
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="sustain@univ.ac.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  className="w-full h-auto pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                  Kata Sandi
                </Label>
                <Link href="#" className="text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline">
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  className="w-full h-auto pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {errors.general}
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-auto py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-800/15 hover:shadow-lg hover:shadow-emerald-800/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
              >
                <span>{isLoading ? 'Sedang masuk...' : 'Masuk ke Dashboard'}</span>
                {!isLoading && (
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Belum punya akun? Hubungi administrator kampus Anda.
          </div>
        </div>
      </div>
    </div>
  );
}
