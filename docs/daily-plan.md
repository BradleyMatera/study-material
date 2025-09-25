# Daily Prep Plan (Say-It-Out-Loud Edition)
Use this four-day loop repeatedly. Each bullet tells you **what to do, why it matters, and what success looks like**. Speak the steps as you execute them.

## Day 1 — Environment + Tokenizer Warm-Up
- “Install deps.” → `npm install` — so `tsc` works offline.
- “Build once.” → `npm run build` — confirms TypeScript configuration is correct.
- “Tokenizer basics.” → Type only the TEXT-handling branch in `tokenizer.ts`. Success = piping `<speak>hello</speak>` prints a TEXT token.
- “Homework read.” → Skim official SSML docs; write a bulleted list of supported tags in README. This becomes your validation checklist tomorrow.

## Day 2 — Attributes + Stack Parser
- “Attributes drill.” → Re-type `readAttributes` with error handling. Test by feeding `<tag foo="bar">` and `<tag foo=bar>`; second case must throw `SsmlError`.
- “Stack parser.” → Implement OPEN/SELF/CLOSE handling. Success = nested sample produces a tree without errors.
- “Tests.” → Add four cases to `tests/run_ts.sh`:
  1. Nested tags (`<prosody><emphasis>`)
  2. Missing close tag
  3. Unknown tag decision (ignore or error)
  4. Attribute parsing (break time)
- “Reflection.” → Log in README: “Parser passes 3/4 tests. Unknown tags currently ignored.”

## Day 3 — Transformer + Mock Assessment
- “Transform function.” → Convert nodes into `{ text, breakMs, ... }`. Include `parseTime` helper.
- “Mock run (90 min).” → Start timer. From scratch: tokenizer → parser → transformer → tests. Also solve one DSA drill (choose from `dsa-recipes.md`).
- “Result log.” → In README, note execution time, failing cases, and what to revisit.
- “Optional stretch.” → Try parsing a real SSML sample from Amazon Polly docs and confirm output.

## Day 4 — Dress Rehearsal & Rest
- “Skim notes only.” Resist coding unless something is broken.
- “Tech check.” → `node -v`, `tsc -v`, `npm test`, screen share readiness if required.
- “Game plan dry run.” → Verbally walk through the minute-by-minute script in `assessment-guide.md`.
- “Rest + logistics.” → Set calendar reminder, charge devices, prepare quiet workspace.

Repeat the cycle if time allows. The point is to make every major task (tokenizer, parser, transform, testing) feel automatic.
