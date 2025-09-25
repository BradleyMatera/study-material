# TypeScript / Node Cheatsheet
Minimal reminders for syntax you’ll re-type. No large code blocks.

## Runtime Essentials
- **Read stdin**: `const input = readFileSync(0, "utf8");`
- **CLI args**: `const args = process.argv.slice(2);`
- **Write file**: `writeFileSync(path, data, "utf8");`
- **Timers**: `setTimeout(() => {}, ms);` (rarely needed but know signature).

## Language Notes
- **Type assertions**: `value as string` (use sparingly).
- **Union types**: `type Token = A | B | C;`
- **Optional chaining**: `node?.children ?? []`.
- **Readonly arrays**: `readonly T[]` for emphasising immutability.
- **Enums vs. literals**: prefer string literal unions for simplicity.

## Collections
- **Map**: `const counts = new Map<string, number>();`
- **Set**: `const seen = new Set<string>();`
- **Array methods**: `arr.push(x)`, `arr.pop()`, `arr.at(-1)`, `arr.slice(start, end)`.
- **Spread clone**: `{ ...ctx }` to avoid mutating parent context.

## Error Handling
- Throw domain-specific errors: `throw new Error("Unclosed tag: <prosody>");`
- Wrap parse steps with try/catch in `main()` if you need graceful exits.
- Print to stderr via `console.error` before `process.exit(1)`.

## Testing Snippets
```bash
# Compile + run
npx tsc --pretty false
printf "%s" "<speak>hi</speak>" | node dist/main.js
```

```ts
// Simple assertion helper
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
```

## Types Utility Belt
- `interface Node { tag: string; attrs: Record<string, string>; ... }`
- `Record<string, T>` for dictionary-like shapes.
- `Partial<T>` when building incremental objects.
- `ReturnType<typeof fn>` if you need to reuse function signatures.

Review these once, then rely on memory so you can re-type quickly under pressure.
