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

You can configure the `SupabaseManagementAPI` class with an access token, retrieved either through [OAuth](https://supabase.com/docs/guides/integrations/oauth-apps/authorize-an-oauth-app) or by generating an API token in your [account](https://supabase.com/dashboard/account/tokens) page. Your API tokens carry the same privileges as your user account, so be sure to keep it secret.

```ts
import { SupabaseManagementAPI } from "supabase-management-js";

const client = new SupabaseManagementAPI({ accessToken: "<access token>" });
```

### Usage

The `SupabaseManagementAPI` class exposes each API endpoint of the [Management API](https://supabase.com/docs/reference/api/introduction) as a function that returns a Promise with the corresponding response data type.

```ts
import { SupabaseManagementAPI } from "supabase-management-js";

const client = new SupabaseManagementAPI({ accessToken: "<access token>" });

const projects = await client.getProjects();

if (projects) {
  console.log(`Found ${projects.length} projects`);
}
```

### Handling errors

Response errors are thrown as an instance of `SupabaseManagementAPIError` which is a subclass of `Error`. You can use the exported `isSupabaseError` guard function to narrow the type of an `unknown` error object:

```ts
import { SupabaseManagementAPI, isSupabaseError } from "supabase-management-js";

const client = new SupabaseManagementAPI({ accessToken: "<access token>" });

try {
  await client.getProjects();
} catch (error) {
  if (isSupabaseError(error)) {
    // error is now typed as SupabaseManagementAPI
    console.log(
      `Supabase Error:  ${error.message}, response status: ${error.response.status}`
    );
  }
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

6. Create a changeset to describe your changes

```sh
npm run changeset:add
```

7. Create a branch, commit your changes, and open a Pull Request against the `main` branch in this repo.
