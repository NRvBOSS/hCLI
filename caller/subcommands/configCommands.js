import inquirer from "inquirer";
import { getConfig, updateConfig } from "../../utils/config.js";
import chalk from "chalk";

export async function configCommand() {
  const cfg = getConfig();

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "author",
      message: "Default project author:",
      default: cfg.author,
    },
    {
      type: "list",
      name: "defaultFrontend",
      message: "Default frontend framework:",
      choices: ["None", "React", "Vue"],
      default: cfg.defaultFrontend || "None",
    },
    {
      type: "list",
      name: "defaultBackend",
      message: "Default backend framework:",
      choices: ["None", "Express", "Nest"],
      default: cfg.defaultBackend || "None",
    },
    {
      type: "list",
      name: "packageManager",
      message: "Preferred package manager:",
      choices: ["npm", "yarn", "pnpm"],
      default: cfg.packageManager,
    },
    {
      type: "confirm",
      name: "autoInstall",
      message: "Automatically install dependencies?",
      default: cfg.autoInstall,
    },
  ]);

  updateConfig(answers);

  console.log(chalk.green("✔ Config saved!\n"));
}
