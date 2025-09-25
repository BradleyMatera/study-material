# Assessment Walkthrough (90-Minute Script)
When the timer starts, follow this script. Read each section out loud so you stay deliberate and calm.

## Minute 0–5 — Read & Markup
- “No typing yet.” Skim the entire prompt once.
- Highlight required inputs/outputs, constraints, forbidden libraries.
- Open README and jot assumptions: data format, error expectations, edge cases.
- If any instruction is unclear, note the question (and how you’ll handle if unanswered).

## Minute 5–15 — Plan & Skeleton
- Outline the modules: `tokenize.ts`, `parser.ts`, `transform.ts`.
- Decide validation rules (allowed tags/attributes, default break duration, etc.).
- Draft TODO comments at the top of each file describing the steps you’ll implement.
- Say it aloud: “Tokenizer first, parser second, transform third, tests after each module.”

## Minute 15–35 — Tokenizer Implementation
- Implement text collection branch (already warmed up from practice).
- Implement tag detection, attribute parsing, and classification (OPEN/SELF/CLOSE).
- Add `SsmlError` throws for malformed tags/attributes.
- Quick manual test: `printf '<speak>hi</speak>' | node dist/main.js` to ensure no crashes.

## Minute 35–55 — Parser & Validation
- Build stack logic: push on open, append on self, append text, pop on close.
- Validate tag matches and empty stack at end.
- Decide what to do with unknown tags (ignore vs. error) and document it.
- Add bash test for nested structure and mismatched close.

## Minute 55–75 — Transformer & Context
- Traverse tree depth-first, carrying context (`prosody`, `emphasis`, etc.).
- Parse `break` times into milliseconds; guard against invalid numbers.
- Normalize text (collapse whitespace, trim edges).
- Add tests that check for `breakMs` presence and context propagation.

## Minute 75–85 — Hardening & Docs
- Expand test suite: malformed attributes, unsupported tag.
- Pipe real SSML samples and read the output—does it make sense?
- Update README with assumptions, validation strategy, and test coverage.
- Clean up logs, ensure build/tests pass.

## Minute 85–90 — Final Check & Submission
- `npm run build`, `npm test`, `git status` (expect clean or known changes only).
- Commit with a message summarizing the work, push if required.
- Re-read instructions to ensure every deliverable is satisfied (README, tests, code).
- Submit according to prompt (upload repo link, zip, etc.).

Stay vocal, stay methodical. Every minute has a job—stick to it and you’ll finish strong.
