#!/usr/bin/env node
import { program } from "commander";
import bigCliName from "../utils/bigCliName.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { registerCommands } from "../caller/registerCommands.js";
import { generateExpress } from "../generators/express.js";
import { generateVue } from "../generators/vue.js";
import { generateReact } from "../generators/react.js";
import updateChecker from "../utils/updateChecker.js";

program.name("hcli").version("1.3.2").addHelpCommand(false);

// CHECK UPDATE BEFORE ANYTHING
updateChecker();

// REGISTER DIRECT COMMANDS
registerCommands();

async function run() {
  try {
    // DIRECT MODE
    if (process.argv.length > 2) {
      await bigCliName();
      program.parse();
      return;
    }

    // INTERACTIVE MODE
    await bigCliName();

    const { generator } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the generator for using:",
        name: "generator",
        choices: [
          "Express.JS generator",
          "Vue.JS generator",
          "React generator",
        ],
      },
    ]);

    const { projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Write your project name:",
        validate: (input) =>
          input.trim() !== "" ? true : "Project name cannot be empty",
      },
    ]);

    switch (generator) {
      case "Express.JS generator":
        generateExpress(projectName);
        break;

      case "Vue.JS generator":
        generateVue(projectName);
        break;

      case "React generator":
        generateReact(projectName);
        break;
    }
  } catch (err) {
    // CTRL+C HANDLING
    if (err.name === "ExitPromptError") {
      console.log(chalk.red("\nProcess canceled by user (Ctrl+C)."));
      process.exit(0);
    }

    console.log("Unexpected error:", err);
  }
}

run();
