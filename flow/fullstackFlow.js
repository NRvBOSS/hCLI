import bigCliName from "../utils/bigCliName.js";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import { mkdirSync } from "fs";
import { cwd } from "process";
import { generateVue } from "../generators/vue.js";
import { generateReact } from "../generators/react.js";
import { generateExpress } from "../generators/express.js";
import { generateNest } from "../generators/nest.js";
import back from "../utils/propWithBack.js";
import { mainFlow } from "./mainFlow.js";

export default async function fullFlow() {
  try {
    await bigCliName();

    const { stack } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose your fullstack combination:",
        name: "stack",
        choices: back([
          "Vue.JS + Express.JS",
          "React + Express.JS",
          "Vue.JS + Nest.JS",
          "React + Nest.JS",
        ]),
      },
    ]);

    if (stack === "Back") {
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

    // Root folder
    const rootPath = path.join(cwd(), projectName);
    mkdirSync(rootPath, { recursive: true });

    // Subfolders
    const frontendPath = path.join(rootPath, "frontend");
    const backendPath = path.join(rootPath, "backend");

    mkdirSync(frontendPath, { recursive: true });
    mkdirSync(backendPath, { recursive: true });

    console.log(chalk.cyan(`\n🚀 Creating project "${projectName}"...\n`));

    switch (stack) {
      case "Vue.JS + Express.JS":
        await generateVue(frontendPath);
        await generateExpress(backendPath, { dockerSupport });
        break;

      case "React + Express.JS":
        await generateReact(frontendPath);
        await generateExpress(backendPath, { dockerSupport });
        break;

      case "Vue.JS + Nest.JS":
        await generateVue(frontendPath);
        await generateNest(backendPath, { dockerSupport });
        break;

      case "React + Nest.JS":
        await generateReact(frontendPath);
        await generateNest(backendPath, { dockerSupport });
        break;
    }

    console.log(chalk.green(`\n✔ Fullstack project "${projectName}" created!`));
    console.log(
      chalk.yellow(
        `\nProject structure:\n${projectName}/\n├─ frontend/\n└─ backend/`
      )
    );
  } catch (err) {
    console.log("Unexpected error:", err);
  }
}
