#!/usr/bin/env node
import { program } from "commander";
import { generateExpress } from "../generators/express.js";

program.name("icli").description("OWN Cli").version("1.0.0");

program
  .command("express")
  .description("Generate Express project")
  .argument("<myApp>", "Name of the project")
  .action((myApp) => {
    generateExpress(myApp);
  });

program.parse();
