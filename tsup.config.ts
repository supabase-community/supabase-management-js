import type { Plugin, PluginBuild, OnResolveArgs } from "esbuild";
import { Options, defineConfig } from "tsup";

const restoreNodeProtocolPlugin = (): Plugin => {
  return {
    name: "node-protocol-plugin-restorer",
    setup(build: PluginBuild) {
      build.onResolve(
        {
          filter: /node:/,
        },
        async (args: OnResolveArgs) => {
          return { path: args.path, external: true };
        },
      );
    },
  };
};

export const options: Options = {
  name: "main",
  config: "tsconfig.json",
  entry: ["./src/index.ts"],
  outDir: "./dist",
  platform: "node",
  format: ["cjs", "esm"],
  legacyOutput: false,
  sourcemap: true,
  clean: true,
  bundle: true,
  splitting: false,
  dts: true,
  treeshake: {
    preset: "recommended",
  },
  esbuildPlugins: [restoreNodeProtocolPlugin()],
  noExternal: ["openapi-fetch"],
};

export default defineConfig(options);
