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

export async function generateReact(myApp) {
  const projectPath = path.isAbsolute(myApp) ? myApp : path.join(cwd(), myApp);
  mkdirSync(projectPath, { recursive: true });

  markForCleanup(projectPath);

  const templatePath = path.join(__dirname, "../templates/react");

  cpSync(templatePath, projectPath, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });

  await withSpinner("Creating React project...", async () => {
    console.log(`${myApp}'s React template created.`);
  });

  console.log("Packages installing...");

  try {
    await withSpinner("Installing dependencies...", async () => {
      execSync("npm install react react-dom", {
        cwd: projectPath,
        stdio: "inherit",
      });

      execSync("npm install -D vite @vitejs/plugin-react", {
        cwd: projectPath,
        stdio: "inherit",
      });

      execSync("npm install -D @types/react @types/react-dom", {
        cwd: projectPath,
        stdio: "inherit",
      });

      execSync(
        "npm install -D eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals",
        {
          cwd: projectPath,
          stdio: "inherit",
        }
      );
    });

    console.log(chalk.green("Project ready!"));
    console.log(chalk.blue(`If start, write:\n  cd ${myApp}\n  npm run dev`));
  } catch (error) {
    console.error(chalk.red("Error when installing packages:", error.message));
  }
}
