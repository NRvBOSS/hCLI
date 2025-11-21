import chalk from "chalk";
import { execSync } from "child_process";
import { mkdirSync, cpSync } from "fs";
import path from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";
import { withSpinner } from "../utils/withSpinner.js";
import { markForCleanup } from "../utils/cleanup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateVue(myApp) {
  const projectPath = path.isAbsolute(myApp) ? myApp : path.join(cwd(), myApp);
  mkdirSync(projectPath, { recursive: true });

  markForCleanup(projectPath);

  const templatePath = path.join(__dirname, "../templates/vue");

  cpSync(templatePath, projectPath, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });

  await withSpinner("Creating Vue project...", async () => {
    console.log(`${myApp}'s Vue template created.`);
  });

  console.log("Packages installing...");

  try {
    await withSpinner("Installing dependencies...", async () => {
      execSync("npm install vue vite @vitejs/plugin-vue", {
        cwd: projectPath,
        stdio: "inherit",
      });
    });

    console.log("Project ready!");

    console.log(chalk.green(`\If start, write:\n  cd ${myApp}\n  npm run dev`));
  } catch (error) {
    console.error(chalk.red("Error when packages installing:", error.message));
  }
}
