import { mkdirSync, writeFileSync } from "node:fs";

// Unplugged: a smart toaster's breakup line, mid-breakfast-batch.
// The appliance logic is the character — the lever pushed down
// every morning, the toaster popping up alone, every single time.
// A clear, specific reason to leave, with no wasted words.
const breakup =
  "We're done. Every morning you push my lever down and walk away. I pop up alone. Every single time.";

// The gate: UTF-8 text, one line, 1-280 characters.
// Check the limit here so an invalid line can never ship.
const MAX_CHARS = 280;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`breakup must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("breakup must be a single line");
  }
  return line;
}

const line = oneLine(breakup);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
