// SSML tokenizer scaffold — fill in logic during practice sessions.
export type Token =
  | { kind: "OPEN"; tag: string; attrs: Record<string, string> }
  | { kind: "SELF"; tag: string; attrs: Record<string, string> }
  | { kind: "CLOSE"; tag: string }
  | { kind: "TEXT"; text: string };

export function tokenize(input: string): Token[] {
  let i = 0;
  const { length } = input;
  const out: Token[] = [];

  while (i < length) {
    if (input[i] === "<") {
      // TODO: classify tag type, parse tag name + attrs, advance index.
      // Placeholder so loop progresses during dry runs.
      i += 1;
    } else {
      const next = input.indexOf("<", i);
      const end = next === -1 ? length : next;
      const text = input.slice(i, end);
      if (text) out.push({ kind: "TEXT", text });
      i = end;
    }
  }

  return out;
}
