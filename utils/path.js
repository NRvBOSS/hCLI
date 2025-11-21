import os from "os";
import path from "path";

export const CONFIG_DIR =
  process.env.APPDATA || path.join(os.homedir(), ".config");

export const HCLI_CONFIG_FOLDER = path.join(CONFIG_DIR, "hcli");

export const HCLI_CONFIG_FILE = path.join(HCLI_CONFIG_FOLDER, "config.json");
