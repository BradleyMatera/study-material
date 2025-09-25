# Assessment Walkthrough (90-Minute Script)
Read this section out loud when the timer starts. Each block explains **what to do, why it matters, and an example of what you should write down**.

## Minute 0–5 — Read, Mark, Understand
- **Do**: Read the entire prompt without typing.
- **Why**: You need the full contract (inputs, outputs, constraints) before committing to code.
- **Example Notes** (add to README):
  - “Input: SSML string from stdin.”
  - “Output: JSON array of steps printed to stdout.”
  - “No external libraries allowed.”
  - “Assume unknown tags → ignore but log warning.”

Highlight (or note) exact phrases like “must handle invalid SSML gracefully.” That’s the reviewer telling you what to prove.

## Minute 5–15 — Plan & Skeleton
- **Do**: Outline the modules and validations.
- **Why**: A roadmap prevents thrashing when the clock is ticking.
- **Example TODOs** to drop at top of files:
  - `tokenizer.ts`: `// TODO read tag name`, `// TODO parse attributes`, `// TODO emit SsmlError on malformed input`
  - `parser.ts`: `// TODO enforce stack matches`, `// TODO handle unknown tag policy`
  - `transform.ts`: `// TODO parse break time`, `// TODO carry prosody context`
- Write a short bug list you’ll check later (e.g., “Handle &lt; entity if time permits”).

## Minute 15–35 — Tokenizer Implementation
- **Do**: Implement the full tokenizer logic.
- **Why**: Parser and transformer depend on tokens; without them you’re stuck.
- **Steps**:
  1. Text branch working? Confirm by printing tokens for simple input.
  2. Tag classification? Test `<tag>`, `</tag>`, `<tag/>`, `<tag attr="v"/>`.
  3. Attribute parsing? Ensure missing quotes throw `SsmlError`.
- **Manual Test**: `printf '<speak>hi</speak>' | node dist/main.js` (temporarily log tokens).

## Minute 35–55 — Parser & Validation
- **Do**: Build stack-based parser with your validation rules.
- **Why**: The tree drives the transformer; catching mismatched tags saves time later.
- **Steps**:
  1. Create root, loop tokens, push/pop stack.
  2. Throw `SsmlError` on mismatched closing tag (include token index from tokenizer).
  3. Apply allowed-tag policy (ignore vs. error) and note decision in README.
- **Test Harness**: add case to `run_ts.sh`:
  ```bash
  run_case "mismatched close" "<speak><emphasis>hi</prosody></speak>" "Expected </emphasis>"
  ```

## Minute 55–75 — Transformer & Context
- **Do**: Convert nodes to playback steps.
- **Why**: This is the real deliverable reviewers care about.
- **Steps**:
  1. Implement `parseTime` for `break` tags with `ms`/`s` units.
  2. Trim text nodes, skip empty ones, merge context.
  3. Support prosody/emphasis by cloning context objects.
- **Example Output** (say it):
  ```json
  { "text": "Hello" }
  { "breakMs": 400 }
  { "text": "world", "prosody": { "rate": "slow" } }
  ```

## Minute 75–85 — Harden & Document
- **Do**: Expand tests, review errors, and write down what changed.
- **Why**: Demonstrates professionalism and helps reviewers follow your logic.
- **Checklist**:
  - Add failing inputs to `run_ts.sh` until you’re confident.
  - Manually run a real SSML snippet (copy from docs, not from this repo).
  - Update README: assumptions, supported tags, test coverage, known gaps.
- **Sample README entry**:
  ```
  ## Assumptions
  - Unknown tags are ignored but logged to stderr.
  - Break without `time` defaults to 500ms.

  ## Tests Run
  - npm test (4 cases)
  - Manual: prosody + emphasis sample from AWS docs
  ```

## Minute 85–90 — Final Sweep & Submission
- **Do**: Clean up, verify, and hand off.
- **Why**: Prevents last-minute mistakes (dirty git tree, failing tests).
- **Checklist**:
  1. `npm run build`
  2. `npm test`
  3. `git status` (expect clean)
  4. Commit & push if required
  5. Re-read prompt to ensure every deliverable is satisfied
- **Submission Note**: If they require a summary, repeat your README highlights (assumptions, tests, edge cases handled).

Throughout the session, narrate what you’re doing: “Implementing tokenizer attributes now,” “Parser catching mismatched tags,” “Transformer output matches sample.” Speaking keeps you deliberate and calm.
