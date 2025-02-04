'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  KeySquare,
  LayoutDashboard,
  LineChart,
  ScrollText,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'API Keys', href: '/keys', icon: KeySquare },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Logs', href: '/logs', icon: ScrollText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

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
          <KeySquare className="h-6 w-6 text-primary transition-transform duration-300 hover:rotate-180" />
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

      <div className={cn(
        "p-2 border-t",
        collapsed ? "flex justify-center" : "px-3"
      )}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}