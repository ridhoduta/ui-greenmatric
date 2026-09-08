'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmail, validatePassword } from '@/lib/utils/validation';
import { ApiError } from '@/lib/api/client';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        {/* Login Card */}
        <div className="w-full max-w-4xl bg-card rounded-3xl shadow-xl shadow-muted border border-border overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-145 z-10 transition-all">
          {/* Left Column - Visual */}
          <div className="md:col-span-5 bg-linear-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Abstract Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [bg-size:16px_16px] pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
            <div className="absolute top-1/4 -left-12 w-40 h-40 rounded-full bg-primary-foreground/10 blur-xl pointer-events-none" />

            {/* Visual Header */}
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground leading-snug">
                Selamat Datang di Portal UI GreenMetric
              </h2>
              <p className="mt-3 text-primary-foreground/90 text-sm leading-relaxed">
                Masuk untuk mengakses dasbor evaluasi, pelaporan data indikator keberlanjutan, dan peringkat institusi Anda.
              </p>
            </div>

            {/* Visual Footer */}
            <div className="relative z-10 pt-4 border-t border-primary-foreground/10 flex items-center justify-between text-xs text-primary-foreground/80">
              <span>© 2026 UI GreenMetric</span>
              {/* <span>v2.6 Institutional Edition</span> */}
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-card">
            <div className="max-w-md w-full mx-auto">
              {/* Form Header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Masuk ke Akun</h1>
                <p className="text-sm text-muted-foreground mt-1">Silakan masukkan kredensial institusi Anda untuk melanjutkan.</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                    Email Institusi / ID Universitas
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                      </svg>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sustain@univ.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={!!errors.email}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                      Kata Sandi
                    </Label>
                    {/* <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80 hover:underline">
                      Lupa sandi?
                    </Link> */}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      aria-invalid={!!errors.password}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-primary/20"
                    /> */}
                    {/* <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                      Ingat saya
                    </Label> */}
                  </div>
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                    {errors.general}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>{isLoading ? 'Sedang masuk...' : 'Masuk ke Dashboard'}</span>
                    {!isLoading && (
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </Button>
                </div>

                {/* SSO Alternative */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  {/* <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Atau masuk dengan</span>
                  </div> */}
                </div>

                {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full py-2.5 px-4 rounded-xl border border-input bg-background hover:bg-muted text-foreground font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Masuk dengan Google
                </Button> */}
              </form>

              {/* Register Link */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Belum punya akun? Hubungi administrator kampus Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-border bg-background text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© 2026 UI GreenMetric World University Rankings. All rights reserved.</div>
        {/* <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="/help" className="hover:text-primary transition-colors">Bantuan</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
          <span className="text-border">|</span>
          <span className="text-muted-foreground/60">v2.6 Institutional Edition</span>
        </div> */}
      </footer>
    </div>
  );
}
