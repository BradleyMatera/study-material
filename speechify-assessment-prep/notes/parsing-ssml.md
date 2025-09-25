# Parsing SSML
Use this as your how-to blueprint—no copy/paste code, just the sequencing you will re-type.

## Core Flow
1. **Tokenizer**
   - Walk the string char by char.
   - On `<` decide whether it is an open (`<tag ...>`), closing (`</tag>`), or self-closing (`<tag ... />`).
   - Parse tag name + attributes for OPEN/SELF, emit tuples: `("OPEN", tag, attrs)` etc.
   - Between `<` tokens, collect raw text and emit `("TEXT", text)`.
2. **Parser (stack)**
   - Maintain a stack of nodes. Push on OPEN, pop on CLOSE, append to children/top.
   - SELF nodes append immediately; TEXT concatenates onto `stack[-1]["text"]`.
3. **Validate**
   - Ensure closing tag matches the current stack top.
   - Check allowed tags/attrs, time units (`ms`, `s`), numeric ranges.
   - Surface malformed tokens via exceptions early.
4. **Transform**
   - Walk tree depth-first to generate utterance steps like `{text, breakMs, emphasis, prosody}`.
   - Normalize whitespace where needed.

## Attribute Parsing (manual)
- After `<tag`, skip whitespace, collect attribute key until `=`.
- Expect opening `"`, gather chars until closing `"`.
- Store pair, skip trailing whitespace, repeat until `>` or `/>`.
- Handle optional whitespace before `/` in self-closing tags.

## Edge Cases to Drill
- Nested tags with siblings and interleaved text.
- Unknown or disallowed tags → decide whether to ignore or error.
- Missing closing tags or mismatched names.
- Attributes without quotes (treat as error).
- Literal `<` characters in text (`&lt;` or escape requirement).

## Practice Routine
- Type tokenizer twice with a timer: aim for <15 minutes each.
- Run malformed-input tests to confirm early exits.
- Rehearse attribute parser on `break` (time), `prosody` (rate/pitch), `emphasis`.
