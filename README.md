## supabase-management-js

A convenience wrapper for the [Supabase Management API](https://supabase.com/docs/reference/api/introduction) written in TypeScript.

### Status

The Management API is in beta. It is usable in it's current state, but it's likely that there will be breaking changes.

### Installation

To install `supabase-management-js` in a Node.js project:

```sh
npm install supabase-management-js
```

`supabase-management-js` requires Node.js 18 and above because it relies on the native `fetch` client.

### Authentication

All API functions accept a standard `RequestInit` options object as their last argument. Pass your access token — retrieved either through [OAuth](https://supabase.com/docs/guides/integrations/oauth-apps/authorize-an-oauth-app) or by generating an API token in your [account](https://supabase.com/dashboard/account/tokens) page — via the `Authorization` header. Your API tokens carry the same privileges as your user account, so be sure to keep it secret.

```ts
const options: RequestInit = {
  headers: { Authorization: `Bearer <access token>` },
};
```

### Usage

Each endpoint of the [Management API](https://supabase.com/docs/reference/api/introduction) is exported as an individual async function. Every function returns a Promise that resolves to a discriminated union of `{ data, status, headers }`, making it easy to handle both success and error responses with full type safety.

```ts
import { v1ListAllProjects } from "supabase-management-js";

const response = await v1ListAllProjects({
  headers: { Authorization: `Bearer <access token>` },
});

if (response.status === 200) {
  console.log(`Found ${response.data.length} projects`);
}
```

### Handling errors

Each function returns a discriminated union typed on `status`, so you can narrow the response without try/catch:

```ts
import { v1ListAllProjects } from "supabase-management-js";

const response = await v1ListAllProjects({
  headers: { Authorization: `Bearer <access token>` },
});

if (response.status === 200) {
  console.log(`Found ${response.data.length} projects`);
} else {
  // response.data and response.status are narrowed to the error variant
  console.error(`Error: HTTP ${response.status}`);
}
```

### Contributing

Contributions to this project are very welcome and greatly appreciated!

1. Clone the repo into a public GitHub repo (or fork https://github.com/supabase-community/supabase-management-js/fork).

2. Go to the project folder.

```sh
cd supabase-management-js
```

3. Install packages with `npm`:

```sh
npm install
```

4. Make your changes

5. Make sure types are correct

```sh
npm run typecheck
```

6. Create a changeset to describe your changes if you are making changes to the source code that affects its public API

```sh
npm exec changeset
```

7. Create a branch, commit your changes, and open a Pull Request against the `main` branch in this repo.

### Regenerating the client

The files under `src/generated/` are auto-generated from the Supabase [OpenAPI spec](https://api.supabase.com/api/v1-json) using [orval](https://orval.dev). To refresh both the spec and the generated client in one step, run:

```sh
npm run generate
```
