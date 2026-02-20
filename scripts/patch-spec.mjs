import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";

const specPath = fileURLToPath(new URL("../openapi/v1.json", import.meta.url));
const spec = JSON.parse(readFileSync(specPath, "utf-8"));

let patchCount = 0;

/**
 * Recursively remove all `hideDefinitions` keys from an object,
 * since it is a non-standard OpenAPI extension that causes orval
 * code generation to fail.
 */
function removeHideDefinitions(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(removeHideDefinitions);
  } else if (obj !== null && typeof obj === "object") {
    if ("hideDefinitions" in obj) {
      delete obj.hideDefinitions;
      patchCount++;
    }
    for (const value of Object.values(obj)) {
      removeHideDefinitions(value);
    }
  }
}

removeHideDefinitions(spec);

writeFileSync(specPath, JSON.stringify(spec, null, 2) + "\n");
console.log(
  `Patched OpenAPI spec: removed ${patchCount} hideDefinitions occurrence(s).`
);
