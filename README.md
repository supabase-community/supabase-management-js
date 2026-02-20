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

### Usage

The recommended way to use the SDK is through the `SupabaseManagementAPI` class. It handles authentication automatically, so you only need to pass your access token — retrieved either through [OAuth](https://supabase.com/docs/guides/integrations/oauth-apps/authorize-an-oauth-app) or by generating an API token in your [account](https://supabase.com/dashboard/account/tokens) page — once at construction time. Your API tokens carry the same privileges as your user account, so be sure to keep them secret.

```ts
import { SupabaseManagementAPI } from "supabase-management-js";

const api = new SupabaseManagementAPI({ accessToken: "<access token>" });

const response = await api.listAllProjects();

if (response.status === 200) {
  console.log(`Found ${response.data.length} projects`);
}
```

### Custom base URL

By default the client targets `https://api.supabase.com`. Pass a `baseUrl` option to the constructor to point the client at a different endpoint, such as a staging environment or a local proxy:

```ts
const api = new SupabaseManagementAPI({
  accessToken: "<access token>",
  baseUrl: "https://api.staging.supabase.com",
});
```

### Handling errors

Every method returns a Promise that resolves to a discriminated union of `{ data, status, headers }`. Narrow on `status` to handle errors without try/catch:

```ts
const response = await api.getProject("my-project-ref");

if (response.status === 200) {
  console.log(response.data.name);
} else {
  // response.data and response.status are narrowed to the error variant
  console.error(`Error: HTTP ${response.status}`);
}
```

### Low-level functions

Each endpoint is also exported as a standalone async function for cases where you prefer not to use the class. Pass your access token via a `RequestInit` options object:

```ts
import { v1ListAllProjects } from "supabase-management-js";

const response = await v1ListAllProjects({
  headers: { Authorization: `Bearer <access token>` },
});
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

### Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for automated versioning and publishing.

1. Create a changeset by running:

```sh
npm exec changeset
```

This command will prompt you to:

- Select which package version to bump (`patch`, `minor`, or `major`)
- Describe your changes (this becomes part of the release notes)

Once accepted it will create a changeset file inside the [.changeset](./.changeset) folder which can be updated with your release notes. Changesets support Markdown formatting, so you can include bullet points, links, and other formatting in your release notes.

2. Commit the changeset file and merge the PR.

After your PR is merged the `release.yml` workflow will create another PR that bumps the version and updates `CHANGELOG.md` with all pending changeset descriptions.

3. Merge the second PR.

After this second PR is merged, the `release.yml` workflow will build and publishe the new version to npm, and create a GitHub release with the changelog.

### Regenerating the client

The files under `src/generated/` are auto-generated from the Supabase [OpenAPI spec](https://api.supabase.com/api/v1-json) using [orval](https://orval.dev). To refresh both the spec and the generated client in one step, run:

```sh
npm run generate
```

This will regenerate the code based on what the latest Supabase Management OpenAPI spec is.
