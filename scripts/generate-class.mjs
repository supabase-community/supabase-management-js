import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GENERATED_DIR = join(ROOT, "src", "generated");
const OUT_CLASS = join(ROOT, "src", "api.ts");
const OUT_INDEX = join(ROOT, "src", "index.ts");

// Types that are DOM/JS globals and don't need to be imported
const DOM_GLOBALS = new Set([
  "Blob",
  "FormData",
  "File",
  "Headers",
  "Request",
  "Response",
  "RequestInit",
  "URLSearchParams",
]);

// Primitive types that don't need to be imported
const PRIMITIVES = new Set([
  "string",
  "number",
  "boolean",
  "void",
  "null",
  "undefined",
  "any",
  "unknown",
  "never",
  "object",
]);

/**
 * Splits a comma-separated param string while respecting angle bracket depth
 * (handles generic types like Record<string, string>)
 */
function splitParams(rawParams) {
  const normalized = rawParams.replace(/\s+/g, " ").trim();
  if (!normalized) return [];
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of normalized) {
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    else if (ch === "," && depth === 0) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/** Extracts the parameter name from a "name: Type" or "name?: Type" string */
function extractParamName(paramStr) {
  return paramStr.split(":")[0].replace("?", "").trim();
}

/** Converts "v1FooBarBaz" to "fooBarBaz" */
function toMethodName(v1Name) {
  const s = v1Name.replace(/^v1/, "");
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Collects PascalCase type names from a param string,
 * skipping primitives and DOM globals.
 */
function collectTypeNames(paramStr, typeNames) {
  // Match the type part after ": " — handles optional "?" before the type
  const typeMatch = paramStr.match(/:\s*\??([A-Za-z][A-Za-z0-9]*)/);
  if (!typeMatch) return;
  const typeName = typeMatch[1];
  // Only collect PascalCase types (uppercase first letter)
  if (
    /^[A-Z]/.test(typeName) &&
    !DOM_GLOBALS.has(typeName) &&
    !PRIMITIVES.has(typeName)
  ) {
    typeNames.add(typeName);
  }
}

// Regex to capture v1* async function signatures (handles multi-line params)
const FUNC_REGEX = /^export const (v1[A-Za-z]+) = async \(([\s\S]*?)\): Promise/gm;

// Regex to extract JSDoc blocks placed by orval before the first ResponseNNN type
// (success status varies: 200 for GETs, 201 for creates, etc.).
// Uses [^*]|\*(?!\/) to avoid crossing a */ boundary (no greedy backtracking).
const JSDOC_TYPE_REGEX = /(\/\*\*(?:[^*]|\*(?!\/))*\*\/)\s*export type (v1[A-Za-z]+)Response\d+/g;

const sourceFiles = readdirSync(GENERATED_DIR)
  .filter(
    (f) =>
      f.endsWith(".ts") &&
      f !== "index.ts" &&
      f !== "supabaseAPIV1.schemas.ts"
  )
  .sort();

const methodSpecs = [];
const allFuncNames = [];
const allTypeNames = new Set();
const allResponseTypeNames = new Set();

for (const file of sourceFiles) {
  const text = readFileSync(join(GENERATED_DIR, file), "utf8");

  // Build a map of funcName -> JSDoc for this file (from Response type annotations)
  const jsdocMap = new Map();
  let jsdocMatch;
  JSDOC_TYPE_REGEX.lastIndex = 0;
  while ((jsdocMatch = JSDOC_TYPE_REGEX.exec(text)) !== null) {
    const [, jsdoc, funcName] = jsdocMatch;
    jsdocMap.set(funcName, jsdoc);
  }

  let match;
  FUNC_REGEX.lastIndex = 0;
  while ((match = FUNC_REGEX.exec(text)) !== null) {
    const [, funcName, rawParams] = match;
    allFuncNames.push(funcName);

    const allParams = splitParams(rawParams);

    // Strip options param (RequestInit) — baseUrl is now handled by the mutator
    const nonOptionParams = allParams.filter(
      (p) => !p.includes("RequestInit")
    );

    const callParams = nonOptionParams.map(extractParamName);
    const methodParamList = nonOptionParams.join(", ");

    // Collect type names from non-options params
    for (const p of nonOptionParams) {
      collectTypeNames(p, allTypeNames);
    }

    const returnType = `${funcName}ResponseSuccess`;
    allResponseTypeNames.add(returnType);

    methodSpecs.push({
      methodName: toMethodName(funcName),
      funcName,
      methodParamList,
      callParams,
      returnType,
      jsdoc: jsdocMap.get(funcName) ?? null,
    });
  }
}

// Generate class methods
function generateMethod({ methodName, funcName, methodParamList, callParams, returnType, jsdoc }) {
  const lines = [];

  if (jsdoc) {
    // Indent JSDoc block by 2 spaces to align with class body
    const indented = jsdoc.split("\n").map((line) => `  ${line}`).join("\n");
    lines.push(indented);
  }

  const signatureParams = methodParamList
    ? `${methodParamList}, options?: RequestInit`
    : `options?: RequestInit`;

  const callArgs =
    callParams.length > 0 ? `${callParams.join(", ")}, ` : "";

  lines.push(
    `  async ${methodName}(${signatureParams}): Promise<${returnType}> {`,
    `    const result = await ${funcName}(${callArgs}{`,
    `      ...options,`,
    `      headers: { ...this.authHeader, ...options?.headers },`,
    `      baseUrl: this.baseUrl,`,
    `    } as RequestInit);`,
    `    if (result.status >= 400) {`,
    `      throw new SupabaseManagementAPIError(result, '${methodName}');`,
    `    }`,
    `    return result as ${returnType};`,
    `  }`,
  );

  return lines.join("\n");
}

// Build class file content
const funcImportLines = [...allFuncNames]
  .sort()
  .map((n) => `  ${n},`)
  .join("\n");

const typeImportLines = [...allTypeNames, ...allResponseTypeNames]
  .sort()
  .map((t) => `  ${t},`)
  .join("\n");

const methodBodies = methodSpecs.map(generateMethod).join("\n\n");

const classContent = `\
/**
 * This file is auto-generated by scripts/generate-class.mjs.
 * Do not edit manually - re-run \`npm run generate:client\` to update.
 */
import {
${funcImportLines}
} from './generated';

import type {
${typeImportLines}
} from './generated';

import { SupabaseManagementAPIError } from './error';

export interface SupabaseManagementAPIOptions {
  accessToken: string;
  baseUrl?: string;
}

export class SupabaseManagementAPI {
  private readonly accessToken: string;
  private readonly baseUrl: string;

  constructor({ accessToken, baseUrl = 'https://api.supabase.com' }: SupabaseManagementAPIOptions) {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
  }

  private get authHeader(): HeadersInit {
    return { Authorization: \`Bearer \${this.accessToken}\` };
  }

${methodBodies}
}
`;

writeFileSync(OUT_CLASS, classContent, "utf8");
console.log(
  `Generated src/api.ts (${methodSpecs.length} methods)`
);

// Build index file content
const indexContent = `\
/**
 * This file is auto-generated by scripts/generate-class.mjs.
 * Do not edit manually - re-run \`npm run generate:client\` to update.
 */
export * from './generated';
export { SupabaseManagementAPI } from './api';
export type { SupabaseManagementAPIOptions } from './api';
export { SupabaseManagementAPIError } from './error';
export { SUPABASE_API_BASE_URL } from './consts';
`;

writeFileSync(OUT_INDEX, indexContent, "utf8");
console.log("Generated src/index.ts");
