import { Lightbulb } from 'lucide-react';
import RelatedTermTag from './RelatedTermTag';

const KEY_CHEM_TERMS = [
  'atomic number',
  'mass number',
  'isotope',
  'isotopes',
  'cation',
  'cations',
  'anion',
  'anions',
  'proton',
  'protons',
  'neutron',
  'neutrons',
  'electron',
  'electrons',
  'nucleus',
];

// Bold the FIRST occurrence (case-insensitive) of each key term in a paragraph.
function autoBoldKeyTerms(text) {
  if (!text) return text;
  const seen = new Set();
  // Sort by length desc so multi-word terms match before their substrings.
  const terms = [...KEY_CHEM_TERMS].sort((a, b) => b.length - a.length);

  const nodes = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Find the earliest match across all unseen terms.
    let earliest = null;
    for (const term of terms) {
      if (seen.has(term)) continue;
      const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      const m = re.exec(remaining);
      if (m && (earliest === null || m.index < earliest.index)) {
        earliest = { index: m.index, match: m[0], term };
      }
    }

    if (!earliest) {
      nodes.push(remaining);
      break;
    }

    if (earliest.index > 0) nodes.push(remaining.slice(0, earliest.index));
    nodes.push(
      <strong key={`b-${nodes.length}`} className="font-semibold text-foreground">
        {earliest.match}
      </strong>
    );
    seen.add(earliest.term);
    remaining = remaining.slice(earliest.index + earliest.match.length);
  }

  return nodes;
}

function MentalModelBox({ html }) {
  // Strip the inner content out of the supplied HTML callout — we want our own styling.
  // Try to extract the sentence(s) after "Mental model:" or after the <br/>.
  const stripped = (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const text = stripped.replace(/^Mental model:\s*/i, '');

  return (
    <div className="my-2 p-5 rounded-xl bg-[#FAF0F2] border border-[#F2D5DA] flex gap-3">
      <Lightbulb className="w-5 h-5 text-[#7B2235] shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-[#7B2235] uppercase tracking-wider mb-1.5 font-serif">
          Mental model
        </p>
        <p className="text-[15px] text-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function GeneratedContent({ content }) {
  if (!content) return null;

  const blocks = (content.expanded_explanation || '')
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);

  return (
    <div
      className="mx-auto"
      style={{ maxWidth: 700, fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Expanded Explanation */}
      <section className="mb-14">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 pb-3 border-b border-border">
          Expanded Explanation
        </h2>
        <div className="space-y-9">
          {blocks.map((block, i) => {
            const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
            const subheading = lines[0];
            const body = lines.slice(1).join(' ');
            const isCallout = body.trim().startsWith('<') && body.toLowerCase().includes('mental model');

            if (isCallout) {
              return <MentalModelBox key={i} html={body} />;
            }

            // Some models inline the callout HTML on the subheading line — handle that too.
            if (subheading.startsWith('<') && subheading.toLowerCase().includes('mental model')) {
              return <MentalModelBox key={i} html={subheading} />;
            }

            return (
              <div key={i}>
                <h3 className="font-serif text-xl md:text-[1.4rem] font-bold text-[#7B2235] mb-3">
                  {subheading}
                </h3>
                <p
                  className="text-foreground"
                  style={{ fontSize: '17px', lineHeight: 1.7 }}
                >
                  {autoBoldKeyTerms(body)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Takeaways */}
      {content.key_takeaways?.length > 0 && (
        <section className="mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 pb-3 border-b border-border">
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {content.key_takeaways.map((t, i) => (
              <li
                key={i}
                className="flex gap-3 text-foreground"
                style={{ fontSize: '17px', lineHeight: 1.7 }}
              >
                <span className="text-[#7B2235] font-bold shrink-0">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Real-World Examples */}
      {content.real_world_examples?.length > 0 && (
        <section className="mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 pb-3 border-b border-border">
            Real-World Examples
          </h2>
          <div className="grid gap-4">
            {content.real_world_examples.map((e, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#FAF7F2] border border-[#EFE6D8]"
              >
                <p
                  className="text-foreground"
                  style={{ fontSize: '16px', lineHeight: 1.65 }}
                >
                  {e}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Terms */}
      {content.related_terms?.length > 0 && (
        <section className="mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 pb-3 border-b border-border">
            Related Terms
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.related_terms.map((term, i) => (
              <RelatedTermTag key={`${term}-${i}`} term={term} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}