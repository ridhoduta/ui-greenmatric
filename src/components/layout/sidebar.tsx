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
  ChevronLeft,
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

function UserFooter() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="border-t border-outline-variant p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-primary">
          <School size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold">{user?.name || 'User'}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {user?.role || 'Loading...'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="shrink-0 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

interface SidebarProps {
  role: Role;
  onClose?: () => void;
}

export function Sidebar({ role, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-outline-variant px-6 py-5">
        <div>
          <h1 className="text-lg font-bold text-primary">GreenMetric</h1>
          <p className="text-xs text-muted-foreground">Sustainability Dashboard</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
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
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
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

      <UserFooter />
    </aside>
  );
}
