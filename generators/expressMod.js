import fs from "fs";
import path from "path";
import chalk from "chalk";
import { cwd } from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateExpressModule(name) {
  const projectRoot = cwd();
  const srcPath = path.join(projectRoot, "src");

  // Ensure src folder exists
  if (!fs.existsSync(srcPath)) {
    console.log(chalk.red("src/ folder not found!"));
    console.log("Make sure you are inside an Express project.");
    return;
  }

  // Create module folder
  const moduleDir = path.join(srcPath, name);
  fs.mkdirSync(moduleDir, { recursive: true });

  // Template folder
  const templateDir = path.join(__dirname, "../templates/express-module");
  // Helper: capitalize name
  const capitalized =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // Template files → Output filenames
  const files = [
    {
      template: "controller.js",
      output: `${name}.controller.js`,
    },
    {
      template: "model.js",
      output: `${name}.model.js`,
    },
    {
      template: "router.js",
      output: `${name}.router.js`,
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

  console.log(chalk.green(`Express module '${name}' successfully created!`));
}
