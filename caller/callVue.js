import { program } from "commander";
import { generateVue } from "../generators/vue.js";

export default function callVue() {
  program
    .command("vue <myApp>")
    .description("Generate Vue project")
    .action((myApp) => {
      generateVue(myApp);
    });
}
