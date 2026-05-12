# Nexus — Claude Code Context

## What this is
Nexus is an AI-powered learning platform. Users can learn any subject from scratch in their preferred format (text, audio, video), and combine subjects into cross-disciplinary cases via the Case Builder, inspired by the Harvard Case method. There are also Live Cases built around real-world events.

## Tech stack
- React + Vite + Tailwind
- Supabase (auth + database)
- Deployed on Vercel
- No Base44 dependencies

## Key files
- `src/lib/subjects.js` — all subjects, topics, and subtopic definitions (source of truth for curriculum structure)
- `src/data/learningContent.json` — all lesson content as static JSON key-value pairs
- `src/pages/LiveCasePage.jsx` — live case content hardcoded as `LIVE_CASE_DETAILS`
- `src/lib/AuthContext.jsx` — Supabase auth
- `src/api/supabaseClient.js` — Supabase initialisation

## Content structure
Lesson content lives in `learningContent.json`. Each entry's key must exactly match the subtopic `id` defined in `subjects.js`.

Each entry follows this structure:
```json
{
  "expanded_explanation": {
    "introduction": "...",
    "section_1": { "heading": "...", "content": "..." },
    "section_2": { "heading": "...", "content": "..." },
    "section_3": { "heading": "...", "content": "..." },
    "section_4": { "heading": "...", "content": "..." }
  },
  "mental_model": { "heading": "Think of it like this", "content": "..." },
  "key_takeaways": ["...", "..."],
  "real_world_examples": [{ "title": "...", "description": "..." }],
  "related_terms": ["...", "..."]
}
```

## Design system
- Palette: cream background, burgundy primary (`#8B2A3A`, `#6B1F2A`)
- Headers: serif font
- Content column: 700px max-width
- Mental Model callout: lightbulb icon, burgundy left border, `#FAF0F2` background
- Related terms: rendered as tags

## Database (Supabase)
Five tables: `profiles`, `user_progress`, `user_bookmarks`, `user_notes`, `user_activity`. All use RLS policies scoped to `auth.uid() = user_id`. Policies must be explicit per operation (SELECT, INSERT, UPDATE, DELETE) — not just ALL.

## Conventions
- All lesson content is static JSON — no runtime API calls for content generation
- AI tutor is currently simulated
- Related term definitions are built into content JSON, no LLM lookups
- When adding new content, always check the exact key in `subjects.js` before inserting into `learningContent.json`
