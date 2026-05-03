import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { StickyNote, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function MyNotesSection() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotes(data || []);
        setLoading(false);
      });
  }, [user]);

  const grouped = notes.reduce((acc, note) => {
    const key = note.context_name || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  return (
    <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2.5 mb-6">
        <StickyNote className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-2xl font-bold text-foreground">My Notes</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-sm text-muted-foreground leading-relaxed">
          You haven't written any notes yet. Start taking notes while you learn — they'll appear here, organised by subject and case.
        </p>
      ) : (
        <div className="space-y-7">
          {Object.entries(grouped).map(([contextName, items]) => (
            <div key={contextName}>
              <h4 className="font-serif text-sm font-bold text-foreground mb-3">{contextName}</h4>
              <div className="divide-y divide-border rounded-lg border border-border bg-background">
                {items.map((n) => (
                  <div key={n.id} className="p-4">
                    {n.title && <p className="text-sm font-semibold text-foreground mb-1">{n.title}</p>}
                    <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      {n.created_at ? format(new Date(n.created_at), 'MMM d, yyyy') : ''}
                    </p>
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