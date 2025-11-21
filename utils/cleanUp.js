import { rmSync, existsSync } from "fs";
import chalk from "chalk";

let pendingPaths = [];

export function markForCleanup(path) {
  pendingPaths.push(path);
}

export function cleanUp() {
  for (const p of pendingPaths) {
    if (existsSync(p)) {
      try {
        rmSync(p, { recursive: true, force: true });
        console.log(chalk.yellow(`Cleaned: ${p}`));
      } catch (err) {
        console.log(chalk.red(`Failed to clean: ${p}`, err));
      }
    }
  }
  pendingPaths = []; // clean list
}
