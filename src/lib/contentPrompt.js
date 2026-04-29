// Single source of truth for the structured-content generation prompt.
// Used by BOTH "Generate Sample" and "Run Full Generation" so every section
// produced — for any subject — follows an identical structure.

export const CONTENT_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    expanded_explanation: { type: 'string' },
    key_takeaways: { type: 'array', items: { type: 'string' } },
    real_world_examples: { type: 'array', items: { type: 'string' } },
    related_terms: { type: 'array', items: { type: 'string' } },
  },
};

/**
 * Build the structured-content prompt for a single section.
 * @param {object} section
 * @param {string} section.subject         - e.g. "Chemistry"
 * @param {string} section.main_topic      - e.g. "Atomic Structure"
 * @param {string} section.section_number  - e.g. "1.1"
 * @param {string} section.section_title   - e.g. "The Atom — Fundamental Concepts"
 * @param {string} section.concise_definition - The seed/source definition.
 * @param {string} [section.difficulty]    - "beginner" | "intermediate" | "advanced"
 */
export function buildContentPrompt(section) {
  const difficulty = section.difficulty || 'intermediate';

  const depthGuidance = {
    beginner:
      'Beginner level: keep paragraphs to 2–3 sentences, plain language, lots of analogies, minimal jargon.',
    intermediate:
      'Intermediate level: paragraphs of 3–5 sentences, introduce technical vocabulary with brief context, balance precision with accessibility.',
    advanced:
      'Advanced level: paragraphs of 4–6 sentences, deeper mechanisms, formal terminology, mathematical or quantitative detail where relevant. Total explanation should be noticeably longer than for beginner sections.',
  }[difficulty];

  return `You are an expert ${section.subject || 'educator'} writing for the Nexus learning platform.

Generate rich, scientifically precise educational content for the following section.

Subject: ${section.subject || 'General'}
Topic: ${section.main_topic}
Section: ${section.section_number} — ${section.section_title}
Difficulty: ${difficulty}
Source definition: ${section.concise_definition}

DEPTH RULE — scale length and detail with difficulty:
${depthGuidance}
Harder sections MUST produce a longer, more detailed expanded_explanation than introductory sections. Do not artificially shorten advanced material to match beginner length.

Produce the following four fields. The structure is FIXED and must be identical for every section across the platform.

1. expanded_explanation
   - Write 3–5 subsections. Each subsection has a SUBHEADING on its own line followed by a paragraph.
   - Format strictly as: "SUBHEADING\\nParagraph text." with a blank line between subsections.
   - Subheadings should be short, clear questions or noun phrases (e.g. "What is an atom?", "The nucleus", "How it works", "Why it matters").
   - Exactly ONE of the subsections must be the "Mental model" callout. Use the subheading "A mental model" and format the paragraph body as this exact HTML callout (replace the inner sentence(s) with the mental model for THIS section, written in your own words, 1–3 sentences):
     <div style="border: 2px solid #800020; padding: 12px; border-radius: 8px; background-color: #faf5f7;"><strong>Mental model:</strong><br/>YOUR MENTAL MODEL SENTENCES HERE</div>
   - Place the mental-model subsection somewhere in the middle (not first, not last).
   - Use plain, clear language. Be scientifically precise. Avoid hedging filler.

2. key_takeaways
   - 4–6 concise bullet points summarising what a student must remember.

3. real_world_examples
   - Exactly 3 concrete, relatable real-world applications or examples that make the concept tangible. Each example is a single short paragraph (1–3 sentences).

4. related_terms
   - 8–12 important vocabulary terms related to this section. Just the terms themselves (no definitions). Use the canonical scientific spelling.

Return ONLY the JSON matching the provided schema.`;
}