import https from "https";
import chalk from "chalk";
import boxen from "boxen";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// __dirname ESM üçün
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// package.json-u oxumaq
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf8"));

export default function updateChecker() {
  const pkgName = pkg.name;
  const currentVersion = pkg.version;

  // NPM version check
  https
    .get(`https://registry.npmjs.org/${pkgName}`, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const latestVersion = json["dist-tags"].latest;

          if (latestVersion !== currentVersion) {
            // GitHub release link
            const repo = "NRvBOSS/hCLI";
            const options = {
              headers: { "User-Agent": "node.js" },
            };

            https.get(`https://api.github.com/repos/${repo}/releases/latest`, options, (res2) => {
              let ghData = "";
              res2.on("data", (chunk) => (ghData += chunk));
              res2.on("end", () => {
                try {
                  const ghJson = JSON.parse(ghData);
                  const releaseUrl = ghJson.html_url || `https://github.com/${repo}/releases`;

                  const msg =
                    `${chalk.yellow("A new version of hCLI is available!")}\n\n` +
                    `${chalk.white("Current version:")} ${chalk.red(currentVersion)}\n` +
                    `${chalk.white("Latest version:")}  ${chalk.green(latestVersion)}\n\n` +
                    `${chalk.white("Update using:")}\n` +
                    `${chalk.cyan(`npm i -g ${pkgName}`)}\n\n` +
                    `${chalk.white("Release notes:")} ${chalk.blue.underline(releaseUrl)}`;

                  console.log(
                    boxen(msg, {
                      padding: 1,
                      margin: 1,
                      borderColor: "yellow",
                      borderStyle: "round",
                    })
                  );
                } catch (err) {
                  console.log(chalk.yellow("New version available! Run: npm i -g " + pkgName));
                }
              });
            }).on("error", () => {});
          }
        } catch (_) {}
      });
    })
    .on("error", () => {});
}
