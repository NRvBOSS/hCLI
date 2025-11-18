#!/usr/bin/env node
import { program } from "commander";
import bigCliName from "../bigCliName.js";
import inquirer from "inquirer";
import chalk from "chalk";
import callExpress from "../caller/callExpress.js";
import callVue from "../caller/callVue.js";
import callReact from "../caller/callReact.js";
import { generateExpress } from "../generators/express.js";
import { generateVue } from "../generators/vue.js";
import { generateReact } from "../generators/react.js";

program.name("hcli").version("1.2.1").addHelpCommand(false);

callExpress();
callVue();
callReact();

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

    if (generator === "Express.JS generator") {
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Write your project name:",
          validate: (input) =>
            input.trim() !== "" ? true : "Project name cannot be empty",
        },
      ]);

      generateExpress(projectName);
      return;
    }

    if (generator === "Vue.JS generator") {
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Write your project name:",
          validate: (input) =>
            input.trim() !== "" ? true : "Project name cannot be empty",
        },
      ]);

      generateVue(projectName);
      return;
    }

    if (generator === "React generator") {
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Write your project name:",
          validate: (input) =>
            input.trim() !== "" ? true : "Project name cannot be empty",
        },
      ]);

      generateReact(projectName);
      return;
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
