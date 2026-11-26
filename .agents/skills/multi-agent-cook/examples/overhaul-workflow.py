"""Reference dynamic workflow template for major multi-agent overhauls.

Run via Antigravity's `run_workflow` tool (see `.agents/skills/multi-agent-cook/SKILL.md`).
Customize `FOUNDATION_BRIEF` and `TRACKS` for the specific overhaul approved in Phase 3.
"""

FOUNDATION_BRIEF = """
Update global design tokens (index.html fonts, tailwind.config.js, src/index.css)
according to the approved overhaul plan and PRODUCT.md constraints.
Do NOT edit page components. Run `npm run build` before calling finish.
"""

TRACKS = [
    {
        "name": "Hero & Navigation",
        "files": ["src/components/Navbar.tsx", "src/components/Hero.tsx"],
        "brief": "Apply the approved editorial hierarchy, spacing, and reduced-motion safeguards.",
        "model": "pro",
    },
    {
        "name": "Services & Credibility Sections",
        "files": ["src/components/Services.tsx", "src/components/Certifications.tsx"],
        "brief": "Apply the approved typography, evidence-first layout, and WCAG 2.1 AA contrast.",
        "model": "flash",
    },
    {
        "name": "Contact & Footer",
        "files": ["src/components/Contact.tsx", "src/components/Footer.tsx"],
        "brief": "Apply the approved form clarity, focus states, tap targets, and Romanian copy checks.",
        "model": "flash",
    },
]

# Phase 1: Sequential foundation so all parallel workers share stable tokens.
phase("Foundation")
foundation_summary = await agent(
    FOUNDATION_BRIEF,
    schema={"type": "string"},
    role="Foundation Tokens & Styles",
    model="pro",
)
log("Foundation:", foundation_summary)

# Phase 2: Parallel implementation with strictly disjoint file ownership.
phase("Implement")
all_owned = {f for t in TRACKS for f in t["files"]}
impl_results = await parallel(
    TRACKS,
    lambda t: agent(
        (
            f"Track: {t['name']}\n"
            f"Files you OWN (only edit these): {t['files']}\n"
            f"Files owned by OTHER workers (do NOT edit): {sorted(all_owned - set(t['files']))}\n"
            f"Foundation already applied: {foundation_summary}\n"
            f"Instructions: {t['brief']}\n"
            "Follow PRODUCT.md strictly (no neon/startup clichés, WCAG 2.1 AA, Romanian diacritics)."
        ),
        schema={
            "type": "object",
            "properties": {
                "track": {"type": "string"},
                "changed_files": {"type": "array", "items": {"type": "string"}},
                "summary": {"type": "string"},
            },
            "required": ["track", "changed_files", "summary"],
        },
        role=f"Implement: {t['name']}",
        model=t["model"],
    ),
)
for res in impl_results:
    log(f"{res['track']}: {res['summary']}")

# Phase 3: Persistent verifier checks build, lint, a11y, and PRODUCT.md alignment.
phase("Verify")
verifier = agent(
    (
        "You are an independent QA, accessibility (WCAG 2.1 AA), and editorial design verifier. "
        "Always check PRODUCT.md compliance, Romanian diacritics, prefers-reduced-motion, "
        "and run `npm run build && npm run lint`."
    ),
    role="Independent Verifier",
    model="pro",
)

audit = await verifier(
    f"Implementation summaries:\n{impl_results}\n"
    "Run `npm run build && npm run lint`, inspect the modified files, and return any blocking issues.",
    schema={
        "type": "object",
        "properties": {
            "passed": {"type": "boolean"},
            "issues": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["passed", "issues"],
    },
)
log("Initial verification:", audit)

if not audit["passed"] and audit["issues"]:
    phase("Fix & Re-verify")
    fixes = await pipeline(
        audit["issues"],
        lambda issue: agent(
            f"Fix this verification issue cleanly without regressing other sections:\n{issue}",
            schema={"type": "string"},
            role=f"Fix: {issue[:40]}",
            model="flash",
        ),
    )
    final_check = await verifier(
        f"Fixes applied:\n{fixes}\nRe-run `npm run build && npm run lint` and confirm all issues are resolved.",
        schema={"type": "boolean"},
    )
    log("Final verification passed:", final_check)

del verifier
