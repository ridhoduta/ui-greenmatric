'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
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
  LogOut,
} from 'lucide-react';
import type { Role } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'layout-dashboard': <LayoutDashboard size={18} />,
  building: <Building2 size={18} />,
  zap: <Zap size={18} />,
  'trash-2': <Trash2 size={18} />,
  droplets: <Droplets size={18} />,
  car: <Car size={18} />,
  'graduation-cap': <GraduationCap size={18} />,
  'shield-check': <ShieldCheck size={18} />,
  school: <School size={18} />,
  users: <Users size={18} />,
};

interface NavigateProps {
  role: Role;
}

export function Navigate({ role }: NavigateProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const filteredItems = dashboardSidebarItems.filter(
    (item) => !item.roles || item.roles.includes(role)
  );

  return (
    <aside className="w-full">
      <div className="rounded-2xl bg-[#f4f7fb] dark:bg-slate-900/60 p-4 border border-slate-200/70 dark:border-slate-800 shadow-xs">
        {/* Menu Section Title */}
        <div className="px-3 pt-1 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            MENU
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-1">
          {filteredItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' &&
                item.href !== '/super-admin/dashboard' &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-primary shadow-xs font-semibold dark:bg-slate-800 dark:text-primary-fixed'
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                }`}
              >
                <span
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? 'text-primary dark:text-primary-fixed'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {iconMap[item.icon || ''] || <LayoutDashboard size={18} />}
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="pt-2 mt-2 border-t border-slate-200/70 dark:border-slate-800">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-destructive dark:text-slate-400 dark:hover:bg-rose-950/20 dark:hover:text-destructive transition-all duration-150 cursor-pointer"
            >
              <LogOut size={18} className="shrink-0 text-slate-500 dark:text-slate-400" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
