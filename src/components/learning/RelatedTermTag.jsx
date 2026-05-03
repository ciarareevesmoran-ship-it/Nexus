import { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loader2 } from 'lucide-react';

export default function RelatedTermTag({ term, subject }) {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = async (isOpen) => {
    setOpen(isOpen);
    if (!isOpen || definition || loading) return;

    setLoading(true);
    const key = term.trim().toLowerCase();

    const { data } = await supabase
      .from('term_definitions')
      .select('definition')
      .eq('term', key)
      .eq('subject', subject || '')
      .maybeSingle();

    if (data) {
      setDefinition(data.definition);
    } else {
      setDefinition('Definition not yet available.');
    }

    setLoading(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="px-3 py-1 bg-[#FAF0F2] text-[#7B2235] text-xs font-medium rounded-full hover:bg-[#F2E0E3] transition-colors cursor-pointer"
        >
          {term}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72" side="top">
        <p className="text-xs font-bold text-[#7B2235] font-serif mb-1">{term}</p>
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" /> Looking up…
          </div>
        ) : (
          <p className="text-sm text-foreground leading-relaxed">{definition}</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
