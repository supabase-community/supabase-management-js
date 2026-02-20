import { readdirSync, writeFileSync } from "fs";
import { join, basename, extname } from "path";

const dir = "./src/generated";
const files = readdirSync(dir)
  .filter(
    (f) => f.endsWith(".ts") && f !== "index.ts" && !f.startsWith("model")
  )
  .sort()
  .map((f) => basename(f, extname(f)));

const content =
  files.map((n) => `export * from './${n}';`).join("\n") + "\n";
writeFileSync(join(dir, "index.ts"), content);
console.log(`Generated src/generated/index.ts (${files.length} modules)`);
