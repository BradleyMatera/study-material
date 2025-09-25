"""Transformer scaffold that flattens the parsed tree into utterance steps."""
from __future__ import annotations

from typing import Any, Dict, List

Node = Dict[str, Any]


def to_steps(nodes: List[Node]) -> List[Dict[str, Any]]:
    """Depth-first traversal that produces step dictionaries."""
    steps: List[Dict[str, Any]] = []

    def walk(node: Node, ctx: Dict[str, Any]) -> None:
        tag = node.get("tag")
        if not tag:
            return
        if tag == "break":
            # TODO: parse `time` attribute into milliseconds during practice.
            steps.append({"breakMs": 500})
            return
        text = node.get("text")
        if text:
            steps.append({"text": text, **ctx})
        for child in node.get("children", []):
            walk(child, dict(ctx))

    for node in nodes:
        walk(node, {})
    return steps
