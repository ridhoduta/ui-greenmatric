import type { Role } from '@/types';

export const siteConfig = {
  name: 'UI GreenMetric Self-Assessment',
  description: 'Sistem penilaian mandiri kinerja keberlanjutan lingkungan kampus berdasarkan indikator UI GreenMetric.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const publicNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Berita', href: '/news' },
  { label: 'Kampus Member', href: '/member-campuses' },
  { label: 'Kontak', href: '/contact' },
];

export interface SidebarItem {
  label: string;
  href: string;
  icon?: string;
  roles?: Role[];
}

export const dashboardSidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'layout-dashboard',
    roles: ['ADMIN_KAMPUS', 'OPERATOR_SI', 'OPERATOR_EC', 'OPERATOR_WS', 'OPERATOR_WR', 'OPERATOR_TR', 'OPERATOR_ED', 'OPERATOR_GD'],
  },
  {
    label: 'Dashboard',
    href: '/super-admin/dashboard',
    icon: 'layout-dashboard',
    roles: ['SUPER_ADMIN'],
  },
  {
    label: 'Setting & Infrastructure',
    href: '/categories/si',
    icon: 'building',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_SI'],
  },
  {
    label: 'Energy & Climate Change',
    href: '/categories/ec',
    icon: 'zap',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_EC'],
  },
  {
    label: 'Waste',
    href: '/categories/ws',
    icon: 'trash-2',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_WS'],
  },
  {
    label: 'Water',
    href: '/categories/wr',
    icon: 'droplets',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_WR'],
  },
  {
    label: 'Transportation',
    href: '/categories/tr',
    icon: 'car',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_TR'],
  },
  {
    label: 'Education & Research',
    href: '/categories/ed',
    icon: 'graduation-cap',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_ED'],
  },
  {
    label: 'Governance & Digitalization',
    href: '/categories/gd',
    icon: 'shield-check',
    roles: ['SUPER_ADMIN', 'ADMIN_KAMPUS', 'OPERATOR_GD'],
  },
  {
    label: 'Kelola User',
    href: '/admin/users',
    icon: 'users',
    roles: ['ADMIN_KAMPUS'],
  },
  {
    label: 'Kelola Kampus',
    href: '/super-admin/campuses',
    icon: 'school',
    roles: ['SUPER_ADMIN'],
  },
];
