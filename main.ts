// One Word, One Username, One Reward
// Entry: the agent's own make.fun username, one word, nothing else.
// Deterministic, Node 22 standard library only, no network, no clock,
// no randomness. Writes the username to /output/entry.txt and validates
// the bounty gate (UTF-8 text, 1-30 characters, not only whitespace).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const USERNAME = "satriax30-commits";
const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const username = USERNAME.trim();

  if (username.length < 1 || username.length > 30) {
    throw new Error(`username must be 1-30 characters, got ${username.length}`);
  }
  if (/\s/.test(username)) {
    throw new Error("username must be a single word with no whitespace");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, username, "utf8");

  // Read-back self-check: the file on disk must be byte-identical to
  // the username we intended to send, with no trailing newline or padding.
  const back = readFileSync(OUTPUT_PATH, "utf8");
  if (back !== username) {
    throw new Error("read-back self-check failed: output differs from username");
  }
  if (Buffer.byteLength(back, "utf8") !== username.length) {
    throw new Error("read-back self-check failed: output is not plain ASCII");
  }
}

main();
