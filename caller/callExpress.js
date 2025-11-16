import { program } from "commander";
import { generateExpress } from "../generators/express.js";

export default function callExpress() {
  program
    .command("express <myApp>")
    .description("Generate Express project")
    .action((myApp) => {
      generateExpress(myApp);
    });
}
