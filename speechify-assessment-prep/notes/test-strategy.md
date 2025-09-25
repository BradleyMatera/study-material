# Test Strategy
Minimal, repeatable checks you can type quickly.

- Write bash harnesses that pipe sample input into your script and grep for markers.
- Aim for coverage: plain text, nested tags, malformed input, attribute parsing, transform output.
- Keep failures loud: print both expected + actual before exiting non-zero.
- Run tests after each milestone (tokenizer, parser, transformer) and commit small.
- On assessment day, prioritize deterministic cases over exhaustive suites.

## Handy Snippets
```bash
printf "%s" "<speak>hi</speak>" | python3 src/py/main.py
```

```bash
if printf "%s" "$got" | grep -q "breakMs"; then
  echo "OK"
else
  echo "FAIL"
fi
```

Remember: no pytest/unittest needed—stick to shell + standard library.
