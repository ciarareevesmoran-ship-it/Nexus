import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { StickyNote, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function MyNotesSection() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.UserNotes.list('-created_date').then((list) => {
      setNotes(list);
      setLoading(false);
    });
  }, []);

  const grouped = notes.reduce((acc, note) => {
    const key = note.contextName || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 mb-4">
        <StickyNote className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-bold text-foreground">My Notes</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven't written any notes yet. Start taking notes while you learn — they'll appear here, organised by subject and case.
        </p>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([contextName, items]) => (
            <div key={contextName}>
              <h4 className="font-serif text-sm font-bold text-foreground mb-2">{contextName}</h4>
              <div className="space-y-2">
                {items.map((n) => (
                  <div key={n.id} className="rounded-lg border border-border bg-background p-3">
                    {n.title && <p className="text-sm font-semibold text-foreground mb-1">{n.title}</p>}
                    <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      {n.created_date ? format(new Date(n.created_date), 'MMM d, yyyy') : ''}
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