# DSA Patterns & Drills (TypeScript)
Keep these patterns top-of-mind. Implement each from scratch during warm-ups.

## Core Data Structures
- **Arrays & Tuples**: for sequencing, prefix sums, two pointers. Use `for (let i = 0; i < arr.length; i++)` for tight loops.
- **Maps / Objects**: frequency tables (`new Map<string, number>()`, `Record<string, number>`). Remember `map.get(key) ?? 0` idiom.
- **Sets**: membership checks, dedupe, visited tracking.
- **Stacks**: parentheses matching, tag validation (`const stack: string[] = []`).
- **Queues / Deques**: BFS, sliding window max (manual array indices or simple linked list).

## Algorithm Playbook
- **Sliding Window**: maintain `left/right` indices, update counts as window expands/shrinks.
- **Two Pointers**: sorted arrays, partitioning tasks, palindrome checks.
- **Binary Search**: monotonic predicates, numeric ranges (implement `while (lo <= hi)` loop).
- **Prefix Sums**: cumulative totals for subarray sums or difference arrays.
- **Graph Traversal**: BFS/DFS using adjacency lists; avoid recursion depth issues by preferring iterative stack.

## Drill Library
1. **Balanced Symbols**: extend SSML parser by validating `<tag>` pairs in raw strings.
2. **First Unique Character**: map counts, then second loop to find earliest index.
3. **Run-Length Encoding**: convert string to `a2b1`; ensure decoding also works.
4. **Sliding Window**: longest substring with ≤ *k* distinct characters.
5. **Binary Search Practice**: minimal feasible value problems (e.g., speaker volume threshold).
6. **Heap Optional**: implement min-heap push/pop if time allows (`class MinHeap` with array backing).

## Complexity Goals
- Target **O(n)** for scans, **O(n log n)** for sorts.
- Always state complexity in README or code comments when done.
- Document trade-offs (memory vs. speed) in your assumptions section.

## Pattern Recognition Checklist
- Nested structures? → Stack.
- Frequency analysis or dedupe? → Map/Set.
- Need ordering + counts? → Keep array plus map for counts.
- Windowed constraints? → Sliding window with adjustments on shrink.

Use these drills when you have spare prep time or need a warm-up before diving into SSML parsing.
