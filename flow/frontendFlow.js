import bigCliName from "../utils/bigCliName.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { generateVue } from "../generators/vue.js";
import { generateReact } from "../generators/react.js";
import back from "../utils/propWithBack.js";
import { mainFlow } from "./mainFlow.js";
import { configCommand } from "../caller/subcommands/configCommands.js";
import { getConfig } from "../utils/config.js";

export default async function frontendFlow() {
  try {
    // INTERACTIVE MODE
    await bigCliName();

    const { generator } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the generator for using:",
        name: "generator",
        choices: back(["Vue.JS generator", "React generator"]),
      },
    ]);

    if (generator === "Back") {
      return mainFlow();
    }

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
