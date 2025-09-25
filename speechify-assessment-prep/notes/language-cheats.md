# Language Cheats (Python)
Fast reminders only—no big code blocks.

- **Read file/stdin**: `data = sys.stdin.read()`
- **Split CLI args**: `args = sys.argv[1:]`
- **Regex search**: `import re`; `for m in re.finditer(pattern, text): ...`
- **Default dict**: `from collections import defaultdict`
- **Heap**: `import heapq`; `heapq.heappush(pq, item)`
- **Exception**: `try: ... except ValueError as exc: ...`
- **Dataclass snippet**: `from dataclasses import dataclass`
- **JSON**: `json.loads(...)`, `json.dumps(..., indent=2)`

Keep idioms minimal so you remember the shape, not exact code.
