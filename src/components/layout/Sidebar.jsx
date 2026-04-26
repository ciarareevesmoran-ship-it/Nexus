import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Layers, Radio, User } from 'lucide-react';
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
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar text-sidebar-foreground">
      {/* Wordmark */}
      <div className="flex items-center gap-3 px-7 pt-8 pb-10">
        <div className="w-10 h-10 rounded-lg bg-sidebar-accent flex items-center justify-center ring-1 ring-primary/40">
          <span className="font-serif text-xl font-bold text-primary leading-none">N</span>
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight text-sidebar-foreground">
          Nexus
        </span>
      </div>

      {/* Section label */}
      <div className="px-7 mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/50">
          Navigation
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary" />
              )}
              <item.icon className={cn(
                "w-[18px] h-[18px] transition-colors",
                isActive ? "text-primary" : "text-sidebar-foreground/70"
              )} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Premium card — navy with gold accent */}
      <div className="p-5 mx-4 mb-6 rounded-xl bg-sidebar-accent/60 border border-primary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              Premium
            </p>
          </div>
          <p className="font-serif text-[17px] font-bold text-sidebar-foreground leading-snug mb-2">
            Unlock the full library
          </p>
          <p className="text-xs text-sidebar-foreground/70 leading-relaxed mb-4">
            All subjects, formats, and the complete Case builder.
          </p>
          <Link
            to="/profile"
            className="inline-flex items-center justify-center w-full px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Discover Premium
          </Link>
        </div>
      </div>
    </aside>
  );
}