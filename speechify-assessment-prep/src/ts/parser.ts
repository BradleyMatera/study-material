// Stack-based parser scaffold that turns tokens into a node tree.
import type { Token } from "./tokenizer";

export interface Node {
  tag: string;
  attrs: Record<string, string>;
  children: Node[];
  text: string;
}

export function parseNodes(tokens: Token[]): Node[] {
  const root: Node = { tag: "root", attrs: {}, children: [], text: "" };
  const stack: Node[] = [root];

  for (const token of tokens) {
    if (token.kind === "OPEN") {
      const node: Node = { tag: token.tag, attrs: token.attrs, children: [], text: "" };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else if (token.kind === "SELF") {
      const node: Node = { tag: token.tag, attrs: token.attrs, children: [], text: "" };
      stack[stack.length - 1].children.push(node);
    } else if (token.kind === "TEXT") {
      stack[stack.length - 1].text += token.text;
    } else if (token.kind === "CLOSE") {
      // TODO: assert stack top matches token.tag before popping.
      stack.pop();
    } else {
      const _exhaustive: never = token;
      throw new Error(`Unhandled token ${_exhaustive}`);
    }
  }

  // TODO: assert stack.length === 1 for well-formed input.
  return root.children;
}
