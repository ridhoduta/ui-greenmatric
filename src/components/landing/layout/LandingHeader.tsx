'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function LandingHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'UI GREENMETRIC', href: '/ui-green-matric' },
    { label: 'CLIENT', href: '/client' },
    { label: 'CONTACT', href: '/contact' },
    { label: 'News', href: '/news' },
  ];

  const baseStyle =
    'font-label-md text-label-md tracking-wider uppercase px-3 py-2 transition-all duration-200';
  const activeStyle =
    'text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed';
  const inactiveStyle =
    'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-highest';

  const mobileBaseStyle =
    'font-label-md text-label-md tracking-wider uppercase px-4 py-4 transition-all duration-200 rounded-xl w-full text-left';
  const mobileActiveStyle =
    'text-primary dark:text-primary-fixed font-bold bg-primary/10 dark:bg-primary-fixed/10';
  const mobileInactiveStyle =
    'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-highest';

  return (
    <>
      <header className="bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md border-b border-outline-variant/30 dark:border-outline/20 sticky top-0 z-50">
        <nav className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
          <Link href="/" className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed">
            UI GREENMETRIC
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:flex bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors items-center gap-2">
              Login
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                arrow_forward
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-primary p-1 rounded-lg hover:bg-surface-container-low transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 max-w-[85vw] bg-surface dark:bg-surface-dim shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-outline-variant/30 dark:border-outline/20 shrink-0">
          <span className="font-title-md text-title-md font-bold text-primary dark:text-primary-fixed">
            Menu
          </span>
          <button
            className="text-on-surface-variant hover:text-primary p-1 rounded-lg hover:bg-surface-container-low transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${mobileBaseStyle} ${isActive ? mobileActiveStyle : mobileInactiveStyle}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer — Login */}
        <div className="px-4 py-6 border-t border-outline-variant/30 dark:border-outline/20 shrink-0">
          <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors">
            Login
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
