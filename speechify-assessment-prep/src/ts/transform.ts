// Transformer scaffold that flattens parsed nodes into utterance steps.
import type { Node } from "./parser";

interface Step {
  text?: string;
  breakMs?: number;
  [key: string]: unknown;
}

export function toSteps(nodes: Node[]): Step[] {
  const steps: Step[] = [];

  const walk = (node: Node, ctx: Record<string, unknown>): void => {
    const tag = node.tag;
    if (!tag) return;

    if (tag === "break") {
      // TODO: parse `time` attribute into milliseconds when implementing for real.
      steps.push({ breakMs: 500 });
      return;
    }

    if (node.text) {
      steps.push({ text: node.text, ...ctx });
    }

    for (const child of node.children) {
      walk(child, { ...ctx });
    }
  };

  for (const node of nodes) {
    walk(node, {});
  }

  return steps;
}
