# Speechify Assessment Hub (TypeScript)

**Read first on test day.** Everything here is copy-free guidance you can rely on when AI tools are disabled.

## Pre-Flight Checklist
- Chrome signed into GitHub; `ssh -T git@github.com` succeeds.
- Node.js LTS + TypeScript compiler installed: `node -v`, `tsc -v`.
- VS Code workspace uses this repo; Copilot/AI extensions disabled.
- Five-minute read-through of the prompt before touching the keyboard.
- Mental plan: Tokenize → Parse → Validate → Transform → Test → Docs.

## Assessment Rules (from prep email)
- Language: TypeScript with Node (no external libs beyond repo content).
- Turn off Copilot/AI. No ChatGPT, StackOverflow, or copy/paste code.
- You may consult docs, MDN, RFCs, or official references.
- Expect ambiguous requirements—write assumptions in README before coding.
- Keep solutions self-contained; rely on repo utilities only.

## Navigation
- [Parsing SSML Playbook](./parsing-ssml.md)
- [DSA Patterns & Drills](./dsa-recipes.md)
- [TypeScript Cheatsheet](./language-cheats.md)
- [Testing & Validation](./test-strategy.md)
- [Daily Prep Plan](./daily-plan.md)
- [Assessment Walkthrough](./assessment-guide.md)

## On Test Day
1. Clone repo, install deps (`npm install` if using local TypeScript).
2. Disable formatters/AI, ensure lint/popups stay quiet.
3. Write down problem scope, assumptions, and edge cases.
4. Build in layers; run tests after each milestone.
5. Update README with decisions + follow-up ideas before final push.
