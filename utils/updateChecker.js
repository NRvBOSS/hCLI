import https from "https";
import chalk from "chalk";
import boxen from "boxen";
import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

// __dirname ESM üçün
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// package.json-u oxumaq (tam təhlükəsiz üsul)
const pkg = JSON.parse(readFileSync(__dirname + "/../package.json", "utf8"));

export default function updateChecker() {
  const pkgName = pkg.name;

  https
    .get(`https://registry.npmjs.org/${pkgName}`, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          const json = JSON.parse(data);

          const latest = json["dist-tags"].latest;
          const current = pkg.version;

          if (latest !== current) {
            const msg =
              `${chalk.yellow("A new version of hCLI is available!")}\n\n` +
              `${chalk.white("Current version:")} ${chalk.red(current)}\n` +
              `${chalk.white("Latest version:")}  ${chalk.green(latest)}\n\n` +
              `${chalk.white("Update using:")}\n` +
              `${chalk.cyan(`npm i -g ${pkgName}`)}`;

            console.log(
              boxen(msg, {
                padding: 1,
                margin: 1,
                borderColor: "yellow",
                borderStyle: "round",
              })
            );
          }
        } catch (_) {}
      });
    })
    .on("error", () => {});
}
