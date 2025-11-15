#!/usr/bin/env node
import { program } from "commander";
import { generateExpress } from "../generators/express.js";
import figlet from "figlet";
import gradient from "gradient-string";

program
  .name("icli")
  .version("1.0.1")
  .addHelpCommand(false);

function bigCliName() {
  return new Promise((resolve, reject) => {
    console.clear();
    const msg = "iCLI";

    figlet(msg, (err, data) => {
      if (err) reject(err);
      console.log(gradient.mind.multiline(data));
      resolve();
    });
  });
}

(async () => {
  await bigCliName();
  program
    .command("express")
    .description("Generate Express project")
    .argument("<myApp>", "Name of the project")
    .action((myApp) => {
      generateExpress(myApp);
    });

  program.parse();
})();
