'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/layout/sidebar';
import { GraduationCap, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tutup sidebar saat route berubah
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Kunci body scroll saat sidebar mobile terbuka
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
    <div className="flex min-h-screen bg-[#f8f9ff] font-sans">
      {/* ── Desktop Sidebar ── */}
      <div className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-outline-variant bg-white md:flex">
        <Sidebar role={user.role} />
      </div>

      {/* ── Mobile Backdrop Overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Sidebar Drawer ── */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar role={user.role} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Main Content ── */}
      <div className="flex flex-1 flex-col md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-outline-variant bg-white/80 px-4 md:px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Hamburger — hanya tampil di mobile */}
            <button
              className="text-muted-foreground hover:text-primary md:hidden p-1 rounded-md hover:bg-surface-container-low transition-colors"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label={sidebarOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-primary">
              <GraduationCap size={20} />
            </button>
            <div className="h-6 w-px bg-outline-variant" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
