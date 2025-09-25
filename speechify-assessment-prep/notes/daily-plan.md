# Daily Prep Plan (TypeScript)
Cycle through these four focused days leading up to the assessment.

## Day 1 — Environment & Tokenizer Basics
- Clone repo, run `npm install` (if using local TypeScript), verify `tsc -v`.
- Configure VS Code using `.vscode/settings.json`; disable AI helpers.
- Type tokenizer text-capture path (`TEXT` tokens) twice without referencing code.
- Review SSML docs focusing on tag catalogue and attribute semantics.

## Day 2 — Attributes, Stack Parser, Error Paths
- Implement attribute scanner + tag classification from memory.
- Build stack-based parser with validation for mismatched tags.
- Add at least four bash tests (nested, malformed, unknown tag, attribute parsing).
- Record tricky edge cases in README.

## Day 3 — Transform & End-to-End Tests
- Implement transformer to produce `{ text, breakMs, ... }` steps.
- Handle context propagation (emphasis/prosody) via shallow copies.
- Run a 90-minute mock: tokenizer → parser → transform + one DSA drill.
- Summarize learnings/optimizations in README.

## Day 4 — Dress Rehearsal
- Skim all notes; resist the urge to code.
- Verify tooling: `node -v`, `tsc -v`, `git status`, screen-sharing setup.
- On start signal: read prompt 5 minutes, outline tasks, then execute in focused loops.
- Commit frequently with descriptive messages; keep README updated with assumptions.
