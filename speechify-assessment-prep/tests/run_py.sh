#!/usr/bin/env bash
set -euo pipefail

pass=0; fail=0

run_case() {
  local name="$1" input="$2" expect="$3"
  local got
  got=$(printf "%s" "$input" | python3 src/py/main.py)
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
