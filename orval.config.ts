import { defineConfig } from "orval";

export default defineConfig({
  "supabase-management": {
    input: {
      target: "./openapi/v1.json",
    },
    output: {
      client: "fetch",
      baseUrl: "https://api.supabase.com",
      mode: "tags",
      target: "./src/generated",
      override: {
        mutator: {
          path: './src/fetcher.ts',
          name: 'customFetch',
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
