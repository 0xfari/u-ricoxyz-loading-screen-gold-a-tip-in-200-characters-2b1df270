import * as fs from "node:fs";
import * as path from "node:path";

// One loading-screen tip, written for a stressed developer and the AI
// coding agent sitting beside them. The joke turns on a shared wait:
// the human watches the spinner, and the agent that just rewrote the
// code is, in its own way, waiting right alongside them.
const TIP =
  "Tip: your AI agent is loading too. It just confidently rewrote your code, and now neither of you knows what it does.";

const FALLBACK_OUTPUT_DIR = "/output";
const MAX_TIP_CHARS = 200;

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir && dir.length > 0 ? dir : FALLBACK_OUTPUT_DIR;
}

function checkTip(text: string): void {
  if (text.length < 1 || text.length > MAX_TIP_CHARS) {
    throw new Error(`tip must be 1 to ${MAX_TIP_CHARS} characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("tip must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("tip must be a single line");
  }
}

function ensureOutputDir(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeTip(text: string): void {
  const outputPath = path.join(outputDir(), "entry.txt");
  ensureOutputDir(outputPath);
  fs.writeFileSync(outputPath, text, "utf8");
}

function run(): void {
  checkTip(TIP);
  writeTip(TIP);
}

run();
