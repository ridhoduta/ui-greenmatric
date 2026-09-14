'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/landing/layout/sidebar';
import { Navigate } from '@/components/landing/layout/navigate';
import { LandingHeader } from '@/components/landing/layout/LandingHeader';
import { LandingFooter } from '@/components/landing/layout/LandingFooter';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Tutup sidebar saat route berubah
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Kunci body scroll saat sidebar terbuka
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Tutup sidebar saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Silakan login terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9ff] font-sans">
      {/* ── Landing Header ── */}
      <LandingHeader />

      {/* ── Mobile Category Navigation Trigger Bar ── */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 bg-white border-b border-outline-variant/60 shadow-xs">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-primary px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          <LayoutDashboard size={15} />
          <span>Menu Navigasi</span>
        </button>
        <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">
          {user.name} ({user.role})
        </span>
      </div>

      {/* ── Main Layout with Left Sidebar ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigate Sidebar - Hidden on mobile, always visible on desktop */}
        <div className="hidden md:block w-64 lg:w-72 shrink-0 py-6 pl-6 pr-2 lg:py-8 lg:pl-8 lg:pr-3 overflow-y-auto">
          <div className="sticky top-0">
            <Navigate role={user.role} />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* ── Backdrop Overlay (Mobile Only) ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Sidebar Drawer ── */}
      <div
        ref={sidebarRef}
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar role={user.role} onClose={() => setSidebarOpen(false)} />
      </div>

      <LandingFooter />
    </div>
  );
}
