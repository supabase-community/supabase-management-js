import { defineConfig } from "orval";

export default defineConfig({
  "supabase-management": {
    input: {
      target: "./openapi/v1.json",
    },
    output: {
      client: "axios",
      mode: "tags",
      target: "./src/generated",
      override: {
        mutator: {
          path: "./src/mutator.ts",
          name: "customInstance",
        },
        zod: {
          generate: {
            response: true,
            body: true,
            query: true,
          },
          strict: {
            response: false,
          },
        },
      },
    },
  },
});
