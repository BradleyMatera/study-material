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

run_case "text only" "hello" "hello"
run_case "break" "<speak>hi<break time=\"500ms\"/></speak>" "breakMs"

echo "pass=$pass fail=$fail"
[[ $fail -eq 0 ]]
