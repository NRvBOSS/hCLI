import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { cwd } from "process";

function pascal(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addNestModuleToApp(name) {
  const root = cwd();
  const appModulePath = join(root, "src", "app.module.ts");

  const moduleClass = pascal(name) + "Module"; // demo → DemoModule
  const importPath = `./${name}/${name}.module`;

  let content = readFileSync(appModulePath, "utf8");

  // Əgər artıq əlavə edilibsə, çıx
  if (content.includes(moduleClass)) return;

  // 1️⃣ Import əlavə et
  const importLine = `import { ${moduleClass} } from '${importPath}';\n`;
  content = importLine + content;

  // 2️⃣ @Module içindəki imports[]-ə əlavə et
  content = content.replace(
    /imports:\s*\[(.*?)\]/s,
    (full, inside) => `imports: [${inside ? inside + ", " : ""}${moduleClass}]`
  );

  writeFileSync(appModulePath, content);
}
