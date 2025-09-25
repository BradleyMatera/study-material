"""Stack-based parser scaffold that turns tokens into a node tree."""
from __future__ import annotations

from typing import Dict, List, Tuple

Token = Tuple[str, ...]
Node = Dict[str, object]


def parse_nodes(tokens: List[Token]) -> List[Node]:
    """Build a simple node tree from the token stream."""
    root: Node = {"tag": "root", "attrs": {}, "children": [], "text": ""}
    stack: List[Node] = [root]
    for tk in tokens:
        kind = tk[0]
        if kind == "OPEN":
            tag, attrs = tk[1], tk[2]
            node: Node = {"tag": tag, "attrs": attrs, "children": [], "text": ""}
            stack[-1]["children"].append(node)
            stack.append(node)
        elif kind == "SELF":
            tag, attrs = tk[1], tk[2]
            node = {"tag": tag, "attrs": attrs, "children": [], "text": ""}
            stack[-1]["children"].append(node)
        elif kind == "TEXT":
            stack[-1]["text"] += tk[1]
        elif kind == "CLOSE":
            tag = tk[1]
            # TODO: assert or validate that stack[-1]["tag"] == tag before popping.
            stack.pop()
        else:
            raise ValueError(f"Unknown token kind: {kind}")
    # TODO: assert len(stack) == 1 to confirm proper closure.
    return root["children"]  # type: ignore[return-value]
