# CESS Website — Project & Agent Rules

## Product & Brand Ground Truth
Always consult @PRODUCT.md before proposing or implementing UI, copy, or styling changes:
- **Brand:** CESS TRUST S.R.L. (Romanian compliance & outsourced support-services centre).
- **Tone & Personality:** Premium, confident, editorial — calm authority, evidence over adjectives, plain Romanian with correct diacritics (`lang="ro"`).
- **Hard Anti-References:** No trendy startup/crypto styling, no neon-on-dark accents, no hype copy, no emojis, no gratuitous animations, no generic SaaS card grids.
- **Accessibility:** Target **WCAG 2.1 AA** (body contrast ≥ 4.5:1, large text ≥ 3:1, visible `:focus-visible`, full keyboard operability, strict `prefers-reduced-motion` support).

## Tech Stack & Verification Commands
- **Stack:** React 19, TypeScript, Vite 7, Tailwind CSS v3, Radix UI / shadcn primitives, Framer Motion, GSAP, Lenis, Three.js.
- **Verify changes with:**
  - `npm run build` (`tsc -b && vite build`)
  - `npm run lint` (`eslint .`)

## Multi-Agent & Quota Discipline (Antigravity + T3 Code)
1. **Activate `multi-agent-cook` skill** whenever the user asks for a major overhaul, multi-agent build, deep research + implementation campaign, or says things like *"spawn multiple agents"*, *"ask me questions"*, *"do internet research and cite sources"*, or *"let's get cooking"*.
2. **Interview before big edits:** When goals, visual direction, or scope are open-ended, ask focused clarifying questions (using structured multiple-choice questions where helpful) before modifying code.
3. **Cite every external claim:** Whenever performing web research, always return real source titles and exact URLs alongside concrete takeaways.
4. **Right-size model tiers in workflows/subagents:** Use `model="flash"` (or `"flash_lite"`) and `type_name="research"` for parallel codebase scans, audits, and mechanical edits; reserve `model="pro"` / `"inherit"` for architecture, design synthesis, and final review.
5. **Prevent edit collisions:** Run shared foundation changes (tokens, Tailwind config, base CSS) sequentially first; give parallel implementation workers strictly non-overlapping file ownership (or isolated `workspace="branch"` workspaces).
6. **Respect T3 Code preview rules:** Only open or drive T3 Code's `preview_*` browser tools when the user asks for browser/visual checks or names a page/tab.
7. **See full model & workflow reference:** @docs/antigravity-models-and-workflows.md
