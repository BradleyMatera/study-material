# Speechify Assessment Hub (TypeScript)

Welcome to your personal study site. The idea is simple: keep this page open, read it out loud, and follow the play-by-play without relying on any AI helpers.

## Pre-Flight Checklist (Say It, Touch It, Done)
- “Browser? Chrome open. GitHub signed in. SSH check:” `ssh -T git@github.com`.
- “Runtime? `node -v` shows LTS, `tsc -v` works.”
- “Editor? VS Code using this repo. Copilot + inline suggestions disabled.”
- “Focus? Read prompt for five minutes before typing anything.”
- “Plan? Tokenize → Parse → Validate → Transform → Tests → README wrap.”

## Rules Recap From The Email
- Language is **TypeScript with Node**. Stick to standard library only.
- You **cannot** copy code from ChatGPT, StackOverflow, or any AI. You *can* look at documentation.
- Read the instructions carefully; ambiguous bits should be captured as assumptions in your README before coding.
- Work locally, commit locally, then push when the assignment asks for it.

## Quick Map Of The Notes
- 👉 [Parsing SSML Playbook](./parsing-ssml.md) — tokenizer + parser explained with real SSML snippets.
- 👉 [DSA Patterns & Drills](./dsa-recipes.md) — common algorithms plus how they surface in the challenge.
- 👉 [TypeScript Cheats & Templates](./language-cheats.md) — syntax reminders, I/O snippets, custom error helpers.
- 👉 [Testing & Validation Flow](./test-strategy.md) — how to build fast bash checks and what to look for.
- 👉 [Daily Prep Plan](./daily-plan.md) — four-day loop to lock the muscle memory.
- 👉 [Assessment Walkthrough](./assessment-guide.md) — minute-by-minute timeline for test day.

## How To Use This Site
1. **Read each section out loud.** Hearing yourself describe the steps locks them in far better than silent skimming.
2. **Mirror the phrasing in code.** Example: when the notes say “push token onto stack, assert closing tag,” literally say that while typing the function.
3. **Loop through drills.** Each page has small exercises—treat them as spoken checklists while you type.
4. **Update your README** after every practice run with what worked and what felt slow. Future-you will thank you.

## On Test Day (Short Script)
1. Clone repo → `npm install` → `npm run build`.
2. Verify tests run: `npm test` (expect break placeholder until you finish logic).
3. Outline the tokenizer on paper or in comments, then fill it in step by step.
4. Keep the stack parser tight—log tokens when something feels off.
5. Transform results, run bash tests, expand coverage, document decisions.
6. Final sweep: README summary, git status clean, push, double-check submission form.

Take a breath. You already rehearsed this. Follow the script and speak your way through the build.
