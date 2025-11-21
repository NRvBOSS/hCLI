#!/usr/bin/env node
import { program } from "commander";
import { registerCommands } from "../caller/registerCommands.js";
import updateChecker from "../utils/updateChecker.js";
import { mainFlow } from "../flow/mainFlow.js";
import bigCliName from "../utils/bigCliName.js";
import { ensureConfigFile } from "../utils/config.js";
import "../utils/config.js";

// CLI VERSION
program.name("hcli").version("1.6.0").addHelpCommand(false);

// CHECK UPDATE BEFORE ANYTHING
updateChecker();

// REGISTER DIRECT COMMANDS
registerCommands();

// Make sure config exists
ensureConfigFile();

// START MAIN FLOW
(async () => {
  try {
    // SHOW CLI NAME / BANNER
    await bigCliName();

    // If arguments passed, parse commands (direct mode)
    if (process.argv.length > 2) {
      program.parse();
      return;
    }

    // INTERACTIVE MODE
    await mainFlow();
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log("\n" + chalk.red("Process canceled by user (Ctrl+C)."));
      process.exit(0);
    }
    console.log("Unexpected error:", err);
  }
})();
