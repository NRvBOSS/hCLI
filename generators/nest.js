import chalk from "chalk";
import { execSync } from "child_process";
import { mkdirSync, cpSync } from "fs";
import path from "path";
import { cwd } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateNest(myApp) {
  const projectPath = path.isAbsolute(myApp) ? myApp : path.join(cwd(), myApp);
  mkdirSync(projectPath, { recursive: true });

  const templatePath = path.join(__dirname, "../templates/nest");

  cpSync(templatePath, projectPath, {
    recursive: true,
    force: true,
    errorOnExist: false,
  });

  console.log(`${myApp}'s Nest template created.`);

  console.log("Packages installing...");

  try {
    execSync(
      `npm install @nestjs/common @nestjs/core @nestjs/platform-express reflect-metadata rxjs`,
      { cwd: projectPath, stdio: "inherit" }
    );

    execSync(
      `npm install -D \
  @eslint/eslintrc \
  @eslint/js \
  @nestjs/cli \
  @nestjs/schematics \
  @nestjs/testing \
  @swc/cli \
  @swc/core \
  @types/express \
  @types/jest \
  @types/node \
  @types/supertest \
  eslint \
  eslint-config-prettier \
  eslint-plugin-prettier \
  globals \
  jest \
  prettier \
  source-map-support \
  supertest \
  ts-jest \
  ts-loader \
  ts-node \
  tsconfig-paths \
  typescript \
  typescript-eslint`,
      { cwd: projectPath, stdio: "inherit" }
    );

    console.log("Project ready!");

    console.log(
      chalk.redBright(`\If start, write:\n  cd ${myApp}\n  npm run dev`)
    );
  } catch (error) {
    console.error("Error when packages installing:", error.message);
  }
}
