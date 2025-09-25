# Testing & Validation Strategy (TypeScript)
Fast, deterministic checks using only built-in tooling.

## Bash Harness
- Compile with `tsc --pretty false` (wired in `tests/run_ts.sh`).
- Pipe sample input into `node dist/main.js` and grep for markers.
- Make failures loud: print actual vs. expected markers before exiting.

## Must-Have Cases
1. **Plain Text**: `<speak>hello</speak>` → outputs `hello`.
2. **Self-Closing Tag**: `<break time="500ms"/>` handled correctly.
3. **Nested Tags**: emphasis + prosody combination.
4. **Malformed Input**: missing close tag should throw / log error.
5. **Attributes**: unknown attribute triggers validation path.

## Workflow
- Run tests after each milestone (tokenizer, parser, transform).
- Add new `run_case` entries to `tests/run_ts.sh` as regressions pop up.
- When debugging, print intermediate tokens/nodes to stderr (remove later).

## Manual Spot-Checks
```bash
printf "%s" "<speak><break time=\"1000ms\"/></speak>" | node dist/main.js
```

```bash
printf "%s" "<speak>hi</speak" | node dist/main.js || echo "expected failure"
```

Document pass/fail counts in README before final submission.
