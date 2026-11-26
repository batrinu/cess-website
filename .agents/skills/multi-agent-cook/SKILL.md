---
name: multi-agent-cook
description: >-
  Orchestrates major multi-agent overhauls, redesigns, and large builds in this
  repository using Antigravity dynamic workflows (run_workflow), structured user
  interviews, cited internet research, parallel isolated workers, and independent
  verification. Use whenever the user asks for a major styling/feature overhaul,
  asks to spawn multiple agents, asks to interview them and do cited research
  before cooking, or requests an ultracode-style multi-agent workflow.
---

# Multi-Agent Cook Playbook (Antigravity + T3 Code)

Use this 5-phase playbook when the user kicks off a major initiative (e.g., *"let's do a major styling overhaul, spawn multiple agents, ask me questions, do internet research with citations, and let's get cooking"*).

---

## Phase 1 — Discovery Interview (Before Touching Code)

1. Read `PRODUCT.md` (and any recent specs in `docs/`) silently first so you never ask questions the repo already answers.
2. Ask the user **3–6 high-leverage clarifying questions** using `ask_question` (recommended defaults first) covering only decisions that materially shape the work:
   - Scope (whole site vs. specific pages/sections; preserve copy vs. rewrite copy)
   - Visual/functional direction & reference taste (within `PRODUCT.md` constraints)
   - Risk tolerance / Git strategy (work on current branch vs. hand off to a fresh Git worktree)
   - Verification bar (build/lint only vs. visual browser walkthrough across desktop + mobile)
3. If answers reveal further critical ambiguities, do **one** concise follow-up round—don't stall forever; once aligned, move straight to Phase 2.

---

## Phase 2 — Parallel Codebase Recon + Cited Internet Research

Run codebase reconnaissance and internet research in parallel so the main thread stays lean:

1. **Codebase audit (parallel via `run_workflow` or `research` subagents):**
   - Use `type_name="research"` and `model="flash"` to keep Gemini quota low.
   - Map routes, layout shells, CSS/Tailwind tokens, typography, animations (`gsap`/`framer-motion`/`three`), and existing accessibility/responsive issues.
2. **Internet research (with mandatory citations):**
   - Use `search_web` (and `ctx7` for library/framework docs such as Tailwind CSS, Radix UI, Framer Motion, GSAP, Three.js).
   - For every recommendation drawn from the web (design references, editorial typography pairings, WCAG 2.1 AA contrast/motion patterns, library APIs), record:
     - **Source title**
     - **Direct URL** (never fabricate or drop URLs)
     - **Concrete takeaway applied to this project**

---

## Phase 3 — Reviewable Plan & Non-Overlapping Ownership

Before spawning parallel editing agents, present a concise **Execution Plan** to the user:

1. **Cited Research Summary** — bullet list of findings with clickable source links.
2. **Design / Architecture Decisions** — concrete tokens, typography, layout rhythm, and explicit confirmation of `PRODUCT.md` anti-references and WCAG 2.1 AA targets.
3. **Agent Roster & File Ownership Table** — list every phase and worker, its exact file globs (zero overlap between concurrent writers), and its model tier (`flash` vs `pro`/`inherit`).
4. **Git Safety Check** — ensure the working tree is clean (or offer a T3 Code worktree handoff if working on `main`).

Wait for a quick confirmation (unless the user already told you to proceed end-to-end without stopping).

---

## Phase 4 — Scripted Multi-Agent Execution (`run_workflow`)

Read the built-in `run-workflow` skill and write a clean Python workflow script (saved under the conversation scratch dir or `scripts/` if reusable) following this structure. See `examples/overhaul-workflow.py` for a complete template.

### Execution Rules
1. **Sequential Foundation Phase first (`phase("Foundation")`):**
   - Update shared design tokens (`index.html` fonts, `tailwind.config.js`, `src/index.css`, shared UI primitives) in a **single** agent before fanning out so parallel workers never race on global files.
2. **Parallel Implementation Phase (`phase("Implement")`):**
   - Fan out independent page/section workers using `parallel(tracks, ...)`.
   - Each worker prompt **must** include:
     - Exact files it **owns** and may edit
     - Explicit list of files it **must not** touch
     - The agreed design tokens / `PRODUCT.md` constraints
     - Requirement to return a structured JSON summary via `finish`
   - Use `workspace="inherit"` **only** when file ownership is strictly disjoint; use `workspace="branch"` when workers need independent builds/tests or might touch shared areas.
   - Use `model="flash"` for well-scoped component/section implementation; use `model="pro"` or `"inherit"` for complex hero/WebGL/layout architecture.
   - **Remember `parallel()` fail-fast:** If one worker fails, siblings are cancelled—keep prompts crisp, self-contained, and bounded.
3. **Cross-Provider Option (T3 Code):**
   - Only use T3 Code's `delegate_task` if the user explicitly asks to bring in another provider (e.g., Claude Opus/Sonnet 5.5 or Kimi Code) or wants a T3-managed worktree for a child task. Otherwise stay on native Antigravity `run_workflow` / subagents.

---

## Phase 5 — Independent Verification & Polish Loop

1. **Persistent Verifier (`model="pro"` or `"inherit"`):**
   - Create a persistent reviewer/verifier agent inside the workflow (`verifier = agent(...)`).
   - Run `npm run build && npm run lint`.
   - Audit every changed file against:
     - `PRODUCT.md` brand principles & anti-references
     - WCAG 2.1 AA contrast, `:focus-visible`, keyboard navigation, `prefers-reduced-motion`
     - Romanian diacritics and `lang="ro"` integrity
     - Responsive layout hygiene (desktop + mobile)
2. **Targeted Fix + Re-Verify:**
   - If the verifier returns blocking issues, fan out targeted fixes and ask the **same persistent verifier** to confirm every issue is resolved and `npm run build && npm run lint` pass cleanly.
3. **Visual Check (Only If Requested):**
   - If the user asked for browser verification or screenshots, start the dev server and use T3 Code's `preview_*` tools to inspect desktop + mobile viewports, then close temporary tabs before replying.
4. **Final Handoff:**
   - Deliver a concise summary with:
     - What changed (with clickable absolute file links)
     - Verification results (`build`, `lint`, accessibility/visual checks)
     - Complete **Sources & Citations** list from Phase 2
