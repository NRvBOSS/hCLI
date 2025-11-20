import bigCliName from "../utils/bigCliName.js";
import { generateExpress } from "../generators/express.js";
import { generateNest } from "../generators/nest.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { mainFlow } from "./mainFlow.js";
import back from "../utils/propWithBack.js";

export default async function backendFlow() {
  try {
    // INTERACTIVE MODE
    await bigCliName();

    const { generator } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the generator for using:",
        name: "generator",
        choices: back(["Express.JS generator", "Nest.JS generator"]),
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
      case "Express.JS generator":
        generateExpress(projectName);
        break;

      case "Nest.JS generator":
        generateNest(projectName);
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
