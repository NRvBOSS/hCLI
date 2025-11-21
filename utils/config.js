import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { HCLI_CONFIG_FILE, HCLI_CONFIG_FOLDER } from "./path.js";
import chalk from "chalk";

// Default config
const defaultConfig = {
  author: "",
  defaultFrontend: "",
  defaultBackend: "",
  packageManager: "npm",
  autoInstall: false,
  language: "js",
};

export function ensureConfigFile() {
  if (!existsSync(HCLI_CONFIG_FOLDER)) {
    mkdirSync(HCLI_CONFIG_FOLDER, { recursive: true });
  }

  if (!existsSync(HCLI_CONFIG_FILE)) {
    writeFileSync(HCLI_CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  }
}

// Read config
export function getConfig() {
  ensureConfigFile();

  const data = readFileSync(HCLI_CONFIG_FILE, "utf8");
  return JSON.parse(data);
}

// Write config (overwrites fully)
export function setConfig(newConfig) {
  ensureConfigFile();
  writeFileSync(HCLI_CONFIG_FILE, JSON.stringify(newConfig, null, 2));
}

// Merge config (smart update)
export function updateConfig(patch) {
  const current = getConfig();
  const merged = { ...current, ...patch };

  writeFileSync(HCLI_CONFIG_FILE, JSON.stringify(merged, null, 2));

  console.log(chalk.green("\n✔ Config updated successfully!\n"));
}
