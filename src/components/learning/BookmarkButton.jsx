import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { findBookmark, toggleBookmark } from '@/lib/userTracking';
import { useAuth } from '@/lib/AuthContext';
import { cn } from '@/lib/utils';

export default function BookmarkButton({ bookmark, variant = 'pill' }) {
  const { user, loading: authLoading } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    findBookmark(bookmark.url).then((b) => {
      if (!cancelled) {
        setIsBookmarked(!!b);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [bookmark.url, user, authLoading]);

  const handleClick = async () => {
    if (!user) return;
    setLoading(true);
    const result = await toggleBookmark(bookmark);
    setIsBookmarked(!!result);
    setLoading(false);
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        className={cn(
          "h-9 w-9 flex items-center justify-center rounded-md transition-colors hover:bg-muted",
          isBookmarked ? "text-primary" : "text-muted-foreground"
        )}
      >
        <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "flex items-center gap-2",
        isBookmarked ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
      <span className="text-xs">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
    </Button>
  );
}