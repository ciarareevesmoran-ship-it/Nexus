import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { Bookmark, ArrowRight, Loader2 } from 'lucide-react';

export default function BookmarksSection() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setBookmarks(data || []);
        setLoading(false);
      });
  }, [user]);

  const grouped = bookmarks.reduce((acc, b) => {
    const key = b.context_type === 'case'
      ? (b.lesson_name || 'Live Case')
      : (b.subject_name || 'Other');
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  return (
    <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2.5 mb-6">
        <Bookmark className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-2xl font-bold text-foreground">Bookmarks</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : bookmarks.length === 0 ? (
        <p className="text-sm text-muted-foreground leading-relaxed">
          No bookmarks yet. Bookmark lessons or live cases you'd like to return to — they'll show up here.
        </p>
      ) : (
        <div className="space-y-7">
          {Object.entries(grouped).map(([groupName, items]) => (
            <div key={groupName}>
              <h4 className="font-serif text-sm font-bold text-foreground mb-3">{groupName}</h4>
              <div className="divide-y divide-border rounded-lg border border-border bg-background">
                {items.map((b) => (
                  <div key={b.id} className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{b.lesson_name}</p>
                      {b.topic_name && b.context_type === 'lesson' && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{b.topic_name}</p>
                      )}
                    </div>
                    <Link
                      to={b.url}
                      className="flex items-center gap-1 text-xs font-semibold text-[#7B2235] hover:underline shrink-0"
                    >
                      Go to lesson
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}