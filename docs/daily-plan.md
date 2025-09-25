# Daily Prep Plan (Say-It-Out-Loud Edition)
Follow this four-day loop in the week before your assessment. Each block keeps you focused and prevents overthinking.

## Day 1 — Environment + Tokenizer Warm-Up
- “Install deps.” → `npm install`, confirm `npm run build` works.
- “Lock the workspace.” → Open `.vscode/settings.json`, make sure AI is off.
- “Tokenizer basics.” → Type just the text-capture branch (handling plain text segments). Do it twice.
- “Homework.” → Read SSML docs, list every tag + attribute you might need. Add notes to README.

## Day 2 — Attributes + Stack Parser
- “Attributes drill.” → Re-type `readAttributes` function from memory with error handling.
- “Stack parser.” → Type the OPEN/SELF/CLOSE logic, ensure mismatches throw `SsmlError`.
- “Test cases.” → Add four scenarios to `tests/run_ts.sh`: nested tags, malformed close, unknown tag, numeric attribute.
- “Reflection.” → Update README with what slowed you down and how you’ll fix it tomorrow.

## Day 3 — Transform + Mock Run
- “Transform function.” → Convert nodes into `{ text, breakMs, prosody }`. Parse `time`, clone context.
- “Mock assessment (90 min).” → Start a stopwatch, solve tokenizer → parser → transform end to end, plus one DSA drill (e.g., sliding window) in scratch file.
- “Summarize.” → Capture assumptions, open questions, and bug list in README.

## Day 4 — Dress Rehearsal
- “Skim notes only.” No coding unless something is broken.
- “Tech check.” → `node -v`, `tsc -v`, `npm test`, screen share sound/video if required.
- “Game plan.” → Outline the order you’ll implement on the real day (speak it out loud).
- “Rest.” → Close laptop, sleep, hydrate. Fresh brain beats more practice.

Repeat as needed. The goal is smooth repetition, not heroics. When the real assessment starts, you’ll already know exactly what to do.
