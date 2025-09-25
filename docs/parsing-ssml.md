# Parsing SSML (TypeScript Game Plan)
Talk through the pipeline as you code it. Each section below tells you **what to do, why it matters, the exact data shape you should produce, and a sample you can mimic.**

## Overview: Three Stages
1. **Tokenizer** – walks the raw string and emits tokens.
2. **Parser** – turns tokens into a tree using a stack.
3. **Transformer** – walks the tree and creates the final “utterance steps.”

You’ll implement each stage in its own file so bugs are easy to isolate.

---

## 1. Tokenizer
**Goal:** Convert SSML text into tokens shaped like `{ kind, tag?, attrs?, text? }`.

### Example Input
```xml
<speak>Hello <break time="400ms"/> world<prosody rate="slow">chill</prosody></speak>
```

### Expected Tokens (say them out loud)
```
OPEN  speak            {}
TEXT  "Hello "
SELF  break            { time: "400ms" }
TEXT  " world"
OPEN  prosody          { rate: "slow" }
TEXT  "chill"
CLOSE prosody
CLOSE speak
```

### Implementation Script
1. Set `i = 0`. While `i < input.length`:
   - If you see `<`:
     - If next char is `/`, it’s a `CLOSE` token.
     - Else read the tag name (letters, digits, hyphen).
     - Call `readAttributes()` (details below).
     - If the tag ends with `/>`, emit `SELF`. Otherwise emit `OPEN`.
   - If you see anything else, read until the next `<` and emit `TEXT`.
2. Advance `i` carefully so you never re-read the same character.
3. Wrap errors in `SsmlError` with a `position` property to help debugging.

### `readAttributes` Helper
- Skip whitespace.
- Read the key until `=`.
- Expect `"`; if missing, throw `SsmlError("Attribute xyz missing quotes", i)`.
- Read until closing `"`; store `attrs[key.toLowerCase()] = value`.
- Continue until you hit `>` or `/>`.

### Extra Credit
- Track line/column numbers by incrementing counters on `\n`.
- Decode HTML entities (`&lt;`, `&gt;`, `&amp;`) if the prompt calls for it.

---

## 2. Parser
**Goal:** Convert tokens into a node tree. Each node should look like:
```ts
interface Node {
  tag: string;
  attrs: Record<string, string>;
  children: Node[];
  text: string; // text directly inside this tag
}
```

### Sample Tree (read top-to-bottom)
```
root
 └── speak
     ├── TEXT: "Hello "
     ├── break
     ├── TEXT: " world"
     └── prosody (attrs: { rate: "slow" })
          └── TEXT: "chill"
```

### Stack Process
1. Start with `root` node on the stack (`stack = [root]`).
2. For each token:
   - `OPEN`: create a child node, push it onto parent’s `children`, then push onto stack.
   - `SELF`: create a child node, append to `children`, do **not** push.
   - `TEXT`: append to `stack.at(-1)!.text`.
   - `CLOSE`: verify `stack.at(-1)!.tag === token.tag`; if not, throw `SsmlError("Expected </${stackTop}> but found </${token.tag}>", position)`. Then pop.
3. After the loop, assert `stack.length === 1`. If not, the input had an unclosed tag.

### Validation Hooks (pick the ones you need)
- Allowed tags set: `{ speak, p, s, break, prosody, emphasis, say-as }`.
- Allowed attributes per tag: e.g. `break` → `{ time, strength }`.
- Detect nested tags that violate rules (if the prompt specifies any).
- Record warnings for unknown tags rather than throwing if the prompt prefers leniency.

Document whatever policy you choose in the README so reviewers know it was intentional.

---

## 3. Transformer
**Goal:** Produce an array of steps for speech playback. Shape each step like:
```ts
interface Step {
  text?: string;
  breakMs?: number;
  emphasis?: string;
  prosody?: { rate?: string; pitch?: string; volume?: string };
}
```

### Example Output For The Sample Tree
```js
[
  { text: "Hello" },
  { breakMs: 400 },
  { text: "world" },
  { text: "chill", prosody: { rate: "slow" } }
]
```

### Traversal Script
1. Define `walk(node, ctx)` where `ctx` is the current formatting context (e.g., `{ emphasis: "moderate" }`).
2. If the node is `break`, parse `time`:
   ```ts
   function parseTime(value: string): number {
     if (value.endsWith("ms")) return Number.parseFloat(value.slice(0, -2));
     if (value.endsWith("s")) return Number.parseFloat(value.slice(0, -1)) * 1000;
     throw new SsmlError(`Unsupported time format: ${value}`, -1);
   }
   ```
   Push `{ breakMs }` into `steps`.
3. If the node has text (after trimming), push `{ text, ...ctx }`.
4. For child nodes, call `walk(child, { ...ctx, /* updates for this tag */ })`.
   - Example: if tag is `prosody` with `rate="slow"`, new context is `{ ...ctx, prosody: { ...(ctx.prosody ?? {}), rate: "slow" } }`.
5. Run `walk` for each top-level child of the root.

### Common Transform Rules To Decide On
- Default break duration if `time` is missing (e.g., 500ms).
- How to handle whitespace-only text nodes (usually skip after trimming).
- Whether to merge adjacent text nodes (usually yes for clean output).

Write these rules in README so you can justify them during review.

---

## Debugging Tips
- Print tokens before parsing when the tree looks wrong.
- Add `console.error(JSON.stringify(node, null, 2))` inside the transformer to inspect context propagation.
- Keep `SsmlError` messages short and specific; e.g., `SsmlError: Attribute time missing quotes (index 42)`.

---

## Practice Checklist
Speak these aloud at the start of each drill:
1. “Tokenizer: emit OPEN/SELF/CLOSE/TEXT exactly like the sample.”
2. “Parser: stack never lies; unmatched tags throw immediately.”
3. “Transformer: break → milliseconds, text → trimmed string, context → cloned.”
4. “Tests: add a case for each bug I fix.”

When you can produce the tokens, tree, and steps from memory for the sample input above, you’re ready to handle whatever SSML they throw at you.
