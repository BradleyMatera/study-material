# Speechify Assessment Prep (TypeScript)

This repository is your spoken-out-loud study buddy for the Speechify SSML + DSA assessment. Every page in `docs/` is written so you can literally read it while you work. The pages explain **what to do, why it matters, and what a finished step should look like.**

## What This Repo Gives You
- **Live tutorial site** (`docs/` → GitHub Pages) with plain-language scripts you can voice while coding.
- **TypeScript starter files** (`src/ts/`) so you can rehearse the tokenizer, parser, and transformer structure without copying code.
- **Zero-dependency test harness** (`tests/run_ts.sh`) that mirrors the assessment environment.
- **VS Code workspace settings** that shut down AI helpers and map tests to `Cmd/Ctrl + Shift + B`.

## Why We Highlight Inputs, Outputs, and Assumptions
During the real assessment you have 90 minutes. The fastest way to avoid rework is to lock down the facts up front:
- **Highlight required inputs/outputs** so you don’t miss a format detail (e.g., “expects JSON array of steps”).
- **Note constraints** (time limits, forbidden libraries) before you accidentally break them.
- **Write assumptions** in the README so reviewers see your reasoning and you have a checklist to validate against.

You’ll see this pattern across the tutorial: understand the contract → state it → build to it.

## Setup Checklist (10 Minutes)
1. `npm install` – grabs the local TypeScript compiler.
2. `npm run build` – compiles `src/ts` into `dist/`.
3. `npm test` – runs `tests/run_ts.sh`; tweak as you add scenarios.
4. Publish GitHub Pages: push to `main`, then Settings → Pages → branch `main`, folder `/docs`.
5. Bookmark `https://<you>.github.io/study-material/` and keep it open during practice.

## How To Practice With The Repo
1. Open the live site next to VS Code.
2. Read the relevant section **out loud** (yes, really). Hearing yourself reinforces the steps.
3. Type the logic in `src/ts/` from scratch—no copy/paste.
4. Run `npm run build && npm test` after each milestone.
5. Capture takeaways in README under a “Practice Log” section.

### Example Practice Log Entry
```
2024-09-25 — Tokenizer Focus
✔ Handles open/self/close tags.
✔ Throws SsmlError on missing quote.
✘ Need to support &lt; entities (add tomorrow).
```

## Repo Map
```
docs/                 → Published study site
  index.md            → Landing page + rules explained
  parsing-ssml.md     → Tokenizer/parser/transform playbook with examples
  dsa-recipes.md      → Algorithms translated for web dev brain
  language-cheats.md  → TypeScript snippets and talking points
  test-strategy.md    → Bash/CLI testing tutorials with sample output
  daily-plan.md       → Four-day repetition cycle
  assessment-guide.md → Minute-by-minute script with sample notes
  make-it-real.md     → Step-by-step interactive demo guide
  demo/               → Live playground assets (HTML/CSS/JS + sample steps)
src/ts/               → Empty scaffolding to re-type your solution
  main.ts
  tokenizer.ts
  parser.ts
  transform.ts
tests/run_ts.sh       → Bash harness (edit as you add cases)
.vscode/              → Settings, tasks, and extension recommendations
package.json          → Build/test scripts
```

## Using The Tutorial Site
Each page gives you:
- **Why** the step matters during the interview.
- **What to say out loud** to stay focused.
- **Mini examples** of the input/output you should match.
- **Follow-up drills** if you finish early.

Example flow for a study session:
1. Start at `index.md` and run through the pre-flight checklist.
2. Jump to `parsing-ssml.md` and walk through the tokenizer example.
3. Code the tokenizer in `src/ts/tokenizer.ts` from scratch.
4. Run `npm run build && npm test`.
5. Flip to `test-strategy.md` if something fails and troubleshoot using the prompts.
6. Ready to impress? Head to `make-it-real.md` and build the interactive demo.

## When You Deploy To GitHub Pages
- Commit your updates: `git add . && git commit -m "Describe change"`.
- Push to `main`: `git push origin main`.
- GitHub Pages rebuilds automatically; reload the live site for the new content.

## Test Day Reminder Script
> “Laptop ready. Chrome open. GitHub logged in. `node -v`, `tsc -v` good. Copilot off. Read the full prompt for five minutes. Highlight inputs/outputs, note assumptions in README. Build tokenizer → parser → transform → tests. Document decisions, run tests, commit, push. Breathe.”

Speak it. Do it. Ship it.
