---
name: Nexus project overview
description: Learning platform structure, pages, components, Base44 dependencies and migration plan
type: project
---

Nexus is an AI-powered learning platform (React + Vite + Tailwind + shadcn/ui), exported from Base44. Currently only has Chemistry content. Migrating off Base44 to Supabase (auth + DB) + static JSON content.

**Why:** User is migrating off Base44 to reduce costs and own the stack as a non-technical founder building an MVP.

**Migration decisions made:**
- Auth → Supabase Auth
- Database → Supabase Postgres (5 tables: user_profiles, user_progress, user_bookmarks, user_notes, term_definitions)
- Learning content → static JSON files built manually (NOT generated via LLM at runtime)
- ContentGenerator page → DELETE ENTIRELY (not needed)
- base44.integrations.Core.InvokeLLM → only used in RelatedTermTag.jsx (on-demand term definitions) and ContentGenerator (being deleted). RelatedTermTag needs its own replacement LLM call; ContentGenerator just gets deleted.
- AiTutor → currently simulated (no real LLM), leave as-is for MVP

**How to apply:** ContentGenerator.jsx should never be touched/preserved — it's being deleted. Static JSON replaces the LearningContent DB table entirely. When working on LLM features, only RelatedTermTag.jsx needs attention.
