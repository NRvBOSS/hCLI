import { program } from "commander";
import { generateExpress } from "../generators/express.js";
import { generateReact } from "../generators/react.js";
import { generateVue } from "../generators/vue.js";
import { generateNest } from "../generators/nest.js";

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
}
