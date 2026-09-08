'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardSidebarItems } from '@/config/site';
import {
  LayoutDashboard,
  Building2,
  Zap,
  Trash2,
  Droplets,
  Car,
  GraduationCap,
  ShieldCheck,
  School,
  Users,
} from 'lucide-react';
import type { Role } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'layout-dashboard': <LayoutDashboard size={16} />,
  building: <Building2 size={16} />,
  zap: <Zap size={16} />,
  'trash-2': <Trash2 size={16} />,
  droplets: <Droplets size={16} />,
  car: <Car size={16} />,
  'graduation-cap': <GraduationCap size={16} />,
  'shield-check': <ShieldCheck size={16} />,
  school: <School size={16} />,
  users: <Users size={16} />,
};

interface NavigateProps {
  role: Role;
}

export function Navigate({ role }: NavigateProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-white border-r border-outline-variant">
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {dashboardSidebarItems
          .filter((item) => !item.roles || item.roles.includes(role))
          .map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-primary'
                    : 'text-muted-foreground hover:bg-surface-container-high hover:text-foreground'
                }`}
              >
                {iconMap[item.icon || '']}
                <span>{item.label}</span>
              </Link>
            );
          })}
      </nav>
    </aside>
  );
}
