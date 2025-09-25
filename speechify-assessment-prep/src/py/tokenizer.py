"""SSML tokenizer scaffold—flesh out during practice by typing logic from memory."""
from __future__ import annotations

from typing import Dict, List, Tuple, Union

Token = Tuple[str, Union[str, Dict[str, str]], Union[Dict[str, str], None]]


def tokenize(s: str) -> List[Tuple]:
    """Convert raw SSML into token tuples (OPEN, CLOSE, SELF, TEXT).

    The heavy lifting (tag/attribute parsing) is left for assessment practice.
    """
    i, n = 0, len(s)
    out: List[Tuple] = []
    while i < n:
        if s[i] == "<":
            # TODO: determine open vs close vs self-close, parse tag + attrs.
            # Placeholder increment so the loop advances during dry runs.
            i += 1
        else:
            j = s.find("<", i)
            if j == -1:
                j = n
            text = s[i:j]
            if text:
                out.append(("TEXT", text))
            i = j
    return out
