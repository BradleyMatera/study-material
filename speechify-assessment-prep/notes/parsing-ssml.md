# Parsing SSML (TypeScript Gameplan)
This is your how-to manual for the tokenizer + parser + validation pipeline. No code pasting—just the roadmap you will rewrite from memory.

## Tokenizer Flow
1. Iterate with index `i` over the input string.
2. Encounter `<` → determine if next char is `/` (closing) or not.
3. Read tag name (letters, digits, hyphen). Stop at whitespace, `>`, or `/`.
4. Attributes: while current char is whitespace, read `key`, expect `=`, consume quoted value, store in object.
5. If the sequence ends with `/>` → emit `SELF`. If `</tag>` → emit `CLOSE`. Otherwise `OPEN`.
6. Between tags collect raw text (`s.slice(i, nextLt)`) and emit `TEXT`.

### Implementation Tips
- Build helper functions: `readTagName()`, `readAttributes()`, `skipWhitespace()`.
- Throw descriptive errors (include index) for malformed structures.
- Normalize attribute keys to lowercase.
- Convert XML entities (`&lt;`, `&gt;`, `&amp;`) if required—document decision.

## Parser (Stack)
- Maintain `stack: Node[]` with a synthetic root.
- On `OPEN`, create node `{ tag, attrs, children: [], text: "" }`, push it.
- On `SELF`, append node but keep stack unchanged.
- On `TEXT`, append to `stack.at(-1)!.text` (normalize whitespace if desired).
- On `CLOSE`, ensure `stack.at(-1)!.tag === token.tag`, then pop.
- After iteration, assert `stack.length === 1` (root only).

### Validation Hooks
- Unknown tag? Decide: ignore vs. record warning vs. throw. Document choice.
- Attribute allowlist per tag (e.g., `break.time`, `prosody.rate`).
- Parse `time` values: support `ms`, `s`, fallback to error.
- Detect overlapping ranges (e.g., emphasis on break) as needed.

## Transform Layer Overview
- Depth-first traversal carrying context (prosody, emphasis, voice).
- Emit steps such as `{ text, breakMs, prosody: { rate }, emphasis }`.
- Collapse adjacent text nodes if needed (use `trim()` + spacing rules).
- Provide defaults: `break` without time → choose safe fallback (e.g., 500ms).

## Error Strategy
- Prefer throwing custom errors with a `kind` field so you can categorize issues.
- Surface line/column by tracking them during tokenization (increment line on `\n`).
- Document any intentionally ignored edge case in README.

## Practice Checklist
- Type tokenizer twice with a timer; target <18 minutes with zero syntax errors.
- Run malformed attribute tests (`time=500` without quotes) to confirm error handling.
- Add at least one test for nested emphasis/prosody combos.
- Review SSML docs focusing on common tags: `speak`, `break`, `say-as`, `emphasis`, `prosody`, `p`, `s`.

Stay disciplined: if bugs appear, instrument with console logs for indices and tokens before diving deeper.
