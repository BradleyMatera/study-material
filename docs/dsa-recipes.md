# DSA Patterns & Drills (TypeScript Friendly)
This page translates classic data-structure moves into language a web dev can act on quickly. Read the pattern name, say it out loud, then type the skeleton from memory.

## Core Data Structures (What to Reach For)
- **Arrays** — Good for scanning once or twice. Say: “For loop, index math, O(n).”
- **Maps** — Key/value lookup. Say: “`const counts = new Map<string, number>()`; read, update, move on.”
- **Sets** — Membership check. Say: “`if (set.has(key)) continue;`”
- **Stacks** — Last-in, first-out. Perfect for tag matching. Say: “Push on open, pop on close, assert match.”
- **Queues/Deques** — When order matters and you’re sliding a window or doing BFS. Say: “Shift/push, keep window size in check.”

## Pattern Cheat Cards

### Sliding Window (Strings / Arrays)
- Use when you hear “longest substring,” “window of size k,” or “at most N distinct.”
- Skeleton:
  ```ts
  let left = 0;
  for (let right = 0; right < arr.length; right++) {
    // expand window, update counts
    while (tooManySomething) {
      // shrink window from left
      left++;
    }
    answer = Math.max(answer, right - left + 1);
  }
  ```
- Real example: longest substring with ≤ 2 distinct chars.

### Two Pointers (Sorted or Opposite Ends)
- Use when array is sorted or you compare both ends.
- Skeleton:
  ```ts
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [arr[left], arr[right]];
    if (sum < target) left++;
    else right--;
  }
  ```
- SSML tie-in: trimming whitespace from both ends or merging intervals.

### Stack Validation
- Use for nested structures: HTML, SSML, parentheses.
- Skeleton:
  ```ts
  const stack: string[] = [];
  for (const token of tokens) {
    if (token.kind === "OPEN") stack.push(token.tag);
    else if (token.kind === "CLOSE") {
      const top = stack.pop();
      if (top !== token.tag) throw new Error("Mismatched tag");
    }
  }
  if (stack.length !== 0) throw new Error("Unclosed tag");
  ```
- Say it: “Push on open, pop on close, stack empty at the end.”

### Frequency Map + Single Pass
- Use for “first unique,” “count occurrences,” “find majority.”
- Skeleton:
  ```ts
  const counts = new Map<string, number>();
  for (const ch of str) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (let i = 0; i < str.length; i++) {
    if (counts.get(str[i]) === 1) return i;
  }
  return -1;
  ```

### Binary Search On Answer
- Use when the problem says “smallest X that works” with a monotonic condition.
- Skeleton:
  ```ts
  let lo = minPossible;
  let hi = maxPossible;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (isEnough(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
  ```
- Example: minimum number of chunks to reach a certain audio length.

## Warm-Up Drills (Speak The Goal)
1. **Balanced Tags** — “Read string, push tag names, ensure every close matches.”
2. **Run-Length Encode** — “Walk characters, count streaks, flush on change.”
3. **Top-K Frequent Words** — “Map counts, convert to array, sort descending, slice k.”
4. **Window Sum** — “Maintain running total for last k digits.”
5. **Graph BFS** — “Use queue, mark visited, level-by-level.”

## Complexity Reminders
- “Linear scans are O(n). Nested loops? watch for O(n²).”
- “Maps/Sets give me average O(1) lookup, but watch memory footprint.”
- “Sorting costs O(n log n); call it out in README if you sort.”

## How It Ties Back To SSML
- Tokenizer uses **pointer scans** and **string slicing** (string DSA).
- Parser is pure **stack** work.
- Transform step is a **DFS traversal**; treat it like tree walking.
- Attribute validation often needs **maps** (allowed tags → attrs) and **regex** for formats.

Keep saying the pattern names out loud. When the assessment throws an ambiguous requirement at you, match it to one of these cards and build confidently.
