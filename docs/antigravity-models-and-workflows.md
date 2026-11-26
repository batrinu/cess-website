# Google Antigravity: Effective Model & Dynamic Workflow Guide

> **Last verified against official Google Antigravity documentation:** November 26, 2026
> **Primary sources:** [`antigravity.google/docs`](https://antigravity.google/llms.txt) (`models`, `plans`, `dynamic-workflows`, `boost`, `swarm`, `teamwork`, `subagents`, `plan`, `cli/best-practices`, `cli/commands/effort`, `cli/commands/usage`, `ide/extensions/acp`, `learn/context-and-tokens`, `faq`)

This guide documents how to get the most out of your Google Antigravity subscription—specifically how to pick models, protect your rolling quota, and run **Claude Code `ultracode` / dynamic-workflow–style multi-agent automation** using Antigravity's native primitives (both standalone and inside **T3 Code** via ACP).

---

## 1. Quick Mapping: Claude Code `ultracode` → Google Antigravity

If you are coming from Claude Code's **`ultracode`** mode and **Dynamic Workflows**, Antigravity splits those capabilities into specialized primitives so you only pay the token/quota cost you actually need:

| What you want (Claude Code mental model) | Antigravity Equivalent | How it works | Plan Tier |
| --- | --- | --- | --- |
| **Scripted Dynamic Workflows** (JS orchestration script fanning out parallel subagents) | **Dynamic Workflows** (`/run-workflow` / `run_workflow` tool) | Agent writes and runs a **Python** script (`phase`, `parallel`, `pipeline`, `agent`, `trajectory`) where isolated agents return structured JSON Schema results via `finish`. | All plans |
| **`ultracode` deep reasoning** (high-effort iterative solve + self-challenge) | **Boost** (`/boost`) | Multi-agent deep reasoning pipeline (`DeepCoder` / `DeepInvestigator`) with iterative challenge/fix worker rounds and independent orchestrator verification. | Paid plans |
| **Day-to-day frontier planning + fast execution** | **Orchestrator** (model picker) | Single conversation where a frontier planner (**Neon / Carbon / Argon / Opus 5.5**) plans & reviews while a fast executor (**Hydrogen / Sonnet 5.5**) runs edits, builds, and tests—looping back on friction. | Paid Pro, Ultra, Enterprise |
| **Parallel multi-file team with live coordination** | **Swarm** (`/swarm`) | Coordinator splits work across named workers + `@verifier` + `@monitor` on a shared live message board (`@mentions`). Idle workers sleep at zero token cost. | All plans *(Preview)* |
| **Multi-day / repo-scale milestone campaign** | **Teamwork** (`/teamwork`) | Scoping interview → autonomous `Sentinel` + `Project Orchestrator` + adversarial `Critic`, `Challenger`, `Auditor`, and `Success Auditor` gates in `~/teamwork_projects/<name>`. | Paid plans |
| **Single off-thread side task** | **Subagents** (`invoke_subagent`, `.agents/agents/*.md`) | Background child session (`research`, `browser`, `self`, or custom Markdown agent) with clean context and optional Git worktree (`branch` / `share`). | All plans |

---

## 2. Official Model Lineup & Subscription Entitlements

Antigravity ties model access and quotas directly to your **personal Google AI subscription** (or Gemini Enterprise / Google Cloud Pay-As-You-Go).

### Model Availability by Plan

| Model | Free & Google AI Plus | Google AI Pro (Paid / Eligible Trial†) | Google AI Ultra | Enterprise |
| --- | :---: | :---: | :---: | :---: |
| **Gemini 4 Neon** *(default on paid plans, up to 512K context)* | ❌ | ✅† | ✅ | ✅ |
| **Gemini 4 Carbon** | ❌ | ✅† | ✅ | ✅ |
| **Gemini 4 Argon** *(retiring Nov 30, 2026\*)* | ❌ | ✅† | ✅ | ✅ |
| **Gemini 4 Hydrogen** *(default on Free/Plus/standard Pro trial)* | ✅ | ✅ | ✅ | ✅ |
| **Orchestrator** | ❌ | ✅† | ✅ | ✅‡ |
| **Gemini 3.8 Flash** *(retiring Nov 30, 2026\*)* | ✅ | ✅ | ✅ | ✅ |
| **Claude Sonnet 5.5 / Opus 5.5 (thinking)** | ❌ | ✅ (non-trial) | ✅ | ✅ |
| **Claude 4.6 / GPT-OSS-120b** *(retiring Nov 30, 2026\*)* | ✅ / ✅ | ✅ / ✅ | ❌ / ✅ | ❌ |

> **Important notes from official docs:**
> - **\*Deprecation notice (Nov 30, 2026):** **Gemini 4 Argon**, **Gemini 3.8 Flash**, **GPT-OSS-120b**, and **Claude 4.6** are scheduled for removal on **November 30, 2026**. Standardize new workflows on **Gemini 4 Neon**, **Gemini 4 Carbon**, **Gemini 4 Hydrogen**, and **Orchestrator**.
> - **†Pro Trial vs. Paid Pro:** Standard free/promotional Google AI Pro trials have lower quotas and default to **Gemini 4 Hydrogen**; full frontier Gemini 4 + Claude 5.5 access requires a paid Google AI Pro plan (or eligible premium device trial for Gemini 4).
> - **‡Enterprise Orchestrator:** Fixed to `Gemini 4 Carbon (High)` planner + `Gemini 4 Hydrogen (High)` executor. Custom planner/executor selection is available on **Google AI Pro** and **Google AI Ultra** only.
> - **ACP client note:** Over ACP (`agy acp`), Gemini models are available in every ACP client (including T3 Code). Antigravity-hosted third-party models (Claude) are only offered over ACP to JetBrains IDEs, Android Studio, Zed, and Xcode—in T3 Code, Claude runs via T3 Code's own Claude provider instead.

### Thinking / Effort Levels

Most adjustable Gemini models support **`Low`**, **`Medium`** *(default)*, and **`High`**.
**Gemini 4 Neon** and **Gemini 4 Hydrogen** also support **`Extra`** (`xhigh` in CLI, e.g., `--model gemini-4-neon-xhigh` or `--effort xhigh`).

| Effort / Thinking Level | Best Used For |
| --- | --- |
| `low` | Quick lookups, syntax checks, straightforward mechanical edits |
| `medium` *(default)* | Everyday software engineering with balanced latency and quota |
| `high` | Complex architecture, subtle bug investigations, multi-file refactors |
| `xhigh` (`Extra` on Neon & Hydrogen) | Maximum reasoning depth on the hardest problems |

> **CLI note:** Run `/effort` (interactive gauge) or `/effort <level>` to change the persistent default, or pass `--effort <level>` for a single invocation. **Orchestrator** uses a fixed reasoning budget in the CLI, so `/effort` does not apply to it.

---

## 3. Official Model-Selection Strategy (Best Value per Quota Unit)

Google's official docs recommend matching the model to the work rather than leaving a standalone frontier model on `High`/`Extra` for everything:

1. **Default for everyday engineering → `Orchestrator` (e.g., `Orchestrator (Neon)` or `Orchestrator (Carbon)`)**
   - *Why:* Orchestrator is **not** a one-shot router. Within a single turn, the planner explores read-only, drafts a concrete plan (including re-plan triggers), hands off searches/edits/builds/tests to **Gemini 4 Hydrogen**, automatically takes control back if verification fails twice or an interface surprises it, and reviews progress before wrapping up.
   - *Result:* Frontier planning quality, faster turnaround, and significantly lower quota burn than running Neon or Carbon alone.
   - *In CLI:* Run `/model` → select **Orchestrator** → press `←`/`→` (or `Tab`) to pick Planner (`Neon`, `Carbon`, or `Argon`), or launch with `agy --model "Orchestrator (Neon)"`.
   - *In Antigravity App:* Customize both planner and executor under **Settings → Models → Orchestrator Settings** (or hover **Orchestrator** in the picker to override per thread).

2. **Standalone `Gemini 4 Neon` or `Gemini 4 Carbon` (`High` / `Extra`)**
   - Reserve for tasks where **every intermediate step** needs peak single-model reasoning: designing complex distributed systems from scratch, untangling subtle race conditions, or running tricky multi-repo migrations.

3. **Standalone `Gemini 4 Hydrogen`**
   - Use for fast, well-defined work that doesn't need an upfront planning phase: package upgrades, boilerplate scaffolding, unit tests for clear functions, documentation updates, code deduplication, and quick scripts.

4. **Lighter tiers for fan-out automation (`flash_lite` / `flash` vs. `pro`)**
   - Inside **Dynamic Workflows** (`run_workflow`) and **Custom Subagents** (`.agents/agents/*.md`), explicitly set `model="flash"` or `model="flash_lite"` for high-volume file scans, audits, and mechanical edits, reserving `model="pro"` or `model="inherit"` for synthesis, architecture, and verification.

---

## 4. Subscription Quotas, Overages & Terms of Service

### How Quotas Actually Work
- **Shared model-group pools:** Models in a group (e.g., Gemini models; Claude/GPT models) share both a **5-hour rolling window** and an overarching **weekly limit** (Free and Google AI Plus refresh weekly).
- **Work-proportional consumption:** Rate limits correlate with the *amount of work done per prompt* (context size, tool calls, reasoning depth, number of active parallel workers), not a fixed message count.
- **Monitoring:**
  - In Antigravity CLI: run `/usage` (alias `/quota`) for live 5-hour/weekly quota across model groups, and `/context` to see exact token share across messages, tools, rules, skills, and MCP servers.
  - In Antigravity App: inspect baseline quota usage on the **Settings** page.
- **AI Credit Overages (Pro / Ultra):** Configure **AI Credit Overages** to:
  - **`Never`**: Hard stop at baseline quota until the 5-hour/weekly window refreshes (safest for fixed budgets).
  - **`Always`**: Automatically spill over to purchased [Google One AI credits](https://one.google.com/ai/credits) at Gemini Enterprise pricing, and switch back automatically once baseline quota refreshes.
- **No consumer BYOK:** Personal Antigravity subscriptions do not support BYOK for extra rate limits. For pure pay-per-token billing (or Google Workspace accounts), use **Pay As You Go** with a Google Cloud project (`aiplatform.googleapis.com`) or a Gemini API key in the CLI.

### Terms of Service Boundaries (Important!)
Per the [official Antigravity FAQ](https://antigravity.google/docs/faq):
- **Supported:** Using Antigravity via the official Antigravity App, Antigravity CLI (`agy`), official IDE extensions, and **ACP (`agy acp`)** in ACP-compatible clients (Zed, JetBrains, Android Studio, Xcode, VS Code ACP Client, T3 Code).
- **Not allowed on consumer plans:** Wrapping `agy -p` (headless mode) inside unauthorized third-party coding agents (e.g., Claude Code, OpenClaw, OpenCode), using unauthorized third-party tools with your Antigravity consumer login, or automating account rotation. Doing so violates Terms of Service and can lead to account suspension. If you want Gemini inside a non-ACP third-party agent, use a Gemini Enterprise or Google AI Studio API key.

---

## 5. Mastering Dynamic Workflows (`run_workflow`)

Antigravity's **Dynamic Workflows** give you deterministic, code-driven multi-agent orchestration—just like Claude Code's dynamic workflows, except powered by **Python** (Antigravity bundles its own Python 3.8+, or honors `ANTIGRAVITY_PYTHON`).

### Why Dynamic Workflows Beat One Giant Chat
- **Zero context rot:** Every child agent runs in its own clean conversation; file reads, greps, and test logs never pollute the main thread.
- **Structured contracts:** Each `agent()` requires a JSON `schema` and must return data via its `finish` tool—so your orchestration script gets typed Python dicts/lists/booleans, not prose.
- **Persistent multi-turn agents:** You can keep one agent alive across phases (e.g., a Reviewer that lists bugs in Phase 1 and verifies parallel Fixers in Phase 3 without losing its notes).
- **Reusable scripts:** Save working workflows as `.py` files in your repo (e.g., `scripts/review-changes.py`) and re-run them anytime.

### Core Python Workflow Primitives

| Primitive | What it does |
| --- | --- |
| `phase(name)` | Starts a named phase; subsequent logs and agent cards group under it. |
| `log(*args)` | Writes a line to the phase UI and returns it in the workflow summary. |
| `agent(prompt, schema, role, type_name, workspace, model)` | Defines a lazy agent. `await agent(...)` runs once; `a = agent(...)` then `await a(prompt, schema)` runs sequential turns keeping context (`del a` closes it). |
| `parallel(items, fn)` | Runs `fn(item)` concurrently and returns results in item order. **Caution:** If one item fails, all remaining concurrent items in that `parallel()` call are canceled. |
| `pipeline(items, fn)` | Runs `fn(item)` strictly sequentially (use when steps touch shared files or shared test suites). |
| `await trajectory(...)` | Reads earlier steps of the current conversation (before the workflow started) by `tools`, `types`, `min_index`/`max_index`, or `last`—great for mining a failed command output without re-running it. |
| `args`, `WORKSPACES`, `CONVERSATION_ID` | Passed-in JSON args dict, workspace directory tuple (primary first), and current conversation metadata. |

### Key `agent()` Parameters for Cost & Safety

- **`model`**: `"inherit"` *(default)*, `"flash_lite"`, `"flash"`, or `"pro"`. Use `"flash"` / `"flash_lite"` for high-fan-out read/audit/lint sweeps!
- **`type_name`**: `"self"` *(default)*, `"research"` *(built-in read-only researcher)*, or any custom agent defined in `.agents/agents/<name>.md`.
- **`workspace`**:
  - `"inherit"`: Current workspace (fine for read-only tasks or non-overlapping edits).
  - `"branch"`: Isolated Git worktree per agent (essential when parallel agents edit files and run tests simultaneously).
  - `"share"`: Separate working copy sharing the underlying repo storage.

### Pattern A: Discover → Parallel Audit (Quota-Friendly)

```python
phase("Discover")
files = await agent(
    "List all TypeScript/TSX files under src/ changed since main. Return paths only.",
    schema={"type": "array", "items": {"type": "string"}},
    type_name="research",
    model="flash",
    role="Discover changed files",
)

phase("Audit")
findings = await parallel(
    files,
    lambda f: agent(
        f"Audit {f} for accessibility, broken responsive layouts, or runtime bugs. "
        "Return a concise 1-3 bullet summary or 'OK'.",
        schema={"type": "string"},
        type_name="research",
        model="flash",
        role=f"Audit {f}",
    ),
)

for path, result in zip(files, findings):
    log(f"{path}: {result}")
```

### Pattern B: Persistent Reviewer + Parallel Fixers + Verification Loop

```python
phase("Review")
reviewer = agent(
    "You are a strict TypeScript/React code reviewer. Be specific with file paths and line numbers.",
    role="Lead Reviewer",
    model="pro",
)
issues = await reviewer(
    "Review src/components/ for state bugs, missing error boundaries, or type-safety holes. "
    "Return a list of independent, actionable issue descriptions.",
    schema={"type": "array", "items": {"type": "string"}},
)
log(f"Found {len(issues)} issue(s)")

phase("Fix")
fixes = await parallel(
    issues,
    lambda issue: agent(
        f"Fix this issue in an isolated workspace and run npm run build to verify:\n{issue}",
        schema={"type": "string"},
        role=f"Fix: {issue[:40]}",
        workspace="branch",
        model="flash",
    ),
)

phase("Verify")
all_good = await reviewer(
    f"Fix summaries:\n{fixes}\nVerify whether every issue you listed was properly addressed.",
    schema={"type": "boolean"},
)
log(f"Reviewer sign-off: {all_good}")
del reviewer
```

### Prompting Dynamic Workflows in Plain English (Including Inside T3 Code)

You don't have to write the Python by hand—even inside T3 Code (where slash commands aren't required), simply ask in plain English:

> *"Run a dynamic workflow (`run_workflow`): Phase 1 discovers every component in `src/components/`, Phase 2 audits each one in parallel using `type_name="research"` and `model="flash"` for accessibility and mobile responsiveness, and Phase 3 logs a ranked list of issues."*

To reuse a workflow later:
> *"Save that workflow script to `scripts/audit-ui.py` and run it via `run_workflow`."*

---

## 6. Choosing the Right Pattern: Decision Matrix

| Situation | Recommended Choice | Why |
| --- | --- | --- |
| Everyday feature work, bug fixes, multi-file debugging | **Orchestrator (`Neon` or `Carbon` + `Hydrogen`)** | Frontier planning + fast execution in one thread; best quota efficiency. |
| Ambiguous requirements or high-risk refactor | **`/plan`** (or ask for a plan first) → **Orchestrator** | Read-only exploration and approval before touching code. |
| One hard bug, race condition, or tricky algorithm | **`/boost`** or standalone **Gemini 4 Neon (`High`/`Extra`)** | Deep iterative challenge & verification rounds. |
| Same check/edit across N files or staged pipeline | **Dynamic Workflow (`run_workflow`)** with `model="flash"` | Clean main context, typed JSON outputs, repeatable Python script. |
| Broad task splitting cleanly across modules where agents need to talk | **`/swarm`** (with `@verifier`) | Shared board coordination; idle workers burn 0 tokens. |
| Multi-day rewrite, migration, or deep research | **`/teamwork`** | Milestone handoffs prevent context degradation; adversarial `Auditor` gates. |
| One-off side research or quick build check | **Subagent** (`research` / `self`) | Keeps main context clean without workflow overhead. |
| Cross-provider second opinion inside T3 Code | **T3 Code `delegate_task`** (e.g., Antigravity + Claude / Kimi) | Leverage another provider's quota pool or get a cross-model review in its own worktree. |

---

## 7. Context & Quota Hygiene Checklist

Official guidance from [`learn/context-and-tokens`](https://antigravity.google/docs/learn/context-and-tokens) and [`cli/best-practices`](https://antigravity.google/docs/cli/best-practices):

1. **Treat context like RAM, not a hard drive:** Never paste entire folders into chat. Use `@`-mentions (which pass file paths, not raw bytes) and let the agent read only what it needs.
2. **Always pair edits with a targeted verification loop:** Ask the agent to run a narrow check (one test file, `npm run build`, or `--bail`) so passing logs don't flood the context window and consume extra quota on every subsequent turn.
3. **Keep durable instructions in `GEMINI.md` / `AGENTS.md` and `.agents/`:**
   - Always-on rules share a **20,000-token budget** (larger files auto-demote to on-demand pointers).
   - Define reusable specialized roles in `.agents/agents/<name>.md` with explicit `model` (`flash` vs `pro`) and `tools` lists.
   - Note on custom subagents: double-check exact tool names in YAML frontmatter (an unrecognized tool name can cause a subagent to hang).
4. **Compact at milestones & branch dead ends:**
   - Run `/compact <next-focus>` after exploration or completed milestones.
   - Use `/btw <question>` for read-only tangents so they never enter main history.
   - Roll back wrong turns (`/rewind` / Revert) or start fresh threads between unrelated tasks.
5. **Trim unused MCP servers:** Antigravity lazy-loads MCP tool schemas by default; disable unused MCP servers and reserve `"eager": true` strictly for tools called on almost every turn.
6. **Commit before parallel work:** Always start from a clean `git status` before launching `workspace="branch"` workflows or `/swarm` so diffs are trivial to inspect, cherry-pick, or discard.

---

## 8. T3 Code–Specific Tips for Antigravity

When running Antigravity inside **T3 Code** (via `antigravity-acp` + the `t3-code` MCP server):

- **You have both orchestration layers available:**
  - Use **Antigravity's native `run_workflow`** for scripted Python fan-out/fan-in pipelines (great for sweeping files with `flash` / `research` agents and keeping one clean summary).
  - Use **T3 Code's `delegate_task`** when you specifically want **another provider** (e.g., Claude Opus/Sonnet 5.5 or Kimi Code to save Gemini quota or get a cross-model review) or a T3-managed Git worktree.
- **Worktree discipline:** Before running heavy parallel refactors on `main`, ask to hand the thread off to a worktree or run parallel workers with `workspace="branch"`.
- **Save Gemini quota during long sessions:** Switch the thread model picker in T3 Code to **Orchestrator (Neon)** for routine building, **Gemini 4 Hydrogen** for quick copy/CSS/test tweaks, and **Gemini 4 Neon (High/Extra)** or **Gemini 4 Carbon** only when deep reasoning is genuinely needed.

---

## 9. Ready-to-Use Setup in This Repository

This repository is pre-configured with Antigravity customizations so you can trigger multi-agent research + interview + parallel execution naturally in any T3 Code thread:

- **`GEMINI.md`** — Always-on project rules (brand constraints from `PRODUCT.md`, verification commands, citation requirement, and quota-smart model tier discipline).
- **`.agents/skills/multi-agent-cook/SKILL.md`** — Progressive-disclosure 5-phase playbook (Discovery Interview → Parallel Recon & Cited Web Research → Reviewable Plan & File Ownership → Scripted `run_workflow` Execution → Persistent Verifier Loop).
- **`.agents/skills/multi-agent-cook/examples/overhaul-workflow.py`** — Reference Python dynamic workflow template for sequential foundation + parallel track execution + independent verification.

Example prompt to trigger it in a fresh T3 Code thread:

> *"Hey Gemini, let's do a major styling overhaul for the CESS website. Spawn multiple agents to achieve this goal, ask me questions as much as needed, do internet research and cite sources, and let's get cooking."*

