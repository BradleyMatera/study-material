"""Entry point wiring tokenizer → parser → transform for SSML practice."""
import sys
from tokenizer import tokenize
from parser_ import parse_nodes
from transform import to_steps


def main() -> None:
    """Read from stdin, run pipeline, print resulting steps."""
    text = sys.stdin.read()
    tokens = tokenize(text)
    root_children = parse_nodes(tokens)
    steps = to_steps(root_children)
    for step in steps:
        print(step)


if __name__ == "__main__":
    main()
