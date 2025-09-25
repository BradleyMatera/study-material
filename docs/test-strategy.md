# Testing & Validation Strategy (Speak Your Checks)
You don’t need Jest or fancy tooling—just Bash, Node, and a clear idea of what “correct” output looks like. This page shows you **what to run, what the output should look like, and how to reason about failures.**

## Default Test Loop
Say this out loud before each run:
1. “Build fresh TypeScript.” → `npm run build`
2. “Run the script with sample input.” → `printf "..." | node dist/main.js`
3. “Scan for markers.” → `grep` for expected text/JSON keys.
4. “Log failures loudly and exit non-zero.”

## `tests/run_ts.sh` Explained
```bash
#!/usr/bin/env bash
set -euo pipefail

tsc --pretty false >/dev/null

pass=0; fail=0

run_case() {
  local name="$1" input="$2" expect="$3"
  local got
  got=$(printf "%s" "$input" | node dist/main.js)
  if printf "%s" "$got" | grep -q "$expect"; then
    echo "OK  - $name"
    pass=$((pass + 1))
  else
    echo "FAIL- $name"
    echo "got: $got"
    echo "exp: $expect"
    fail=$((fail + 1))
  fi
}
```
**What to say while reading:** “Compile once, run case, grep, report, keep score.”

### Add Real Cases (examples)
```bash
run_case "text only" "<speak>Hello</speak>" "Hello"
run_case "break tag" "<speak>Hi<break time=\"300ms\"/></speak>" "breakMs": 300
run_case "nested prosody" "<speak><prosody rate=\"slow\">Calm</prosody></speak>" "\"rate\": \"slow\""
run_case "missing close" "<speak><emphasis>Oops" "Unclosed tag"
```

> **Tip:** Use distinctive substrings (`"rate": "slow"`) instead of full JSON to keep the grep simple.

## Manual Spot-Check Commands
Run these between script executions to sanity-check individual stages:
```bash
# 1. Raw run of your compiled script
printf '<speak>hi</speak>' | node dist/main.js

# 2. See what happens on malformed input
printf '<speak><break>' | node dist/main.js || echo "expected failure"

# 3. Inspect intermediary tokens (add temporary logging)
DEBUG=tokens printf '<speak>hi</speak>' | node dist/main.js
```
Make sure to remove temporary logs once you’re confident again.

## Sample Failure Analysis (talk through it)
```
FAIL- break tag
got: {"text":"Hi"}
exp: "breakMs": 300
```
Say: “Output is missing `breakMs`. Likely the transformer skipped self-closing tags. Check `transform.ts` → break handling.”

Another example:
```
FAIL- missing close
got: (nothing returns)
exp: Unclosed tag
```
Say: “Program exited silently. Parser probably swallowed the error. Add assertion before popping stack and throw `SsmlError`.”

## Recording Results In README
After each test run, update your practice log:
```
Tests 2024-09-25
+ text only
+ nested prosody
- missing close (throws generic Error, need SsmlError)
```
This history tells reviewers you tested thoughtfully and helps you decide what to revisit tomorrow.

## Final Test Sweep Before Submission
1. `npm run build`
2. `npm test`
3. Manual run with a real SSML sample from docs (copy the text, not the code).
4. `git status` → clean? Good.
5. Mention passing tests and known gaps in README.

Testing is the guardrail that keeps you shipping with confidence. Keep speaking the script, keep adding cases, and you’ll catch regressions before they bite you.
