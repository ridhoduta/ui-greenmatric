'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LandingHeader() {
  const pathname = usePathname();

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
    'text-primary dark:text-primary-fixed font-bold  border-b-2 border-primary dark:border-primary-fixed';
  const inactiveStyle =
    'text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-highest';

  return (
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
          <button className="hidden md:flex bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-on-primary-fixed-variant transition-colors items-center gap-2">
            Join the Movement
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </button>
          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
