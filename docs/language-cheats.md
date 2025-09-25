# TypeScript / Node Cheats & Snippets
Use this as your “don’t blank on syntax” deck. Every item includes what to say out loud and a short example so you can picture the shape before typing.

## Reading and Writing Data
- **Read stdin** (entire file or piped input)
  ```ts
  import { readFileSync } from "fs";
  const input = readFileSync(0, "utf8");
  ```
  Say: “File descriptor zero, whole thing as UTF-8.”

- **Command line args**
  ```ts
  const args = process.argv.slice(2);
  ```
  Say: “Drop node + script name, keep user args.”

- **Safe exit on error**
  ```ts
  console.error(message);
  process.exit(1);
  ```
  Say: “Log to stderr, exit non-zero so CI fails visibly.”

## Structuring Data
- **Typed attribute map**
  ```ts
  const attrs: Record<string, string> = {};
  attrs[key.toLowerCase()] = value;
  ```
  Say: “Record keeps string keys, lowercase for consistency.”

- **Context object with optional nested props**
  ```ts
  interface Context {
    emphasis?: string;
    prosody?: { rate?: string; pitch?: string; volume?: string };
  }
  ```
  Say: “Optional chaining makes it safe to read deep properties.”

- **Merging context**
  ```ts
  const next: Context = {
    ...ctx,
    prosody: { ...(ctx.prosody ?? {}), rate: attrs.rate }
  };
  ```
  Say: “Spread the old context, override only what changes.”

## Guard Clauses & Assertions
- **Custom error class**
  ```ts
  class SsmlError extends Error {
    constructor(message: string, public position: number) {
      super(message);
      this.name = "SsmlError";
    }
  }
  ```
  Say: “Attach position so I know where it blew up.”

- **Assertion helper**
  ```ts
  function assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw new SsmlError(message, -1);
  }
  ```
  Say: “Use it right before I rely on a value.”

## String Helpers You’ll Use Constantly
```ts
const collapseWhitespace = (text: string) => text.replace(/\s+/g, " ").trim();
const isLetter = (ch: string) => /[a-z]/i.test(ch);
const sliceUntil = (str: string, start: number, stopChar: string) => {
  const end = str.indexOf(stopChar, start);
  return end === -1 ? str.slice(start) : str.slice(start, end);
};
```
Say: “Whitespace collapse cleans up TEXT nodes; sliceUntil helps with attributes.”

## Time Parsing Examples
```ts
function parseTime(value: string): number {
  if (value.endsWith("ms")) return Number.parseFloat(value.slice(0, -2));
  if (value.endsWith("s")) return Number.parseFloat(value.slice(0, -1)) * 1000;
  throw new SsmlError(`Unsupported time format: ${value}`, -1);
}

parseTime("750ms"); // 750
parseTime("1.2s");  // 1200
```
Say: “Support ms and s, everything else is a hard error.”

## Quick Inline Tests (Node assert)
```ts
import { strict as assert } from "assert";
assert.equal(parseTime("500ms"), 500);
assert.equal(parseTime("1.5s"), 1500);
assert.throws(() => parseTime("42"));
```
Say: “Three-line sanity check, no external libs.”

## CLI Snippets You’ll Repeat
```bash
# Compile TypeScript
npm run build

# Pipe SSML through your program
printf '<speak>hi</speak>' | node dist/main.js

# Log tokens while debugging
DEBUG=tokenizer node dist/main.js < sample.ssml
```
(Implement your own DEBUG flag if you want; remember to remove noisy logs before final submission.)

Keep this page high-level. If you feel the need to copy/paste code from here, stop and re-type it instead—the goal is to recognize the shape and speak it while you write it.
