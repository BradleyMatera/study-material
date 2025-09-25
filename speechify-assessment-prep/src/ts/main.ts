// Entry wiring: read stdin → tokenize → parse → transform.
import { readFileSync } from "fs";
import { tokenize } from "./tokenizer";
import { parseNodes } from "./parser";
import { toSteps } from "./transform";

function main(): void {
  const text = readFileSync(0, "utf8");
  const tokens = tokenize(text);
  const children = parseNodes(tokens);
  const steps = toSteps(children);
  for (const step of steps) {
    console.log(step);
  }
}

main();
