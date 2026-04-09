import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Layers, Radio, User, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/my-learning', label: 'My Learning', icon: BookOpen },
  { path: '/cases', label: 'Cases', icon: Layers },
  { path: '/live-cases', label: 'Live Cases', icon: Radio },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-serif text-xl font-bold tracking-tight text-foreground">Nexus</span>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs font-medium text-primary font-serif">Upgrade to Premium</p>
        <p className="text-xs text-muted-foreground mt-1">Unlock all subjects, formats & the full Case builder.</p>
        <Link to="/profile" className="inline-block mt-2 text-xs font-semibold text-primary hover:underline">
          Learn more →
        </Link>
      </div>
    </aside>
  );
}