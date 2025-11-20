import bigCliName from "../utils/bigCliName.js";
import inquirer from "inquirer";
import chalk from "chalk";
import backendFlow from "./backendFlow.js";
import frontendFlow from "./frontendFlow.js";
import fullFlow from "./fullstackFlow.js";

export async function mainFlow() {
  try {
    // DIRECT MODE
    if (process.argv.length > 2) {
      await bigCliName();
      program.parse();
      return;
    }

    // INTERACTIVE MODE
    await bigCliName();

    const { section } = await inquirer.prompt([
      {
        type: "list",
        message: "Pick the section for generating:",
        name: "section",
        choices: [
          "Full-Stack",
          "Backend(Express.js/Nest.js)",
          "Frontend(Vue/React)",
        ],
      },
    ]);

    switch (section) {
      case "Full-Stack":
        fullFlow();
        break;

      case "Backend(Express.js/Nest.js)":
        backendFlow();
        break;

      case "Frontend(Vue/React)":
        frontendFlow();
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
