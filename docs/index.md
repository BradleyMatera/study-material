# Speechify Assessment Hub (TypeScript)

This is the homepage for your live tutorial site. Keep it open during prep and on assessment day. Every checklist explains **what to do, why you’re doing it, and what “done” should look like.**

## Pre-Flight Checklist (Talk It Through)
1. **Access** – “Chrome open? GitHub signed in? SSH works:” `ssh -T git@github.com`.
2. **Runtime** – “`node -v` and `tsc -v` both respond. Using LTS Node.”
3. **Workspace** – “VS Code loaded this repo. `.vscode/settings.json` confirms Copilot is disabled.”
4. **Instructions** – “Timer not started yet. I will read the entire prompt once before typing.”
5. **High-Level Plan** – “Tokenize → Parse → Validate → Transform → Tests → README.”

> **Why these steps?** You’re proving to yourself that the environment is ready and you fully understand the assignment before touching code. That keeps you from wasting time on avoidable errors.

## Understanding The Rules (Plain English)
- **Language**: TypeScript on Node. Use the standard library plus anything already in the repo.
- **External help**: Documentation and reference material is fine. Copying code or using AI assistants is prohibited.
- **Expect ambiguity**: If the prompt doesn’t say what to do, write a reasonable assumption in the README and build to it.
- **Deliverables**: Usually code + tests + README notes. Double-check the prompt to confirm.

## What To Do When You First Read The Prompt
1. Highlight key phrases like “input is a single file,” “output must be JSON,” “handle invalid SSML gracefully.”
2. Write a quick assumptions section in the README. Example:
   - “Assume input is valid UTF-8.”
   - “Break tags without `time` default to 500ms.”
   - “Unknown tags are ignored but logged.”
3. List the edge cases you want to test: missing closing tags, nested prosody + emphasis, invalid time value.

This upfront clarity saves you from rewriting large sections later.

## Quick Map Of The Tutorial
- **[Parsing SSML Playbook](./parsing-ssml.md)** – Step-by-step tokenizer, parser, transformer with before/after examples.
- **[DSA Patterns & Drills](./dsa-recipes.md)** – Common algorithms explained like you’re pairing with another dev.
- **[TypeScript Cheats & Templates](./language-cheats.md)** – Snippets for I/O, error handling, and string utilities.
- **[Testing & Validation Flow](./test-strategy.md)** – Sample bash commands, expected outputs, failure patterns.
- **[Daily Prep Plan](./daily-plan.md)** – Four-day repetition cycle with specific goals.
- **[Assessment Walkthrough](./assessment-guide.md)** – Timeline with sample notes and checkpoints.
- **[Make It Real Demo](./make-it-real.md)** – Buttons, voice playback, and deployment walkthrough to wow reviewers.

## Example: First Ten Minutes Of Practice
1. Read this page out loud and tick through the checklist.
2. Jump to the SSML playbook and read the tokenizer example.
3. Type the tokenizer from scratch in `src/ts/tokenizer.ts`.
4. Run `npm run build && printf '<speak>Hello</speak>' | node dist/main.js`.
5. Note the result: should print a placeholder TEXT token for now.
6. Log what worked and what failed in README → Practice Log.

## On Test Day (Micro Script)
1. Clone the repo they give you, run `npm install`, `npm run build`.
2. Recreate your assumptions section in their README so you don’t forget the plan.
3. Implement the tokenizer first; it unlocks everything else.
4. Run tests and log output after every major step. Failures tell you where to look.
5. With 15 minutes left, stop adding features—stabilize, document, and prepare for submission.

You’re in control. Keep the notes open, keep speaking your plan, and keep moving forward.
