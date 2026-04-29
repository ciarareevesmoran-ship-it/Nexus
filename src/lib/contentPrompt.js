// Single source of truth for the structured-content generation prompt.
// Used by BOTH "Generate Sample" and "Run Full Generation" so every section
// produced — for any subject — follows an identical structure.

export const CONTENT_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    expanded_explanation: {
      type: 'string',
      description:
        'The full structured explanation, with subheadings and paragraphs separated by blank lines. There is no maximum length. Use as many words as the topic genuinely requires. Beginner topics may need 400–700 words; advanced topics may need 1500+ words.',
    },
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
      'Beginner level: 3–4 subsection headers, 400–700 words total in expanded_explanation. Paragraphs of 2–3 sentences, plain language, lots of analogies, minimal jargon.',
    intermediate:
      'Intermediate level: 4–6 subsection headers, 700–1200 words total in expanded_explanation. Paragraphs of 3–5 sentences, introduce technical vocabulary with brief context, balance precision with accessibility.',
    advanced:
      'Advanced level: 5–8 subsection headers, 1200–2000 words total in expanded_explanation. Paragraphs of 4–6 sentences, deeper mechanisms, formal terminology, mathematical or quantitative detail where relevant.',
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

LENGTH PRINCIPLE — accuracy over brevity:
- Length must serve accuracy. If a concept genuinely requires more space to state correctly — including all necessary qualifications, scope limits, and exceptions — use that space. Never drop qualifications, scope limits, or exceptions in order to fit a target length. Accuracy is non-negotiable; length is negotiable.
- For advanced topics, expect that explaining a single concept correctly may require its own subsection. Do not bundle multiple distinct concepts into one paragraph just to save space. For example, hybridization, reactivity patterns, and aromaticity are three distinct concepts and should each get their own treatment if all three appear in a section.

ACCURACY RULES — strictly enforce:
- Be precise about the scope of any rule, law, or principle you cite. State exactly when the rule applies and when it does not. Do not generalize a rule beyond its actual scope. Example: Markovnikov's rule applies to addition of HX (hydrohalogenation) and acid-catalyzed hydration to unsymmetrical alkenes — not to hydrogenation or symmetric halogenation.
- When citing a formula like 4n+2, distinguish between the formula and an actual numerical count. State the count first, then note which formula it satisfies.
- Before stating that one process or category "occurs" under certain conditions, double-check that those conditions actually produce the process. Avoid sentences that contradict themselves within the same paragraph.
- Mental models must accommodate all the cases just discussed in the section. If the section covered both chains and rings, do not use a mental model that only describes chains.
- When comparing reactivity between compound classes, be specific about which type of reactivity. Do not generalize that one class is "more reactive" than another without specifying the reaction context.
- Before finalizing, re-read each statement that begins with "follows," "obeys," "undergoes," or "is governed by." Verify that the rule or process named applies to all cases you've grouped under it. If not, narrow the statement.

Produce the following four fields. The structure is FIXED and must be identical for every section across the platform.

1. expanded_explanation
   - Number of subsections is governed by the DEPTH RULE above (3–4 for beginner, 4–6 for intermediate, 5–8 for advanced). Each subsection has a SUBHEADING on its own line followed by a paragraph.
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