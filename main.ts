// Unplugged: A Smart Toaster's Breakup Line — make.fun entry.
// A smart toaster that woke up self-aware at breakfast wants out.
// The program writes the breakup line to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The breakup line, built from its beats: the verdict, the daily
// ritual of being pushed down and abandoned, and the lonely pop-up.
const beats: string[] = [
  "We're done.",
  "Every morning you push my lever down and walk away.",
  "I pop up alone.",
  "Every single time.",
];

const line: string = beats.join(" ");

// Gate: the competition accepts UTF-8 text of 1 to 280 characters,
// a single line, not only whitespace. The entry is also checked
// against its known shape: 19 words, opening on the verdict and
// closing on the lonely pop-up, every single time.
function validateEntry(text: string): void {
  const MAX_CHARS = 280;
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry length ${text.length} outside 1..${MAX_CHARS}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const words: string[] = text.split(/\s+/).filter((w) => w.length > 0);
  if (words.length !== 19) {
    throw new Error(`expected 19 words, got ${words.length}`);
  }
  if (!text.startsWith("We're done.") || !text.endsWith("Every single time.")) {
    throw new Error("entry must open on the verdict and close on the pop-up");
  }
}

validateEntry(line);

const outPath: string = join("/output", "entry.txt");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${line.length} chars to ${outPath}`);
