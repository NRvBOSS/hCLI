import bigCliName from "../utils/bigCliName.js";
import { generateExpress } from "../generators/express.js";
import { generateNest } from "../generators/nest.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { mainFlow } from "./mainFlow.js";
import back from "../utils/propWithBack.js";

export default async function backendFlow() {
  try {
    await bigCliName();

    const { generator } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the backend generator:",
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

    const { dockerSupport } = await inquirer.prompt([
      {
        type: "confirm",
        name: "dockerSupport",
        message: "Add Docker support?",
        default: false,
      },
    ]);

    switch (generator) {
      case "Express.JS generator":
        return generateExpress(projectName, { dockerSupport });

      case "Nest.JS generator":
        return generateNest(projectName, { dockerSupport });
    }
  } catch (err) {
    if (err.name === "ExitPromptError") {
      console.log(chalk.red("\nProcess canceled by user (Ctrl+C)."));
      process.exit(0);
    }

    console.log("Unexpected error:", err);
  }
}
