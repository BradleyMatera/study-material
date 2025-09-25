# Speechify Assessment Prep (TypeScript)

This repo is your spoken-out-loud tutorial for the Speechify SSML + DSA assessment. Every page in `docs/` is written so you can literally read it to yourself during practice and on test day. No AI, no copy/paste—just clear explanations plus examples you can re-type fast.

## Why This Exists
- You only get 90 minutes. The fastest way to stay calm is to rehearse the exact moves you need.
- The challenge mixes SSML parsing with general DSA patterns. That means strings, stacks, and tight error handling.
- You are expected to write everything from scratch. So these notes describe *what to type* and *why*, not finished code.

## What Lives Where
- `docs/` → GitHub Pages site. Open it in a browser tab; it acts like your personal walkthrough.
- `src/ts/` → TypeScript scaffolding you’ll flesh out by hand (tokenizer, parser, transform).
- `tests/` → Bash harness (`run_ts.sh`) that compiles with `tsc` and pipes sample inputs.
- `.vscode/` → Workspace settings that shut down Copilot/inline AI and add a one-key test task.
- `package.json` + `tsconfig.json` → Local TypeScript toolchain so you can compile without extra setup.

## Setup in 10 Minutes
1. `npm install` to grab the local TypeScript compiler.
2. `npm run build` to produce `dist/` (so the test script has something to run).
3. `npm test` or `bash tests/run_ts.sh` to see the placeholder smoke tests fire.
4. In VS Code hit `Cmd/Ctrl + Shift + B` and pick `test:ts` for the one-key loop.
5. Push to GitHub, enable Pages with folder `/docs`, and bookmark the live URL.

## How to Use the Tutorial Site
Open your deployed GitHub Pages site and follow it section by section:
- **Start at the landing page** for the pre-flight checklist and rules.
- Jump into the **Parsing SSML Playbook** for the tokenizer/stack walkthrough with real snippets like `<speak>Hello <break time="400ms"/></speak>`.
- Use **DSA Patterns** when you need a warm-up: each pattern lists where it appears in SSML land plus a mini-example.
- The **Assessment Walkthrough** gives you a minute-by-minute game plan you can literally speak out loud.

Each page includes callouts such as “Say this out loud…” so you remember to verbalize the steps, not just skim them.

## Practicing With the Scaffolding
- Compile: `npm run build`
- Run: `printf '<speak>hello</speak>' | node dist/main.js`
- Test loop: edit → `npm run build` → `npm test`
- Treat `src/ts/*.ts` as starter files—you will delete the TODO comments and type the real logic during practice sessions.

## Deploying the Live Guide
1. `git add . && git commit -m "your message"`
2. `git push origin main`
3. GitHub → **Settings** → **Pages** → Source: *Deploy from a branch* → `main` / `docs`
4. Wait for the green “Pages build and deployment” check, then visit `https://<your-user>.github.io/study-material/`

## On Test Day (Read This Aloud)
- “Chrome? open. Node and tsc? `node -v`, `tsc -v` good. GitHub? logged in. Copilot? off.”
- “Five-minute read of prompt; highlight inputs/outputs, list assumptions in README.”
- “Implement in layers: tokenizer text → tag parsing → stack parser → transform → validation → tests.”
- “Run tests after every milestone, jot results in README, commit often.”
- “Finish with README summary: assumptions, coverage, known gaps.”

Keep this repo lean, keep the notes open, and work the plan out loud. That muscle memory is what will win the assessment.
