import { useState } from 'react';
import { base44 } from '@/api/base44Client';
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

    // 1. Try cache first
    const existing = await base44.entities.TermDefinition.filter({ term: key, subject });
    if (existing.length > 0) {
      setDefinition(existing[0].definition);
      setLoading(false);
      return;
    }

    // 2. Generate via LLM
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `Define the ${subject || 'scientific'} term "${term}" in exactly one clear, precise sentence suitable for a learner. Do not include the term itself at the start. Do not add examples or extra commentary — just the one-sentence definition.`,
      response_json_schema: {
        type: 'object',
        properties: { definition: { type: 'string' } },
        required: ['definition'],
      },
    });

    const text = result?.definition?.trim() || 'Definition unavailable.';

    // 3. Cache for future clicks
    await base44.entities.TermDefinition.create({
      term: key,
      term_display: term,
      subject: subject || '',
      definition: text,
    });

    setDefinition(text);
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