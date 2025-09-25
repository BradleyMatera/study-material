# TypeScript / Node Cheats & Snippets
Everything here is short enough to say while you type. Use it as a refresher so you never blank on syntax.

## Basic I/O
- Read all stdin: `const input = readFileSync(0, "utf8");`
- Read CLI args: `const args = process.argv.slice(2);`
- Write to stdout: `console.log(result);`
- Exit with error: `console.error(message); process.exit(1);`

## Handy Utilities
```ts
const isLetter = (ch: string) => /[a-z]/i.test(ch);
const assert = (condition: unknown, message: string): asserts condition => {
  if (!condition) throw new Error(message);
};
```
- Say: “`assert` keeps me honest—use it on mismatched tags.”

## Working With Objects & Records
```ts
const attrs: Record<string, string> = {};
attrs[key.toLowerCase()] = value;
```
- Use `Record` when keys are strings you know at runtime.
- Use `Partial<Type>` when you build an object in stages.

## Map / Set Patterns
```ts
const seen = new Set<string>();
if (seen.has(tag)) {
  // duplicate tag logic
}

const counts = new Map<string, number>();
counts.set(tag, (counts.get(tag) ?? 0) + 1);
```
- Say: “Set for membership, Map for counts.”

## Loop Idioms
```ts
for (let i = 0; i < text.length; i++) {
  const ch = text[i];
  // ...
}

for (const token of tokens) {
  // switch on token.kind
}
```
- Prefer `for` loops when you need index control, `for..of` for collection scan.

## Error Types
```ts
class SsmlError extends Error {
  constructor(message: string, public position: number) {
    super(message);
    this.name = "SsmlError";
  }
}
```
- Throw domain-specific errors so stack traces make sense.

## String Helpers You’ll Say Often
- `text.slice(start, end)` — copy substring
- `text.trim()` — remove leading/trailing whitespace
- `text.replace(/\s+/g, " ")` — collapse whitespace runs
- `parseInt(value, 10)` — convert to number
- `Number.parseFloat(value)` — handle decimals (e.g., `1.5s`)

## Time Attribute Parsing Example
```ts
function parseTime(value: string): number {
  if (value.endsWith("ms")) return Number.parseFloat(value.slice(0, -2));
  if (value.endsWith("s")) return Number.parseFloat(value.slice(0, -1)) * 1000;
  throw new SsmlError(`Unknown time unit: ${value}`, -1);
}
```
- Say: “Support ms and s; anything else → error.”

## Quick Tests Without Frameworks
```ts
import { strict as assert } from "assert";
assert.equal(parseTime("500ms"), 500);
assert.equal(parseTime("1.5s"), 1500);
```
- Node ships with `assert`—feel free to import it for sanity checks.

Read these snippets, speak them, then close the tab and type them from memory. That’s the muscle you need on assessment day.
