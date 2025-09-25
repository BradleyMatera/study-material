# Assessment Walkthrough (90 Minutes)

Use this timeline to stay on track. Adjust as needed, but keep the checkpoints.

## 0–5 min — Read & Annotate
- Skim entire prompt once, highlight required output formats and constraints.
- Capture assumptions, open questions, and sample inputs in the README.
- Identify core tasks (e.g., SSML parsing, transformations, validation, tests).

## 5–15 min — High-Level Design
- Outline tokenizer, parser, transformer responsibilities and data structures.
- Sketch TypeScript interfaces: `Token`, `Node`, `Step`.
- Decide validation strategy (mismatched tags, time parsing, unknown attributes).
- Note test cases you must cover (happy path, nested tags, malformed input).

## 15–35 min — Tokenizer Implementation
- Type the tokenizer from scratch following the playbook.
- Handle `<tag>`, `</tag>`, `<tag ... />`, attribute scanning, text collection.
- Add inline assertions for malformed sequences (missing quotes, stray `<`).
- Quick manual check with `printf '<speak>hi</speak>' | node dist/main.js`.

## 35–55 min — Parser + Validation
- Implement stack-based parser ensuring well-formed tree.
- Guard against mismatched closing tags, premature EOF, extra closing tags.
- Decide whether to ignore unknown tags or surface errors (document decision).
- Add tests covering nested structure and error handling (`tests/run_ts.sh`).

## 55–75 min — Transformation Layer
- Convert nodes to actionable steps: text segments, `break`, `prosody`, `emphasis`.
- Normalize attributes (e.g., `time="500ms"` → 500).
- Accumulate context (e.g., emphasis stack) with shallow copies.
- Add validation error reporting for unsupported values.

## 75–85 min — Tests & Polish
- Expand Bash tests with clear names and expected markers.
- Verify CLI usage (`node dist/main.js < input.txt`).
- Review assumptions / decisions in README; mention future enhancements.
- Run `git status` to ensure only intended files changed.

## 85–90 min — Final Checks
- Rerun full test script.
- Re-read prompt to ensure all deliverables satisfied.
- Commit with descriptive message, push, and copy submission instructions.
- If time remains, jot down potential optimizations or TODOs.

Stay calm and deliberate. Matching the plan matters more than finishing early.
