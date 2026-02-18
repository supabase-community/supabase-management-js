import createClient from "openapi-fetch";
import { SUPABASE_API_URL } from "./api/consts";
import {
  ActivateCustomHostnameResponseData,
  ApplyNetworkRestrictionsRequestBody,
  ApplyNetworkRestrictionsResponseData,
  CheckServiceHealthResponseData,
  CheckServiceQuery,
  CreateCustomHostnameRequestBody,
  CreateCustomHostnameResponseData,
  CreateFunctionRequestBody,
  CreateFunctionResponseData,
  CreateOrganizationRequestBody,
  CreateOrganizationResponseData,
  CreateProjectRequestBody,
  CreateProjectResponseData,
  CreateSSOProviderRequestBody,
  CreateSSOProviderResponseData,
  CreateSecretsRequestBody,
  DeleteProjectResponseBody,
  DeleteSecretsRequestBody,
  DeleteSecretsResponseData,
  GetBranchDetailsResponseData,
  GetCustomHostnameResponseData,
  GetFunctionBodyResponseData,
  GetFunctionResponseData,
  GetNetworkBansResponseData,
  GetNetworkRestrictionsResponseData,
  GetOrganizationsResponseData,
  GetPgsodiumConfigResponseData,
  GetPostgRESTConfigResponseData,
  GetProjectApiKeysResponseData,
  GetProjectAuthConfigResponseData,
  GetProjectPGConfigResponseData,
  GetProjectPgBouncerConfigResponseData,
  GetProjectsResponseData,
  GetReadonlyModeStatusResponseData,
  GetSSLEnforcementConfigResponseData,
  GetSSOProviderResponseData,
  GetSSOProvidersResponseData,
  GetSecretsResponseData,
  GetTypescriptTypesResponseData,
  GetUpgradeEligibilityResponseData,
  GetUpgradeStatusResponseData,
  GetVanitySubdomainResponseData,
  RemoveNetworkBanRequestBody,
  ReverifyCustomHostnameResponseData,
  RunQueryResponseData,
  UpdateBranchRequestBody,
  UpdateBranchResponseData,
  UpdateFunctionRequestBody,
  UpdateFunctionResponseData,
  UpdatePgSodiumConfigRequestBody,
  UpdatePgSodiumConfigResponseData,
  UpdatePostgRESTConfigRequestBody,
  UpdatePostgRESTConfigResponseData,
  UpdateProjectAuthConfigRequestBody,
  UpdateProjectAuthConfigResponseData,
  UpdateProjectPGConfigRequestBody,
  UpdateProjectPGConfigResponseData,
  UpdateSSLEnforcementConfigRequestBody,
  UpdateSSLEnforcementConfigResponseData,
  UpdateSSOProviderRequestBody,
  UpdateSSOProviderResponseData,
} from "./api/types";
import { paths } from "./api/v1";

export * from "./api/types";

export type SupabaseManagementAPIOptions = {
  accessToken: string;
  baseUrl?: string;
};

export class SupabaseManagementAPIError extends Error {
  constructor(message: string, public readonly response: Response) {
    super(message);
  }
}

export function isSupabaseError(
  error: unknown
): error is SupabaseManagementAPIError {
  return error instanceof SupabaseManagementAPIError;
}

export class SupabaseManagementAPI {
  constructor(private readonly options: SupabaseManagementAPIOptions) {}

  /**
   * List all organizations
   * @description Returns a list of organizations that you currently belong to.
   */
  async getOrganizations(): Promise<GetOrganizationsResponseData> {
    const { data, response } = await this.client.get("/v1/organizations", {});

    if (response.status !== 200) {
      throw new SupabaseManagementAPIError(
        `Failed to get organizations: ${response.statusText} (${response.status})`,
        response
      );
    }

    return data;
  }

  /** Create an organization */
  async createOrganization(
    body: CreateOrganizationRequestBody
  ): Promise<CreateOrganizationResponseData> {
    const { data, response } = await this.client.post("/v1/organizations", {
      body,
    });

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create organization");
    }

    return data;
  }

  /**
   * Get database branch config
   * @description Fetches configurations of the specified database branch
   */
  async getBranchDetails(
    branchId: string
  ): Promise<GetBranchDetailsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/branches/{branch_id_or_ref}",
      {
        params: {
          path: {
            branch_id_or_ref: branchId,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get branch details");
    }

    return data;
  }

  async deleteBranch(branchId: string) {
    const { response } = await this.client.del("/v1/branches/{branch_id_or_ref}", {
      params: {
        path: {
          branch_id_or_ref: branchId,
        },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete branch");
    }
  }

  async updateBranch(
    branchId: string,
    body: UpdateBranchRequestBody
  ): Promise<UpdateBranchResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/branches/{branch_id_or_ref}",
      {
        params: {
          path: {
            branch_id_or_ref: branchId,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update branch");
    }

    return data;
  }

  /**
   * List all projects
   * @description Returns a list of all projects you've previously created.
   */
  async getProjects(): Promise<GetProjectsResponseData> {
    const { data, response } = await this.client.get("/v1/projects", {});

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get projects");
    }

    return data;
  }

  /** Create a project */
  async createProject(
    body: CreateProjectRequestBody
  ): Promise<CreateProjectResponseData> {
    const { data, response } = await this.client.post("/v1/projects", {
      body,
    });

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create project");
    }

    return data;
  }

  /** Delete a project */
  async deleteProject(ref: string): Promise<DeleteProjectResponseBody> {
    const { data, response } = await this.client.del("/v1/projects/{ref}", {
      params: {
        path: {
          ref,
        },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete project");
    }

    return data;
  }

  /**
   * Check service health
   * @description Checks the health of the specified service.
   */
  async checkServiceHealth(
    ref: string,
    query: CheckServiceQuery
  ): Promise<CheckServiceHealthResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/health",
      {
        params: {
          query: query,
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "check service health");
    }

    return data;
  }

  /**
   * List all functions
   * @description Returns all functions you've previously added to the specified project.
   */
  async listFunctions(ref: string) {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/functions",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list functions");
    }

    return data;
  }

  /**
   * Create a function
   * @description Creates a function and adds it to the specified project.
   */
  async createFunction(
    ref: string,
    body: CreateFunctionRequestBody
  ): Promise<CreateFunctionResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/functions",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create function");
    }

    return data;
  }

  /**
   * Retrieve a function
   * @description Retrieves a function with the specified slug and project.
   */
  async getFunction(
    ref: string,
    slug: string
  ): Promise<GetFunctionResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/functions/{function_slug}",
      {
        params: {
          path: {
            ref,
            function_slug: slug,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get function");
    }

    return data;
  }

  /**
   * Update a function
   * @description Updates a function with the specified slug and project.
   */
  async updateFunction(
    ref: string,
    slug: string,
    body: UpdateFunctionRequestBody
  ): Promise<UpdateFunctionResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/projects/{ref}/functions/{function_slug}",
      {
        params: {
          path: {
            ref,
            function_slug: slug,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update function");
    }

    return data;
  }

  /**
   * Delete a function
   * @description Deletes a function with the specified slug from the specified project.
   */
  async deleteFunction(ref: string, slug: string) {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/functions/{function_slug}",
      {
        params: {
          path: {
            ref,
            function_slug: slug,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete function");
    }
  }

  /**
   * Retrieve a function body
   * @description Retrieves a function body for the specified slug and project.
   */
  async getFunctionBody(
    ref: string,
    slug: string
  ): Promise<GetFunctionBodyResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/functions/{function_slug}/body",
      {
        params: {
          path: {
            ref,
            function_slug: slug,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get function body");
    }

    return data;
  }

  async getProjectApiKeys(ref: string): Promise<GetProjectApiKeysResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/api-keys",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get project api keys");
    }

    return data;
  }

  /** Gets project's custom hostname config */
  async getCustomHostnameConfig(
    ref: string
  ): Promise<GetCustomHostnameResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/custom-hostname",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get custom hostname");
    }

    return data;
  }

  /** Deletes a project's custom hostname configuration */
  async removeCustomHostnameConfig(ref: string) {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/custom-hostname",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "remove custom hostname config"
      );
    }
  }

  /** Updates project's custom hostname configuration */
  async createCustomHostnameConfig(
    ref: string,
    body: CreateCustomHostnameRequestBody
  ): Promise<CreateCustomHostnameResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/custom-hostname/initialize",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(
        response,
        "create custom hostname config"
      );
    }

    return data;
  }

  /** Attempts to verify the DNS configuration for project's custom hostname configuration */
  async reverifyCustomHostnameConfig(
    ref: string
  ): Promise<ReverifyCustomHostnameResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/custom-hostname/reverify",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "reverify custom hostname config"
      );
    }

    return data;
  }

  /** Activates a custom hostname for a project. */
  async activateCustomHostnameConfig(
    ref: string
  ): Promise<ActivateCustomHostnameResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/custom-hostname/activate",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "activate custom hostname config"
      );
    }

    return data;
  }

  /** Gets project's network bans */
  async getNetworkBans(ref: string): Promise<GetNetworkBansResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/network-bans/retrieve",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get network bans");
    }

    return data;
  }

  /** Remove network bans. */
  async removeNetworkBan(ref: string, body: RemoveNetworkBanRequestBody) {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/network-bans",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "remove network ban");
    }
  }

  /** Gets project's network restrictions */
  async getNetworkRestrictions(
    ref: string
  ): Promise<GetNetworkRestrictionsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/network-restrictions",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get network restrictions"
      );
    }

    return data;
  }

  /** Updates project's network restrictions */
  async applyNetworkRestrictions(
    ref: string,
    body: ApplyNetworkRestrictionsRequestBody
  ): Promise<ApplyNetworkRestrictionsResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/network-restrictions/apply",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "apply network restrictions"
      );
    }

    return data;
  }

  /** Gets project's pgsodium config */
  async getPgsodiumConfig(ref: string): Promise<GetPgsodiumConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/pgsodium",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get pg sodium config");
    }

    return data;
  }

  /** Updates project's pgsodium config. Updating the root_key can cause all data encrypted with the older key to become inaccessible. */
  async updatePgSodiumConfig(
    ref: string,
    body: UpdatePgSodiumConfigRequestBody
  ): Promise<UpdatePgSodiumConfigResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/pgsodium",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update pg sodium config"
      );
    }

    return data;
  }

  /** Gets project's postgrest config */
  async getPostgRESTConfig(
    ref: string
  ): Promise<GetPostgRESTConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/postgrest",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get postgrest config");
    }

    return data;
  }

  /** Updates project's postgrest config */
  async updatePostgRESTConfig(
    ref: string,
    body: UpdatePostgRESTConfigRequestBody
  ): Promise<UpdatePostgRESTConfigResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/projects/{ref}/postgrest",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update postgrest config"
      );
    }

    return data;
  }

  /** Run sql query */
  async runQuery(ref: string, query: string): Promise<RunQueryResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/database/query",
      {
        params: {
          path: {
            ref,
          },
        },
        body: {
          query,
        },
      }
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "run query");
    }

    return data;
  }

  async enableWebhooks(ref: string) {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/database/webhooks/enable",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "enable webhooks");
    }
  }

  /**
   * List all secrets
   * @description Returns all secrets you've previously added to the specified project.
   */
  async getSecrets(ref: string): Promise<GetSecretsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/secrets",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get secrets");
    }

    return data;
  }

  /**
   * Bulk create secrets
   * @description Creates multiple secrets and adds them to the specified project.
   */
  async createSecrets(ref: string, body: CreateSecretsRequestBody) {
    const { response } = await this.client.post("/v1/projects/{ref}/secrets", {
      params: {
        path: {
          ref,
        },
      },
      body,
    });

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create secrets");
    }
  }

  /**
   * Bulk delete secrets
   * @description Deletes all secrets with the given names from the specified project
   */
  async deleteSecrets(
    ref: string,
    body: DeleteSecretsRequestBody
  ): Promise<DeleteSecretsResponseData> {
    const { data, response } = await this.client.del(
      "/v1/projects/{ref}/secrets",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete secrets");
    }

    return data;
  }

  /** Get project's SSL enforcement configuration. */
  async getSSLEnforcementConfig(
    ref: string
  ): Promise<GetSSLEnforcementConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/ssl-enforcement",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get ssl enforcement config"
      );
    }

    return data;
  }

  /** Update project's SSL enforcement configuration. */
  async updateSSLEnforcementConfig(
    ref: string,
    body: UpdateSSLEnforcementConfigRequestBody
  ): Promise<UpdateSSLEnforcementConfigResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/ssl-enforcement",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update ssl enforcement config"
      );
    }

    return data;
  }

  /**
   * Generate TypeScript types
   * @description Returns the TypeScript types of your schema for use with supabase-js.
   */
  async getTypescriptTypes(
    ref: string
  ): Promise<GetTypescriptTypesResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/types/typescript",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get typescript types");
    }

    return data;
  }

  /** Gets current vanity subdomain config */
  async getVanitySubdomainConfig(
    ref: string
  ): Promise<GetVanitySubdomainResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/vanity-subdomain",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get vanity subdomain config"
      );
    }

    return data;
  }

  /** Deletes a project's vanity subdomain configuration */
  async removeVanitySubdomainConfig(ref: string) {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/vanity-subdomain",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "remove vanity subdomain config"
      );
    }
  }

  /** Checks vanity subdomain availability */
  async checkVanitySubdomainAvailability(
    ref: string,
    subdomain: string
  ): Promise<boolean> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/vanity-subdomain/check-availability",
      {
        params: {
          path: {
            ref,
          },
        },
        body: {
          vanity_subdomain: subdomain,
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "check vanity subdomain availability"
      );
    }

    return typeof data === "undefined" ? false : data.available;
  }

  /** Activates a vanity subdomain for a project. */
  async activateVanitySubdomainPlease(
    ref: string,
    subdomain: string
  ): Promise<string | undefined> {
    const { response, data } = await this.client.post(
      "/v1/projects/{ref}/vanity-subdomain/activate",
      {
        params: {
          path: {
            ref,
          },
        },
        body: {
          vanity_subdomain: subdomain,
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "activate vanity subdomain"
      );
    }

    return data?.custom_domain;
  }

  /** Upgrades the project's Postgres version */
  async upgradeProject(ref: string, targetVersion: string) {
    const { response } = await this.client.post("/v1/projects/{ref}/upgrade", {
      params: {
        path: {
          ref,
        },
      },
      body: {
        target_version: targetVersion,
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "upgrade project");
    }
  }

  /** Returns the project's eligibility for upgrades */
  async getUpgradeEligibility(
    ref: string
  ): Promise<GetUpgradeEligibilityResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/upgrade/eligibility",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get upgrade eligibility"
      );
    }

    return data;
  }

  /** Gets the latest status of the project's upgrade */
  async getUpgradeStatus(ref: string): Promise<GetUpgradeStatusResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/upgrade/status",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get upgrade status");
    }

    return data;
  }

  /** Returns project's readonly mode status */
  async getReadOnlyModeStatus(
    ref: string
  ): Promise<GetReadonlyModeStatusResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/readonly",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get readonly mode status"
      );
    }

    return data;
  }

  /** Disables project's readonly mode for the next 15 minutes */
  async temporarilyDisableReadonlyMode(ref: string) {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/readonly/temporary-disable",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "temporarily disable readonly mode"
      );
    }
  }

  /** Gets project's Postgres config */
  async getPGConfig(ref: string): Promise<GetProjectPGConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/database/postgres",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get PG config");
    }

    return data;
  }

  /** Updates project's Postgres config */
  async updatePGConfig(
    ref: string,
    body: UpdateProjectPGConfigRequestBody
  ): Promise<UpdateProjectPGConfigResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/config/database/postgres",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update PG config");
    }

    return data;
  }

  /** Gets project's pgbouncer config */
  async getPgBouncerConfig(
    ref: string
  ): Promise<GetProjectPgBouncerConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/database/pgbouncer",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get Pgbouncer config");
    }

    return data;
  }

  /** Gets project's auth config */
  async getProjectAuthConfig(
    ref: string
  ): Promise<GetProjectAuthConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/auth",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get project auth config"
      );
    }

    return data;
  }

  /** Updates a project's auth config */
  async updateProjectAuthConfig(
    ref: string,
    body: UpdateProjectAuthConfigRequestBody
  ): Promise<UpdateProjectAuthConfigResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/projects/{ref}/config/auth",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update project auth config"
      );
    }

    return data;
  }

  /** Lists all SSO providers */
  async getSSOProviders(ref: string): Promise<GetSSOProvidersResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/auth/sso/providers",
      {
        params: {
          path: {
            ref,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get SSO providers");
    }

    return data;
  }

  /** Creates a new SSO provider */
  async createSSOProvider(
    ref: string,
    body: CreateSSOProviderRequestBody
  ): Promise<CreateSSOProviderResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/config/auth/sso/providers",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      }
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create SSO provider");
    }

    return data;
  }

  /** Gets a SSO provider by its UUID */
  async getSSOProvider(
    ref: string,
    uuid: string
  ): Promise<GetSSOProviderResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/auth/sso/providers/{provider_id}",
      {
        params: {
          path: {
            ref,
            provider_id: uuid,
          },
        },
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get SSO provider");
    }

    return data;
  }

  /** Updates a SSO provider by its UUID */
  async updateSSOProvider(
    ref: string,
    uuid: string,
    body: UpdateSSOProviderRequestBody
  ): Promise<UpdateSSOProviderResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/config/auth/sso/providers/{provider_id}",
      {
        params: {
          path: {
            ref,
            provider_id: uuid,
          },
        },
        body,
      }
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update SSO provider");
    }

    return data;
  }

  /** Removes a SSO provider by its UUID */
  async deleteSSOProvider(ref: string, uuid: string) {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/config/auth/sso/providers/{provider_id}",
      {
        params: {
          path: {
            ref,
            provider_id: uuid,
          },
        },
      }
    );

    if (response.status !== 204) {
      throw await this.#createResponseError(response, "delete SSO provider");
    }
  }

  /** List snippets */
  async listSnippets(projectRef?: string) {
    const { data, response } = await this.client.get("/v1/snippets", {
      params: {
        query: {
          project_ref: projectRef,
        },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list snippets");
    }

    return data;
  }

  async getSnippet(id: string) {
    const { data, response } = await this.client.get("/v1/snippets/{id}", {
      params: {
        path: {
          id,
        },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get snippet");
    }

    return data;
  }

  get client() {
    return createClient<paths>({
      baseUrl: this.options.baseUrl || SUPABASE_API_URL,
      headers: {
        Authorization: `Bearer ${this.options.accessToken}`,
      },
    });
  }

  async #createResponseError(response: Response, action: string) {
    const errorBody = await safeParseErrorResponseBody(response);

    return new SupabaseManagementAPIError(
      `Failed to ${action}: ${response.statusText} (${response.status})${
        errorBody ? `: ${errorBody.message}` : ""
      }`,
      response
    );
  }
}

async function safeParseErrorResponseBody(
  response: Response
): Promise<{ message: string } | undefined> {
  try {
    const body = await response.json();

    if (
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
    ) {
      return { message: body.message };
    }
  } catch (error) {
    return;
  }
}
