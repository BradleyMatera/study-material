# Parsing SSML (TypeScript Game Plan)
Forget memorizing code. Use this page to talk yourself through the pipeline, then type it from scratch. Keep the script conversational so you stay calm.

## Mental Model
Think of SSML as HTML-lite for voice. You read a string, convert it into tokens, stack those into a tree, and finally flatten the tree into the steps your synth cares about. Three stages:
1. **Tokenizer** — “I’m walking the string, identifying tags versus text.”
2. **Parser** — “I’m using a stack to build a little DOM.”
3. **Transformer** — “I’m translating the tree into `{ text, breakMs, prosody }` chunks.”

## Walkthrough With A Real Example
Take this snippet:
```xml
<speak>
  Hello <break time="400ms"/> world
  <prosody rate="slow">chill vibes</prosody>
</speak>
```
Say this as you work:
- “Text `\n  Hello ` → emit TEXT token.”
- “`<break time="400ms"/>` → self-closing tag with attrs.”
- “`world` → TEXT.”
- “`<prosody ...>` → OPEN, push on stack.”
- “`chill vibes` → TEXT inside prosody.”
- “`</prosody>` → CLOSE, pop.”
- “`</speak>` → CLOSE root child.”

## Tokenizer Checklist
1. Initialize `i = 0`. While `i < input.length`:
   - If current char is `<`:
     - Peek `input[i + 1]`. If `/`, this is a closing tag.
     - Otherwise read tag name: letters, digits, dash. Stop at whitespace or `>` or `/`.
     - Call `readAttributes()` until you hit `>` or `/>`.
     - If you see `/>` → emit `{ kind: "SELF", tag, attrs }`.
     - Else if it was a closing tag → emit `{ kind: "CLOSE", tag }`.
     - Else → emit `{ kind: "OPEN", tag, attrs }`.
   - If current char is not `<`:
     - Find the next `<` (or end of string), slice the text, trim only if you need to.
     - Emit `{ kind: "TEXT", text }` when text isn’t empty or pure whitespace (decide and document).
2. Advance `i` carefully: after reading a tag, make sure you land on the first character after `>`.

### Attributes Helper (Speak It Out)
- “Skip whitespace, read key until `=`.”
- “Expect double quote. If it’s missing, throw `new Error("Attribute xyz missing quotes")`.”
- “Read until next `"`, store in object (lowercase key).”
- “Skip trailing whitespace, repeat.”
- Handle XML entities if you want bonus points—document the choice either way.

## Parser Stack Script
- Start with `const root = { tag: "root", attrs: {}, children: [], text: "" }`.
- `const stack = [root];`
- For each token:
  - `OPEN`: create node, push onto parent’s `children`, push onto stack.
  - `SELF`: create node, append to `children`, do **not** push.
  - `TEXT`: append to `stack.at(-1)!.text`. Consider normalizing whitespace; document your rule.
  - `CLOSE`: assert `stack.at(-1)!.tag === token.tag`. If not, throw an error including the token index. Then `stack.pop()`.
- After the loop, assert `stack.length === 1`. Anything else means an unclosed tag.

### Validation Reminders
- Allowed tags: `speak`, `p`, `s`, `break`, `prosody`, `emphasis`, `say-as` … add to a set.
- Allowed attributes per tag: e.g., `break` → `time`, `strength`; `prosody` → `rate`, `pitch`, `volume`.
- Time parsing: support `500ms` and `1.5s`. Convert seconds → milliseconds.
- Unknown tag/attribute? Decide: ignore and warn, or throw. Whichever you do, explain it in README.

## Transform Layer Script
- Depth-first walk with `walk(node, ctx)`.
- `ctx` holds current formatting (e.g., `{ prosody: { rate: "slow" }, emphasis: "moderate" }`).
- On `break`: parse duration, push `{ breakMs }` to `steps`.
- On text: `if (node.text.trim()) steps.push({ text: cleanText(node.text), ...ctx });`
- On children: clone context with `{ ...ctx }` before recursing.
- When leaving a node, nothing special since you used cloning.

### Cleaning Text
- Collapse spaces: `text.replace(/\s+/g, " ").trim()`.
- Handle leading/trailing whitespace so output looks natural.
- If you need punctuation adjustments, document the rule (e.g., ensure period spacing).

## Error Messaging Playbook
- Use custom errors for clarity: `class SsmlError extends Error { constructor(message, public position: number) { super(message); } }`
- Include index or line/column by tracking them in tokenizer (increment line on `\n`).
- When throwing, prefer actionable wording: “Expected closing tag </prosody> but found </emphasis> at index 142.”

## Practice Routine
Say these out loud as you practice:
1. “Tokenizer dry run: tags, attributes, text—15 minutes max.”
2. “Parser dry run: open/self/close/text. Check stack every time.”
3. “Transform dry run: convert to steps, parse break time, carry context.”
4. “Error drills: feed malformed SSML and confirm the right message appears.”
5. “Document results in README: what felt slow, what needs another pass.”

You’ll know you’re ready when you can narrate the entire pipeline without looking at this page. Until then, keep rehearsing.
