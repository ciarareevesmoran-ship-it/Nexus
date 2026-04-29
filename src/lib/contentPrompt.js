// Single source of truth for the structured-content generation prompts.
// Generation is split into TWO sequential calls per section to avoid output-budget truncation:
//   Call 1 (main): expanded_explanation only (the long prose, includes inline mental-model callout)
//   Call 2 (supplementary): key_takeaways + real_world_examples + related_terms,
//     conditioned on the expanded_explanation produced by Call 1.
// Both calls are used by both "Generate Sample" and "Run Full Generation".

// ---------- Schemas ----------

export const MAIN_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    expanded_explanation: {
      type: 'string',
      description:
        'The full structured explanation, with subheadings and paragraphs separated by blank lines. Beginner topics may need 400–700 words; advanced topics may need 1500+ words. MUST NOT be empty.',
    },
  },
  required: ['expanded_explanation'],
};

export const SUPPLEMENTARY_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    key_takeaways: { type: 'array', items: { type: 'string' } },
    real_world_examples: { type: 'array', items: { type: 'string' } },
    related_terms: { type: 'array', items: { type: 'string' } },
  },
  required: ['key_takeaways', 'real_world_examples', 'related_terms'],
};

// ---------- Shared difficulty config ----------

function getTargetRange(difficulty) {
  return {
    beginner: { headers: '3–4', minWords: 400, maxWords: 700 },
    intermediate: { headers: '4–6', minWords: 700, maxWords: 1200 },
    advanced: { headers: '5–8', minWords: 1200, maxWords: 2000 },
  }[difficulty];
}

function getDepthGuidance(difficulty, t) {
  return {
    beginner:
      `Beginner level: ${t.headers} subsection headers, ${t.minWords}–${t.maxWords} words total. Paragraphs of 2–3 sentences, plain language, lots of analogies, minimal jargon.`,
    intermediate:
      `Intermediate level: ${t.headers} subsection headers, ${t.minWords}–${t.maxWords} words total. Paragraphs of 3–5 sentences, introduce technical vocabulary with brief context, balance precision with accessibility.`,
    advanced:
      `Advanced level: ${t.headers} subsection headers, ${t.minWords}–${t.maxWords} words total. Paragraphs of 4–6 sentences, deeper mechanisms, formal terminology, mathematical or quantitative detail where relevant.`,
  }[difficulty];
}

// ---------- Call 1: main content prompt ----------

/**
 * Build the prompt for Call 1 — generates ONLY expanded_explanation.
 * This call gets the full output budget so the long prose isn't truncated.
 */
export function buildMainContentPrompt(section) {
  const difficulty = section.difficulty || 'intermediate';
  const t = getTargetRange(difficulty);
  const depthGuidance = getDepthGuidance(difficulty, t);

  return `You are an expert ${section.subject || 'educator'} writing for the Nexus learning platform.

Generate the main long-form explanation for the following section. This is ONE of two calls: this call produces only the expanded_explanation. Other fields (takeaways, examples, related terms) are produced in a separate call afterwards — do NOT include them here.

Subject: ${section.subject || 'General'}
Topic: ${section.main_topic}
Section: ${section.section_number} — ${section.section_title}
Difficulty: ${difficulty}
Source definition: ${section.concise_definition}

DEPTH RULE — scale length and detail with difficulty:
${depthGuidance}
Harder sections MUST produce a longer, more detailed expanded_explanation than introductory sections. Do not artificially shorten advanced material to match beginner length.

HARD MINIMUM (${difficulty}): the expanded_explanation MUST be at least ${t.minWords} words. This is a hard floor, not a suggestion. Before returning your JSON, count the words in expanded_explanation. If the count is below ${t.minWords}, you have not finished — keep adding subsections, deeper mechanism, examples, and qualifications until you are at or above ${t.minWords} words. Target range: ${t.minWords}–${t.maxWords} words.

LENGTH PRINCIPLE — accuracy over brevity:
- Length must serve accuracy. If a concept genuinely requires more space to state correctly — including all necessary qualifications, scope limits, and exceptions — use that space. Never drop qualifications, scope limits, or exceptions in order to fit a target length. Accuracy is non-negotiable; length is negotiable.
- For advanced topics, expect that explaining a single concept correctly may require its own subsection. Do not bundle multiple distinct concepts into one paragraph just to save space. For example, hybridization, reactivity patterns, and aromaticity are three distinct concepts and should each get their own treatment if all three appear in a section.

ACCURACY RULES — strictly enforce:
- Be precise about the scope of any rule, law, or principle you cite. State exactly when the rule applies and when it does not. Do not generalize a rule beyond its actual scope. Example: Markovnikov's rule applies to addition of HX (hydrohalogenation) and acid-catalyzed hydration to unsymmetrical alkenes — not to hydrogenation or symmetric halogenation.
- When citing a formula like 4n+2, distinguish between the formula and an actual numerical count. State the count first, then note which formula it satisfies.
- When writing about Hückel's rule, always state the actual number of π electrons in the compound first (e.g., "benzene has 6 π electrons"), then note that this satisfies the formula 4n+2.
- When listing classes or categories, count them. Do not say "four major types" and then list five. The number you announce and the number you list must match.
- Before stating that one process or category "occurs" under certain conditions, double-check that those conditions actually produce the process. Avoid sentences that contradict themselves within the same paragraph.
- Mental models must accommodate all the cases just discussed in the section. If the section covered both chains and rings, do not use a mental model that only describes chains.
- When comparing reactivity between compound classes, be specific about which type of reactivity. Do not generalize that one class is "more reactive" than another without specifying the reaction context.
- Before finalizing, re-read each statement that begins with "follows," "obeys," "undergoes," or "is governed by." Verify that the rule or process named applies to all cases you've grouped under it. If not, narrow the statement.

FORMAT — expanded_explanation:
- Number of subsections is governed by the DEPTH RULE above (3–4 beginner, 4–6 intermediate, 5–8 advanced). Each subsection has a SUBHEADING on its own line followed by a paragraph.
- Format strictly as: "SUBHEADING\\nParagraph text." with a blank line between subsections.
- Subheadings should be short, clear questions or noun phrases (e.g. "What is an atom?", "The nucleus", "How it works", "Why it matters").
- Exactly ONE of the subsections must be the "Mental model" callout. Use the subheading "A mental model" and format the paragraph body as this exact HTML callout (replace the inner sentence(s) with the mental model for THIS section, written in your own words, 1–3 sentences):
  <div style="border: 2px solid #800020; padding: 12px; border-radius: 8px; background-color: #faf5f7;"><strong>Mental model:</strong><br/>YOUR MENTAL MODEL SENTENCES HERE</div>
- Place the mental-model subsection somewhere in the middle (not first, not last).
- Use plain, clear language. Be scientifically precise. Avoid hedging filler.

Return ONLY valid JSON matching the provided schema with the single key "expanded_explanation". The string MUST NOT be empty.`;
}

// ---------- Call 2: supplementary content prompt ----------

/**
 * Build the prompt for Call 2 — generates key_takeaways, real_world_examples, related_terms.
 * Conditioned on the expanded_explanation produced by Call 1 so the supplementary content
 * stays consistent with the actual qualifications and scope used in the main prose.
 */
export function buildSupplementaryPrompt(section, expandedExplanation) {
  const difficulty = section.difficulty || 'intermediate';

  return `You are an expert ${section.subject || 'educator'} writing for the Nexus learning platform.

You have just written the main explanation for a section. Now produce the supplementary fields — takeaways, real-world examples, related terms — based STRICTLY on what the explanation actually states.

Subject: ${section.subject || 'General'}
Topic: ${section.main_topic}
Section: ${section.section_number} — ${section.section_title}
Difficulty: ${difficulty}

THE SOURCE EXPLANATION (your single source of truth — do not contradict it, do not generalize beyond it):
"""
${expandedExplanation}
"""

CONSISTENCY RULE — ABSOLUTELY MANDATORY:
Your takeaways, examples, and term list must match the qualifications and scope used in the source explanation above. Do NOT generalize beyond what the explanation states. If the explanation says "Markovnikov's rule applies to HX addition to unsymmetrical alkenes," your takeaway must NOT say "addition reactions follow Markovnikov's rule." If the explanation states a count (e.g. "benzene has 6 π electrons, satisfying 4n+2"), your takeaway must use that same count-first phrasing. If the explanation lists 5 types of something, do not summarise them as "four types."

Before writing each takeaway, ask: "Is this faithful to a sentence in the source explanation, or am I overgeneralizing?" If overgeneralizing, narrow it.

Produce these three fields:

1. key_takeaways
   - 4–6 concise bullet points summarising what a student must remember.
   - Each takeaway must be supported by a specific statement in the source explanation.
   - Preserve scope qualifications (which conditions, which compound classes, which reaction type) verbatim where possible.

2. real_world_examples
   - Exactly 3 concrete, relatable real-world applications or examples that make the concept tangible.
   - Each example is a single short paragraph (1–3 sentences).
   - Examples must illustrate the concept as actually described in the source explanation, not a generalized version of it.

3. related_terms
   - 8–12 important vocabulary terms related to this section. Just the terms themselves (no definitions).
   - Terms should reflect what was actually covered in the source explanation. Use canonical scientific spelling.

Return ONLY valid JSON matching the provided schema. All three arrays must be non-empty.`;
}