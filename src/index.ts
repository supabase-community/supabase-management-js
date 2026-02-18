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
  BulkUpdateFunctionsRequestBody,
  BulkUpdateFunctionsResponseData,
  CreateFunctionRequestBody,
  CreateFunctionResponseData,
  DeployFunctionRequestBody,
  DeployFunctionResponseData,
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
  GetBranchByNameResponseData,
  ListBranchesResponseData,
  CreateBranchRequestBody,
  CreateBranchResponseData,
  PushBranchRequestBody,
  PushBranchResponseData,
  MergeBranchRequestBody,
  MergeBranchResponseData,
  ResetBranchRequestBody,
  ResetBranchResponseData,
  RestoreBranchResponseData,
  DiffBranchQuery,
  DiffBranchResponseData,
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
  GetAvailableRegionsQuery,
  GetAvailableRegionsResponseData,
  GetProjectResponseData,
  UpdateProjectRequestBody,
  UpdateProjectResponseData,
  ListAvailableRestoreVersionsResponseData,
  GetProjectClaimTokenResponseData,
  CreateProjectClaimTokenResponseData,
  RunReadOnlyQueryRequestBody,
  UpdateDatabasePasswordRequestBody,
  UpdateDatabasePasswordResponseData,
  GetDatabaseContextResponseData,
  ListMigrationsResponseData,
  UpsertMigrationRequestBody,
  ApplyMigrationRequestBody,
  RollbackMigrationsQuery,
  GetMigrationResponseData,
  PatchMigrationRequestBody,
  ListBackupsResponseData,
  RestorePitrBackupRequestBody,
  GetRestorePointQuery,
  GetRestorePointResponseData,
  CreateRestorePointRequestBody,
  CreateRestorePointResponseData,
  UndoToRestorePointRequestBody,
  GetJitAccessResponseData,
  UpdateJitAccessRequestBody,
  UpdateJitAccessResponseData,
  AuthorizeJitAccessRequestBody,
  AuthorizeJitAccessResponseData,
  ListJitAccessResponseData,
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
  GetDiskUtilizationResponseData,
  ModifyDatabaseDiskRequestBody,
  GetDiskAutoscaleConfigResponseData,
  GetStorageConfigResponseData,
  UpdateStorageConfigRequestBody,
  GetPoolerConfigResponseData,
  UpdatePoolerConfigRequestBody,
  UpdatePoolerConfigResponseData,
  GetRealtimeConfigResponseData,
  UpdateRealtimeConfigRequestBody,
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
  error: unknown,
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
        response,
      );
    }

    return data;
  }

  /** Create an organization */
  async createOrganization(
    body: CreateOrganizationRequestBody,
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
    branchId: string,
  ): Promise<GetBranchDetailsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/branches/{branch_id_or_ref}",
      {
        params: {
          path: {
            branch_id_or_ref: branchId,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get branch details");
    }

    return data;
  }

  async deleteBranch(branchId: string) {
    const { response } = await this.client.del(
      "/v1/branches/{branch_id_or_ref}",
      {
        params: {
          path: {
            branch_id_or_ref: branchId,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete branch");
    }
  }

  async updateBranch(
    branchId: string,
    body: UpdateBranchRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update branch");
    }

    return data;
  }

  /**
   * List all database branches
   * @description Returns all database branches of the specified project.
   */
  async listBranches(ref: string): Promise<ListBranchesResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/branches",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list branches");
    }

    return data;
  }

  /**
   * Create a database branch
   * @description Creates a database branch from the specified project.
   */
  async createBranch(
    ref: string,
    body: CreateBranchRequestBody,
  ): Promise<CreateBranchResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/branches",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create branch");
    }

    return data;
  }

  /**
   * Disables preview branching
   * @description Disables preview branching for the specified project.
   */
  async disablePreviewBranching(ref: string): Promise<void> {
    const { response } = await this.client.del("/v1/projects/{ref}/branches", {
      params: {
        path: { ref },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "disable preview branching",
      );
    }
  }

  /**
   * Get a database branch by name
   * @description Fetches the specified database branch by its name.
   */
  async getBranchByName(
    ref: string,
    name: string,
  ): Promise<GetBranchByNameResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/branches/{name}",
      {
        params: {
          path: { ref, name },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get branch by name");
    }

    return data;
  }

  /**
   * Push a database branch
   * @description Pushes the specified database branch.
   */
  async pushBranch(
    branchId: string,
    body: PushBranchRequestBody,
  ): Promise<PushBranchResponseData> {
    const { data, response } = await this.client.post(
      "/v1/branches/{branch_id_or_ref}/push",
      {
        params: {
          path: { branch_id_or_ref: branchId },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "push branch");
    }

    return data;
  }

  /**
   * Merge a database branch
   * @description Merges the specified database branch.
   */
  async mergeBranch(
    branchId: string,
    body: MergeBranchRequestBody,
  ): Promise<MergeBranchResponseData> {
    const { data, response } = await this.client.post(
      "/v1/branches/{branch_id_or_ref}/merge",
      {
        params: {
          path: { branch_id_or_ref: branchId },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "merge branch");
    }

    return data;
  }

  /**
   * Reset a database branch
   * @description Resets the specified database branch.
   */
  async resetBranch(
    branchId: string,
    body: ResetBranchRequestBody,
  ): Promise<ResetBranchResponseData> {
    const { data, response } = await this.client.post(
      "/v1/branches/{branch_id_or_ref}/reset",
      {
        params: {
          path: { branch_id_or_ref: branchId },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "reset branch");
    }

    return data;
  }

  /**
   * Restore a scheduled branch deletion
   * @description Cancels scheduled deletion and restores the branch to active state.
   */
  async restoreBranch(branchId: string): Promise<RestoreBranchResponseData> {
    const { data, response } = await this.client.post(
      "/v1/branches/{branch_id_or_ref}/restore",
      {
        params: {
          path: { branch_id_or_ref: branchId },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "restore branch");
    }

    return data;
  }

  /**
   * Diff a database branch
   * @description Diffs the specified database branch against production.
   */
  async diffBranch(
    branchId: string,
    query?: DiffBranchQuery,
  ): Promise<DiffBranchResponseData> {
    const { data, response } = await this.client.get(
      "/v1/branches/{branch_id_or_ref}/diff",
      {
        params: {
          path: { branch_id_or_ref: branchId },
          ...(query ? { query } : {}),
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "diff branch");
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
    body: CreateProjectRequestBody,
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
   * Get available regions
   * @description Gets the list of available regions that can be used for a new project.
   */
  async getAvailableRegions(
    query: GetAvailableRegionsQuery,
  ): Promise<GetAvailableRegionsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/available-regions",
      {
        params: { query },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get available regions");
    }

    return data;
  }

  /**
   * Get a project
   * @description Gets a specific project that belongs to the authenticated user.
   */
  async getProject(ref: string): Promise<GetProjectResponseData> {
    const { data, response } = await this.client.get("/v1/projects/{ref}", {
      params: {
        path: { ref },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get project");
    }

    return data;
  }

  /**
   * Update a project
   * @description Updates the given project.
   */
  async updateProject(
    ref: string,
    body: UpdateProjectRequestBody,
  ): Promise<UpdateProjectResponseData> {
    const { data, response } = await this.client.patch("/v1/projects/{ref}", {
      params: {
        path: { ref },
      },
      body,
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update project");
    }

    return data;
  }

  /**
   * Pause a project
   * @description Pauses the given project.
   */
  async pauseProject(ref: string): Promise<void> {
    const { response } = await this.client.post("/v1/projects/{ref}/pause", {
      params: {
        path: { ref },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "pause project");
    }
  }

  /**
   * List available restore versions
   * @description Lists available restore versions for the given project.
   */
  async listAvailableRestoreVersions(
    ref: string,
  ): Promise<ListAvailableRestoreVersionsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/restore",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "list available restore versions",
      );
    }

    return data;
  }

  /**
   * Restore a project
   * @description Restores the given project.
   */
  async restoreProject(ref: string): Promise<void> {
    const { response } = await this.client.post("/v1/projects/{ref}/restore", {
      params: {
        path: { ref },
      },
    });

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "restore project");
    }
  }

  /**
   * Cancel a project restoration
   * @description Cancels the given project restoration.
   */
  async cancelProjectRestoration(ref: string): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/restore/cancel",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "cancel project restoration",
      );
    }
  }

  /**
   * Get project claim token
   * @description Gets the project claim token.
   */
  async getProjectClaimToken(
    ref: string,
  ): Promise<GetProjectClaimTokenResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/claim-token",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get project claim token",
      );
    }

    return data;
  }

  /**
   * Create project claim token
   * @description Creates a project claim token.
   */
  async createProjectClaimToken(
    ref: string,
  ): Promise<CreateProjectClaimTokenResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/claim-token",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "create project claim token",
      );
    }

    return data;
  }

  /**
   * Revoke project claim token
   * @description Revokes the project claim token.
   */
  async revokeProjectClaimToken(ref: string): Promise<void> {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/claim-token",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 204) {
      throw await this.#createResponseError(
        response,
        "revoke project claim token",
      );
    }
  }

  /**
   * Check service health
   * @description Checks the health of the specified service.
   */
  async checkServiceHealth(
    ref: string,
    query: CheckServiceQuery,
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
      },
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list functions");
    }

    return data;
  }

  /**
   * Bulk update functions
   * @description Bulk update functions. It will create a new function or replace existing. The operation is idempotent.
   */
  async bulkUpdateFunctions(
    ref: string,
    body: BulkUpdateFunctionsRequestBody,
  ): Promise<BulkUpdateFunctionsResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/functions",
      {
        params: {
          path: {
            ref,
          },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "bulk update functions");
    }

    return data;
  }

  /**
   * Deploy a function
   * @description Deploys a function. It will create if the function does not exist.
   */
  async deployFunction(
    ref: string,
    body: DeployFunctionRequestBody,
    slug?: string,
  ): Promise<DeployFunctionResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/functions/deploy",
      {
        params: {
          path: {
            ref,
          },
          query: {
            slug,
          },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "deploy function");
    }

    return data;
  }

  /**
   * Create a function
   * @deprecated Use deployFunction instead.
   * @description Creates a function and adds it to the specified project.
   */
  async createFunction(
    ref: string,
    body: CreateFunctionRequestBody,
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
      },
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
    slug: string,
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
      },
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
    body: UpdateFunctionRequestBody,
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
      },
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
      },
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
    slug: string,
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
      },
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get project api keys");
    }

    return data;
  }

  /** Gets project's custom hostname config */
  async getCustomHostnameConfig(
    ref: string,
  ): Promise<GetCustomHostnameResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/custom-hostname",
      {
        params: {
          path: {
            ref,
          },
        },
      },
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "remove custom hostname config",
      );
    }
  }

  /** Updates project's custom hostname configuration */
  async createCustomHostnameConfig(
    ref: string,
    body: CreateCustomHostnameRequestBody,
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
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(
        response,
        "create custom hostname config",
      );
    }

    return data;
  }

  /** Attempts to verify the DNS configuration for project's custom hostname configuration */
  async reverifyCustomHostnameConfig(
    ref: string,
  ): Promise<ReverifyCustomHostnameResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/custom-hostname/reverify",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "reverify custom hostname config",
      );
    }

    return data;
  }

  /** Activates a custom hostname for a project. */
  async activateCustomHostnameConfig(
    ref: string,
  ): Promise<ActivateCustomHostnameResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/custom-hostname/activate",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "activate custom hostname config",
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
      },
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "remove network ban");
    }
  }

  /** Gets project's network restrictions */
  async getNetworkRestrictions(
    ref: string,
  ): Promise<GetNetworkRestrictionsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/network-restrictions",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get network restrictions",
      );
    }

    return data;
  }

  /** Updates project's network restrictions */
  async applyNetworkRestrictions(
    ref: string,
    body: ApplyNetworkRestrictionsRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "apply network restrictions",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get pg sodium config");
    }

    return data;
  }

  /** Updates project's pgsodium config. Updating the root_key can cause all data encrypted with the older key to become inaccessible. */
  async updatePgSodiumConfig(
    ref: string,
    body: UpdatePgSodiumConfigRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update pg sodium config",
      );
    }

    return data;
  }

  /** Gets project's postgrest config */
  async getPostgRESTConfig(
    ref: string,
  ): Promise<GetPostgRESTConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/postgrest",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get postgrest config");
    }

    return data;
  }

  /** Updates project's postgrest config */
  async updatePostgRESTConfig(
    ref: string,
    body: UpdatePostgRESTConfigRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update postgrest config",
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
      },
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
      },
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
      },
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
    body: DeleteSecretsRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete secrets");
    }

    return data;
  }

  /** Get project's SSL enforcement configuration. */
  async getSSLEnforcementConfig(
    ref: string,
  ): Promise<GetSSLEnforcementConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/ssl-enforcement",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get ssl enforcement config",
      );
    }

    return data;
  }

  /** Update project's SSL enforcement configuration. */
  async updateSSLEnforcementConfig(
    ref: string,
    body: UpdateSSLEnforcementConfigRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update ssl enforcement config",
      );
    }

    return data;
  }

  /**
   * Generate TypeScript types
   * @description Returns the TypeScript types of your schema for use with supabase-js.
   */
  async getTypescriptTypes(
    ref: string,
  ): Promise<GetTypescriptTypesResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/types/typescript",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get typescript types");
    }

    return data;
  }

  /** Gets current vanity subdomain config */
  async getVanitySubdomainConfig(
    ref: string,
  ): Promise<GetVanitySubdomainResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/vanity-subdomain",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get vanity subdomain config",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "remove vanity subdomain config",
      );
    }
  }

  /** Checks vanity subdomain availability */
  async checkVanitySubdomainAvailability(
    ref: string,
    subdomain: string,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "check vanity subdomain availability",
      );
    }

    return typeof data === "undefined" ? false : data.available;
  }

  /** Activates a vanity subdomain for a project. */
  async activateVanitySubdomainPlease(
    ref: string,
    subdomain: string,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "activate vanity subdomain",
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
    ref: string,
  ): Promise<GetUpgradeEligibilityResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/upgrade/eligibility",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get upgrade eligibility",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get upgrade status");
    }

    return data;
  }

  /** Returns project's readonly mode status */
  async getReadOnlyModeStatus(
    ref: string,
  ): Promise<GetReadonlyModeStatusResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/readonly",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get readonly mode status",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "temporarily disable readonly mode",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get PG config");
    }

    return data;
  }

  /** Updates project's Postgres config */
  async updatePGConfig(
    ref: string,
    body: UpdateProjectPGConfigRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update PG config");
    }

    return data;
  }

  /** Gets project's pgbouncer config */
  async getPgBouncerConfig(
    ref: string,
  ): Promise<GetProjectPgBouncerConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/database/pgbouncer",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get Pgbouncer config");
    }

    return data;
  }

  /** Gets project's auth config */
  async getProjectAuthConfig(
    ref: string,
  ): Promise<GetProjectAuthConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/auth",
      {
        params: {
          path: {
            ref,
          },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get project auth config",
      );
    }

    return data;
  }

  /** Updates a project's auth config */
  async updateProjectAuthConfig(
    ref: string,
    body: UpdateProjectAuthConfigRequestBody,
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update project auth config",
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
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get SSO providers");
    }

    return data;
  }

  /** Creates a new SSO provider */
  async createSSOProvider(
    ref: string,
    body: CreateSSOProviderRequestBody,
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
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create SSO provider");
    }

    return data;
  }

  /** Gets a SSO provider by its UUID */
  async getSSOProvider(
    ref: string,
    uuid: string,
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
      },
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
    body: UpdateSSOProviderRequestBody,
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
      },
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
      },
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

  /**
   * Run a read-only SQL query
   * @description Runs a SQL query as supabase_read_only_user. All entity references must be schema qualified.
   */
  async runReadOnlyQuery(
    ref: string,
    body: RunReadOnlyQueryRequestBody,
  ): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/database/query/read-only",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "run read-only query");
    }
  }

  /**
   * Update database password
   * @description Updates the database password for the given project.
   */
  async updateDatabasePassword(
    ref: string,
    body: UpdateDatabasePasswordRequestBody,
  ): Promise<UpdateDatabasePasswordResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/projects/{ref}/database/password",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "update database password",
      );
    }

    return data;
  }

  /**
   * Get database metadata
   * @deprecated This is an experimental endpoint.
   * @description Gets database metadata for the given project.
   */
  async getDatabaseContext(
    ref: string,
  ): Promise<GetDatabaseContextResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/context",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get database context");
    }

    return data;
  }

  /**
   * List migration history
   * @description Lists applied migration versions. Only available to selected partner OAuth apps.
   */
  async listMigrations(ref: string): Promise<ListMigrationsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/migrations",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list migrations");
    }

    return data;
  }

  /**
   * Upsert a migration without applying
   * @description Upserts a database migration without applying it. Only available to selected partner OAuth apps.
   */
  async upsertMigration(
    ref: string,
    body: UpsertMigrationRequestBody,
  ): Promise<void> {
    const { response } = await this.client.put(
      "/v1/projects/{ref}/database/migrations",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "upsert migration");
    }
  }

  /**
   * Apply a database migration
   * @description Applies a database migration. Only available to selected partner OAuth apps.
   */
  async applyMigration(
    ref: string,
    body: ApplyMigrationRequestBody,
  ): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/database/migrations",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "apply migration");
    }
  }

  /**
   * Rollback database migrations
   * @description Rolls back migrations and removes them from the history table. Only available to selected partner OAuth apps.
   */
  async rollbackMigrations(
    ref: string,
    query: RollbackMigrationsQuery,
  ): Promise<void> {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/database/migrations",
      {
        params: {
          path: { ref },
          query,
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "rollback migrations");
    }
  }

  /**
   * Get a migration entry
   * @description Fetches an existing entry from migration history. Only available to selected partner OAuth apps.
   */
  async getMigration(
    ref: string,
    version: string,
  ): Promise<GetMigrationResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/migrations/{version}",
      {
        params: {
          path: { ref, version },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get migration");
    }

    return data;
  }

  /**
   * Patch a migration entry
   * @description Patches an existing entry in migration history. Only available to selected partner OAuth apps.
   */
  async patchMigration(
    ref: string,
    version: string,
    body: PatchMigrationRequestBody,
  ): Promise<void> {
    const { response } = await this.client.patch(
      "/v1/projects/{ref}/database/migrations/{version}",
      {
        params: {
          path: { ref, version },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "patch migration");
    }
  }

  /**
   * List all backups
   * @description Lists all backups for the given project.
   */
  async listBackups(ref: string): Promise<ListBackupsResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/backups",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list backups");
    }

    return data;
  }

  /**
   * Restore a PITR backup
   * @description Restores a PITR backup for a database.
   */
  async restorePitrBackup(
    ref: string,
    body: RestorePitrBackupRequestBody,
  ): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/database/backups/restore-pitr",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "restore PITR backup");
    }
  }

  /**
   * Get restore points
   * @description Gets restore points for the given project.
   */
  async getRestorePoints(
    ref: string,
    query?: GetRestorePointQuery,
  ): Promise<GetRestorePointResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/backups/restore-point",
      {
        params: {
          path: { ref },
          query,
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get restore points");
    }

    return data;
  }

  /**
   * Create a restore point
   * @description Initiates creation of a restore point for a database.
   */
  async createRestorePoint(
    ref: string,
    body: CreateRestorePointRequestBody,
  ): Promise<CreateRestorePointResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/database/backups/restore-point",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "create restore point");
    }

    return data;
  }

  /**
   * Undo to a restore point
   * @description Initiates an undo to a given restore point.
   */
  async undoToRestorePoint(
    ref: string,
    body: UndoToRestorePointRequestBody,
  ): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/database/backups/undo",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "undo to restore point");
    }
  }

  /**
   * Get JIT access mappings
   * @description Returns user-id to role mappings for JIT access.
   */
  async getJitAccess(ref: string): Promise<GetJitAccessResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/jit",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get JIT access");
    }

    return data;
  }

  /**
   * Update a JIT access mapping
   * @description Modifies the roles that can be assumed and for how long.
   */
  async updateJitAccess(
    ref: string,
    body: UpdateJitAccessRequestBody,
  ): Promise<UpdateJitAccessResponseData> {
    const { data, response } = await this.client.put(
      "/v1/projects/{ref}/database/jit",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update JIT access");
    }

    return data;
  }

  /**
   * Authorize JIT access
   * @description Authorizes the request to assume a role in the project database.
   */
  async authorizeJitAccess(
    ref: string,
    body: AuthorizeJitAccessRequestBody,
  ): Promise<AuthorizeJitAccessResponseData> {
    const { data, response } = await this.client.post(
      "/v1/projects/{ref}/database/jit",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "authorize JIT access");
    }

    return data;
  }

  /**
   * List all JIT access mappings
   * @description Returns all user-id to role mappings for JIT access.
   */
  async listJitAccess(ref: string): Promise<ListJitAccessResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/database/jit/list",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "list JIT access");
    }

    return data;
  }

  /**
   * Delete JIT access by user
   * @description Removes JIT mappings of a user, revoking all JIT database access.
   */
  async deleteJitAccess(ref: string, userId: string): Promise<void> {
    const { response } = await this.client.del(
      "/v1/projects/{ref}/database/jit/{user_id}",
      {
        params: {
          path: { ref, user_id: userId },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "delete JIT access");
    }
  }

  /**
   * Get disk utilization metrics
   * @description Gets disk utilization metrics for the given project.
   */
  async getDiskUtilization(
    ref: string,
  ): Promise<GetDiskUtilizationResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/disk/util",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get disk utilization");
    }

    return data;
  }

  /**
   * Modify database disk
   * @description Modifies the disk configuration for the given project.
   */
  async modifyDatabaseDisk(
    ref: string,
    body: ModifyDatabaseDiskRequestBody,
  ): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/config/disk",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 201) {
      throw await this.#createResponseError(response, "modify database disk");
    }
  }

  /**
   * Get disk autoscale config
   * @description Gets the disk autoscale configuration for the given project.
   */
  async getDiskAutoscaleConfig(
    ref: string,
  ): Promise<GetDiskAutoscaleConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/disk/autoscale",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(
        response,
        "get disk autoscale config",
      );
    }

    return data;
  }

  /**
   * Get storage config
   * @description Gets the storage configuration for the given project.
   */
  async getStorageConfig(ref: string): Promise<GetStorageConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/storage",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get storage config");
    }

    return data;
  }

  /**
   * Update storage config
   * @description Updates the storage configuration for the given project.
   */
  async updateStorageConfig(
    ref: string,
    body: UpdateStorageConfigRequestBody,
  ): Promise<void> {
    const { response } = await this.client.patch(
      "/v1/projects/{ref}/config/storage",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update storage config");
    }
  }

  /**
   * Get pooler (supavisor) config
   * @description Gets the supavisor (pooler) configuration for the given project.
   */
  async getPoolerConfig(ref: string): Promise<GetPoolerConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/database/pooler",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get pooler config");
    }

    return data;
  }

  /**
   * Update pooler config
   * @description Updates the supavisor (pooler) configuration for the given project.
   */
  async updatePoolerConfig(
    ref: string,
    body: UpdatePoolerConfigRequestBody,
  ): Promise<UpdatePoolerConfigResponseData> {
    const { data, response } = await this.client.patch(
      "/v1/projects/{ref}/config/database/pooler",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "update pooler config");
    }

    return data;
  }

  /**
   * Get realtime config
   * @description Gets the realtime configuration for the given project.
   */
  async getRealtimeConfig(ref: string): Promise<GetRealtimeConfigResponseData> {
    const { data, response } = await this.client.get(
      "/v1/projects/{ref}/config/realtime",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 200) {
      throw await this.#createResponseError(response, "get realtime config");
    }

    return data;
  }

  /**
   * Update realtime config
   * @description Updates the realtime configuration for the given project.
   */
  async updateRealtimeConfig(
    ref: string,
    body: UpdateRealtimeConfigRequestBody,
  ): Promise<void> {
    const { response } = await this.client.patch(
      "/v1/projects/{ref}/config/realtime",
      {
        params: {
          path: { ref },
        },
        body,
      },
    );

    if (response.status !== 204) {
      throw await this.#createResponseError(response, "update realtime config");
    }
  }

  /**
   * Shutdown realtime connections
   * @description Shuts down all realtime connections for the given project.
   */
  async shutdownRealtime(ref: string): Promise<void> {
    const { response } = await this.client.post(
      "/v1/projects/{ref}/config/realtime/shutdown",
      {
        params: {
          path: { ref },
        },
      },
    );

    if (response.status !== 204) {
      throw await this.#createResponseError(
        response,
        "shutdown realtime connections",
      );
    }
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
      response,
    );
  }
}

async function safeParseErrorResponseBody(
  response: Response,
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
