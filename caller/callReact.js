import { program } from "commander";
import { generateReact } from "../generators/react.js";

export default function callReact() {
  program
    .command("react <myApp>")
    .description("Generate React project")
    .action((myApp) => {
      generateReact(myApp);
    });
}
