/**
 * Post-generation script that transforms generated files to accept a configurable
 * baseUrl parameter, replacing the hardcoded 'https://api.supabase.com' default.
 *
 * Run after `orval` and before `generate-class.mjs` in the generate:client pipeline.
 */
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATED_DIR = join(__dirname, "..", "src", "generated");
const DEFAULT_BASE_URL = "https://api.supabase.com";
const BASE_URL_PARAM = `baseUrl: string = '${DEFAULT_BASE_URL}'`;

const files = readdirSync(GENERATED_DIR).filter(
  (f) =>
    f.endsWith(".ts") &&
    f !== "index.ts" &&
    f !== "supabaseAPIV1.schemas.ts"
);

for (const file of files) {
  const filePath = join(GENERATED_DIR, file);
  let text = readFileSync(filePath, "utf8");

  // Transform A: URL builder with zero params: "= () =>"
  text = text.replace(
    /^(export const getV1\w+ = )\(\)( =>)/gm,
    `$1(${BASE_URL_PARAM})$2`
  );

  // Transform B: URL builder with existing params ending in trailing ",)" (handles multi-line)
  // Orval always generates a trailing comma before the closing paren, e.g.:
  //   (ref: string,) =>
  //   (ref: string,\n    id: string,) =>
  text = text.replace(
    /(export const getV1\w+Url = \()([\s\S]*?),(\) =>)/g,
    `$1$2, ${BASE_URL_PARAM}$3`
  );

  // Transform C: Replace hardcoded base URL in template literals
  text = text.replaceAll("`" + DEFAULT_BASE_URL + "/", "`${baseUrl}/");

  // Transform D: Add baseUrl param to fetch function signatures
  // Targets: "options?: RequestInit): Promise"
  text = text.replace(
    /options\?\: RequestInit\): Promise/g,
    `options?: RequestInit, ${BASE_URL_PARAM}): Promise`
  );

  // Transform E: Thread baseUrl into URL builder calls inside fetch functions
  // Targets: getV1XxxUrl(args) — adds baseUrl as the last argument
  text = text.replace(/(getV1\w+Url\()([^)]*)\)/g, (match, open, args) => {
    const trimmed = args.trim();
    const newArgs = trimmed ? `${trimmed}, baseUrl` : "baseUrl";
    return `${open}${newArgs})`;
  });

  writeFileSync(filePath, text, "utf8");
}

console.log(`Patched ${files.length} generated files with configurable baseUrl`);
