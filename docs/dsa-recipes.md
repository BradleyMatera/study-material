# DSA Patterns & Drills (TypeScript Friendly)
These are the building blocks you’ll actually use when parsing SSML or solving the bonus DSA task. Each pattern includes **how to recognize it, what to say to yourself, and a tiny worked example**.

## Core Data Structures
| Structure | When to grab it | Spoken reminder | Micro example |
|-----------|-----------------|-----------------|---------------|
| Array     | One or two passes over ordered data | “For loop, index math, O(n).” | Trim spaces from both ends. |
| Map       | Frequency counts, memoization       | “`counts.set(key, (counts.get(key) ?? 0) + 1)`.” | First unique character. |
| Set       | Membership checks, dedupe           | “`if (seen.has(tag)) { ... }`.” | Track open tags. |
| Stack     | Nested structures, undo/redo        | “Push on open, pop on close.” | Validate SSML tags. |
| Queue     | BFS, sliding window                 | “Shift/push, maintain window.” | Level-order traversal. |

---

## Pattern Cheat Cards

### 1. Sliding Window
**Use when**: the question says “longest/shortest substring” or “at most N distinct items.”

**Script**
```ts
let left = 0;
const counts = new Map<string, number>();
for (let right = 0; right < str.length; right++) {
  const ch = str[right];
  counts.set(ch, (counts.get(ch) ?? 0) + 1);

  while (counts.size > maxDistinct) {
    const leftChar = str[left];
    counts.set(leftChar, counts.get(leftChar)! - 1);
    if (counts.get(leftChar) === 0) counts.delete(leftChar);
    left++;
  }

  best = Math.max(best, right - left + 1);
}
```
**Say it**: “Expand with right, shrink with left when rule breaks.”

### 2. Two Pointers
**Use when**: you have a sorted array or need to converge from both ends.

**Example**: remove extra spaces around text nodes.
```ts
let start = 0;
let end = text.length - 1;
while (start < text.length && text[start] === ' ') start++;
while (end >= 0 && text[end] === ' ') end--;
const trimmed = text.slice(start, end + 1);
```
**Say it**: “Move pointers inward until condition is satisfied.”

### 3. Stack Validation
**Use when**: validating nested tags, parentheses, or indentation.

**Example**: quick SSML validator for `<tag></tag>` pairs.
```ts
const stack: string[] = [];
for (const token of tokens) {
  if (token.kind === "OPEN") {
    stack.push(token.tag);
  } else if (token.kind === "CLOSE") {
    const top = stack.pop();
    if (top !== token.tag) throw new Error(`Expected </${top}> but saw </${token.tag}>`);
  }
}
if (stack.length !== 0) throw new Error(`Unclosed tag: ${stack.at(-1)}`);
```
**Say it**: “Stack empty at the end or we missed a close.”

### 4. Frequency Map
**Use when**: counting anything—characters, tokens, attribute usage.

**Example**: first non-repeating character.
```ts
const counts = new Map<string, number>();
for (const ch of input) counts.set(ch, (counts.get(ch) ?? 0) + 1);
for (let i = 0; i < input.length; i++) {
  if (counts.get(input[i]) === 1) return i;
}
return -1;
```
**Say it**: “Count first, scan second.”

### 5. Binary Search on Answer
**Use when**: the problem asks for a minimal or maximal value that satisfies a condition.

**Example**: find minimum pause length that keeps playback under N ms.
```ts
let lo = 0, hi = 5000;
while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (canPlayWithin(targetMs, mid)) hi = mid;
  else lo = mid + 1;
}
return lo;
```
**Say it**: “Check mid, tighten range, stop when lo === hi.”

---

## Warm-Up Drills With Voice Prompts
1. **Balanced Tags** – “Push on open, pop on close, stack empty.”
2. **Run-Length Encode** – “Track streak length, flush on change, append char+count.”
3. **Top-K Words** – “Map counts, array of entries, sort desc, slice k.”
4. **Window Sum** – “Add new element, subtract left element when window too big.”
5. **BFS Traversal** – “Queue holds nodes, process level by level, push children.”

Set a timer for 10 minutes and solve one drill verbally before touching the SSML work.

---

## Complexity Reminders (State Them Out Loud)
- “This tokenizer is O(n); every character is read once.”
- “Stack operations are O(1); overall parser is O(n).”
- “Sorting steps for reporting is O(n log n); mention it if you do it.”
- “Maps/Sets cost memory but keep lookups O(1) on average.”

Document these in the README after you finish—reviewers love seeing explicit complexity analysis.

---

## Linking Patterns Back To The SSML Challenge
- **Tokenizer**: pointer math + string slicing (array + pointer patterns).
- **Parser**: stack validation pattern.
- **Transform**: depth-first traversal (like DFS). Use recursion or your own stack.
- **Validation**: frequency map to track tag/attribute usage if needed.

If a bug pops up, name the pattern out loud (“This is a stack issue”) before you dive in. It keeps troubleshooting focused.
