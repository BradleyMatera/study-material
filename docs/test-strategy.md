# Testing & Validation Strategy (Speak Your Checks)
Great code still needs proof. This page teaches you how to sanity-check your SSML pipeline using only Node, Bash, and your own voice.

## Test Loop Mantra
1. “Build the TypeScript.” → `npm run build`
2. “Pipe a sample through the CLI.” → `printf "<speak>hi</speak>" | node dist/main.js`
3. “Check for markers.” → `grep` for expected words or JSON keys.
4. “Log failures loudly, exit non-zero.”

## The `tests/run_ts.sh` Script
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
Say it: “Compile, run case, grep, mark pass/fail.”

Add new cases as you grow coverage:
```bash
run_case "nested prosody" "<speak><prosody rate=\"slow\">hi</prosody></speak>" "rate"
run_case "missing close" "<speak><emphasis>oops" "Unclosed tag"
```

## What To Cover
- **Happy path:** plain text, text + break, nested tags.
- **Edge path:** missing close tag, unknown attribute, malformed time string.
- **Formatting:** whitespace trimming, entity decoding if you support it.
- **Validation:** ensure errors show helpful messages (index, line, tag name).

## Manual Spot Checks
```bash
# Inspect tokens quickly
printf '<speak>hi</speak>' | node dist/main.js

# Force an error
printf '<speak><prosody>hey' | node dist/main.js || echo "expected failure"
```
Narrate what you expect *before* you run it. If the output disagrees, you already know where to dig.

## Tracking Results In README
After each session, log:
- Which cases pass.
- What broke and why.
- What to test next time.

Example entry:
> “Tokenizer handles attributes now. Missing closing tag surfaces `SsmlError: Expected </prosody>`. Need to handle `strength` attribute on `<break>` tomorrow.”

Testing is your confidence meter. Speak the checks, run them often, and never go more than a few minutes without feedback.
