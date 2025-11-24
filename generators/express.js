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

export async function generateExpress(myApp, options) {
  const projectPath = path.isAbsolute(myApp) ? myApp : path.join(cwd(), myApp);
  mkdirSync(projectPath, { recursive: true });

  markForCleanup(projectPath);

  const templatePath = path.join(__dirname, "../templates/express");

  // Copy base express template
  cpSync(templatePath, projectPath, { recursive: true });

  // Docker support
  if (options.dockerSupport) {
    const dockerSrc = path.join(
      __dirname,
      "../templates/docker/Dockerfile"
    );
    const dockerDest = path.join(projectPath, "Dockerfile");
    cpSync(dockerSrc, dockerDest);
  }

  await withSpinner("Creating Express project...", async () => {
    console.log(`${myApp}'s Express template created.`);
  });

  console.log("Packages installing...");

  try {
    await withSpinner("Installing dependencies...", async () => {
      execSync("npm install express cors dotenv", {
        cwd: projectPath,
        stdio: "inherit",
      });

      execSync("npm install -D nodemon", {
        cwd: projectPath,
        stdio: "inherit",
      });
    });

    console.log("Project ready!");

    console.log(chalk.yellow(`\nTo start:\n  cd ${myApp}\n  npm run dev`));
  } catch (error) {
    console.error(chalk.red("Error when installing packages:", error.message));
  }
}
