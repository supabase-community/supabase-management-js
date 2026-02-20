import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";

const SPEC_URL = "https://api.supabase.com/api/v1-json";
const OUT = new URL("../openapi/v1.json", import.meta.url);

const res = await fetch(SPEC_URL);
if (!res.ok)
  throw new Error(`Failed to fetch spec: ${res.status} ${res.statusText}`);
const json = await res.json();

mkdirSync(fileURLToPath(new URL("../openapi/", import.meta.url)), {
  recursive: true,
});
writeFileSync(OUT, JSON.stringify(json, null, 2) + "\n");
console.log("Wrote OpenAPI spec to openapi/v1.json");
