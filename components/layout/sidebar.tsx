'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  KeyRound,
  LayoutDashboard,
  LineChart,
  ScrollText,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'API Keys', href: '/keys', icon: KeyRound },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Logs', href: '/logs', icon: ScrollText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-full flex-col bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "flex h-16 items-center gap-2 py-4",
        collapsed ? "justify-center px-4" : "px-6"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="p-0 hover:bg-transparent"
        >
          <KeyRound className="h-6 w-6 text-primary transition-transform duration-300 hover:rotate-180" />
        </Button>
        {!collapsed && <span className="text-lg font-semibold">VaultCloud</span>}
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5',
                  collapsed ? 'mx-auto' : 'mr-3',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              {!collapsed && item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}