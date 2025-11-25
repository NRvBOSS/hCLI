import { program } from "commander";
import { generateExpress } from "../generators/express.js";
import { generateReact } from "../generators/react.js";
import { generateVue } from "../generators/vue.js";
import { generateNest } from "../generators/nest.js";
import { configCommand } from "./subcommands/configCommands.js";
import { generateExpressModule } from "../generators/expressMod.js";
import { generateNestModule } from "../generators/nestMod.js";

export function registerCommands() {
  program
    .command("express <myApp>")
    .description("Generate Express project")
    .action(generateExpress);

  program
    .command("react <myApp>")
    .description("Generate React project")
    .action(generateReact);

  program
    .command("vue <myApp>")
    .description("Generate Vue project")
    .action(generateVue);

  program
    .command("nest <myApp>")
    .description("Generate Nest project")
    .action(generateNest);

  program
    .command("config")
    .description("Edit or view hCLI configuration")
    .action(configCommand);

  program
    .command("c <framework> <name>")
    .description("Generate Express or Nest module")
    .action((framework, name) => {
      if (framework === "express") {
        generateExpressModule(name);
      } else if (framework === "nest") {
        generateNestModule(name);
      } else {
        console.log("Supported: express | nest");
      }
    });
}
