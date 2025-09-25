# DSA Patterns
Keep these as pattern prompts—you will implement from scratch.

- **Strings**: frequency counts, dedupe via set, sliding window for substrings, run-length encoding.
- **Stacks**: parentheses/HTML balance, evaluate expressions, nested structure validation.
- **Queues/Deques**: BFS traversal, sliding window max, rate limiting.
- **Maps**: frequency counting, first unique tracking, memoization tables.
- **Arrays**: prefix sums, two pointers, binary search, partitioning.

## Decision Guide
- Nesting or balanced constructs? → Stack.
- Need counts/lookup? → Map/dict.
- Moving window over sequence? → Sliding window.
- Order + counts? → Array + map or ordered dict.
- Need O(1) membership? → Set.

## Time Targets
- Scans/validation: O(n).
- Sort + post-process: O(n log n).
- Avoid accidental O(n²) by keeping nested loops in check.

## Warm-Up Ideas
- Balance parentheses + generate error index.
- Run-length encode/decode string.
- Sliding window for longest substring <= k distinct chars.
- Build simple priority tasks (heap) if you want extra credit.
