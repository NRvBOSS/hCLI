import fs from "fs";
import path from "path";
import chalk from "chalk";
import { cwd } from "process";
import { fileURLToPath } from "url";
import { addNestModuleToApp } from "./nestModToModule.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateNestModule(name) {
  const projectRoot = cwd();
  const srcPath = path.join(projectRoot, "src");

  // Ensure src folder exists
  if (!fs.existsSync(srcPath)) {
    console.log(chalk.red("src/ folder not found!"));
    console.log("Make sure you are inside an Nest project.");
    return;
  }

  // Create module folder
  const moduleDir = path.join(srcPath, name);
  fs.mkdirSync(moduleDir, { recursive: true });

  // Template folder
  const templateDir = path.join(__dirname, "../templates/nest-module");
  // Helper: capitalize name
  const capitalized =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // Template files → Output filenames
  const files = [
    {
      template: "controller.ts",
      output: `${name}.controller.ts`,
    },
    {
      template: "service.ts",
      output: `${name}.service.ts`,
    },
    {
      template: "module.ts",
      output: `${name}.module.ts`,
    },
  ];

  for (const file of files) {
    const templatePath = path.join(templateDir, file.template);
    const outputPath = path.join(moduleDir, file.output);

    let content = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders
    content = content
      .replace(/__NAME__/g, name)
      .replace(/__NAME_CAPITALIZED__/g, capitalized);

    fs.writeFileSync(outputPath, content);
  }

  addNestModuleToApp(name);

  console.log(chalk.green(`Nest module '${name}' successfully created!`));
}
