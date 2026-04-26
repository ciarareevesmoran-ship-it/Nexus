import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Trash2, StickyNote, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function NotesPanel({ contextType, contextId, contextName }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const list = await base44.entities.UserNotes.filter(
      { contextType, contextId },
      '-created_date'
    );
    setNotes(list);
    setLoading(false);
  };

  useEffect(() => { load(); }, [contextType, contextId]);

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);
    await base44.entities.UserNotes.create({
      title: title.trim() || undefined,
      content: content.trim(),
      contextType,
      contextId,
      contextName,
    });
    setContent('');
    setTitle('');
    setSaving(false);
    load();
  };

  const handleDelete = async (id) => {
    await base44.entities.UserNotes.delete(id);
    load();
  };

  return (
    <div className="p-4 space-y-4">
      <div className="rounded-lg border border-border bg-background p-3 space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Write a note about ${contextName}...`}
          rows={4}
          className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-muted-foreground"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSave} disabled={!content.trim() || saving}>
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save note'}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-6">
          <StickyNote className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">No notes yet for {contextName}.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="rounded-lg border border-border bg-background p-3 group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  {n.title && <p className="text-sm font-semibold text-foreground mb-1">{n.title}</p>}
                  <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    {n.created_date ? format(new Date(n.created_date), 'MMM d, yyyy') : ''}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}