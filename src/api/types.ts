import { paths } from "./v1";
import {
  ExtractRequestBody,
  ExtractRequestQuery,
  ExtractResponseContent,
} from "./utils";

export type GetOrganizationsResponseData = ExtractResponseContent<
  paths["/v1/organizations"],
  "get",
  200
>;

export type CreateOrganizationRequestBody = ExtractRequestBody<
  paths["/v1/organizations"],
  "post"
>;

export type CreateOrganizationResponseData = ExtractResponseContent<
  paths["/v1/organizations"],
  "post",
  201
>;

export type GetBranchDetailsResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}"],
  "get",
  200
>;

export type UpdateBranchRequestBody = ExtractRequestBody<
  paths["/v1/branches/{branch_id_or_ref}"],
  "patch"
>;

export type UpdateBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}"],
  "patch",
  200
>;

export type ListBranchesResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/branches"],
  "get",
  200
>;

export type CreateBranchRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/branches"],
  "post"
>;

export type CreateBranchResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/branches"],
  "post",
  201
>;

export type GetBranchByNameResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/branches/{name}"],
  "get",
  200
>;

export type PushBranchRequestBody = ExtractRequestBody<
  paths["/v1/branches/{branch_id_or_ref}/push"],
  "post"
>;

export type PushBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}/push"],
  "post",
  201
>;

export type MergeBranchRequestBody = ExtractRequestBody<
  paths["/v1/branches/{branch_id_or_ref}/merge"],
  "post"
>;

export type MergeBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}/merge"],
  "post",
  201
>;

export type ResetBranchRequestBody = ExtractRequestBody<
  paths["/v1/branches/{branch_id_or_ref}/reset"],
  "post"
>;

export type ResetBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}/reset"],
  "post",
  201
>;

export type RestoreBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}/restore"],
  "post",
  200
>;

export type DiffBranchQuery = ExtractRequestQuery<
  paths["/v1/branches/{branch_id_or_ref}/diff"],
  "get"
>;

export type DiffBranchResponseData = ExtractResponseContent<
  paths["/v1/branches/{branch_id_or_ref}/diff"],
  "get",
  200,
  "text/plain"
>;

export type GetProjectsResponseData = ExtractResponseContent<
  paths["/v1/projects"],
  "get",
  200
>;

export type CreateProjectResponseData = ExtractResponseContent<
  paths["/v1/projects"],
  "post",
  201
>;

export type CreateProjectRequestBody = ExtractRequestBody<
  paths["/v1/projects"],
  "post"
>;

export type DeleteProjectResponseBody = ExtractResponseContent<
  paths["/v1/projects/{ref}"],
  "delete",
  200
>;

export type ListFunctionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions"],
  "get",
  200
>;

export type CreateFunctionRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/functions"],
  "post"
>;

export type CreateFunctionResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions"],
  "post",
  201
>;

export type GetFunctionResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions/{function_slug}"],
  "get",
  200
>;

export type UpdateFunctionRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/functions/{function_slug}"],
  "patch"
>;

export type UpdateFunctionResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions/{function_slug}"],
  "patch",
  200
>;

export type GetFunctionBodyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions/{function_slug}/body"],
  "get",
  200
>;

export type DeployFunctionRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/functions/deploy"],
  "post",
  "multipart/form-data"
>;

export type DeployFunctionResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions/deploy"],
  "post",
  201
>;

export type BulkUpdateFunctionsRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/functions"],
  "put"
>;

export type BulkUpdateFunctionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/functions"],
  "put",
  200
>;

export type GetProjectApiKeysResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/api-keys"],
  "get",
  200
>;

export type GetCustomHostnameResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/custom-hostname"],
  "get",
  200
>;

export type CreateCustomHostnameRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/custom-hostname/initialize"],
  "post"
>;

export type CreateCustomHostnameResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/custom-hostname/initialize"],
  "post",
  201
>;

export type ReverifyCustomHostnameResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/custom-hostname/reverify"],
  "post",
  201
>;

export type ActivateCustomHostnameResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/custom-hostname/activate"],
  "post",
  201
>;

export type GetNetworkBansResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/network-bans/retrieve"],
  "post",
  201
>;

export type RemoveNetworkBanRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/network-bans"],
  "delete"
>;

export type GetNetworkRestrictionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/network-restrictions"],
  "get",
  200
>;

export type ApplyNetworkRestrictionsRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/network-restrictions/apply"],
  "post"
>;

export type ApplyNetworkRestrictionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/network-restrictions/apply"],
  "post",
  201
>;

export type GetPgsodiumConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/pgsodium"],
  "get",
  200
>;

export type UpdatePgSodiumConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/pgsodium"],
  "put"
>;

export type UpdatePgSodiumConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/pgsodium"],
  "put",
  200
>;

export type GetPostgRESTConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/postgrest"],
  "get",
  200
>;

export type UpdatePostgRESTConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/postgrest"],
  "patch"
>;

export type UpdatePostgRESTConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/postgrest"],
  "patch",
  200
>;

export type RunQueryResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/query"],
  "post",
  201
>;

export type GetSecretsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/secrets"],
  "get",
  200
>;

export type CreateSecretsRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/secrets"],
  "post"
>;

export type DeleteSecretsRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/secrets"],
  "delete"
>;

export type DeleteSecretsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/secrets"],
  "delete",
  200
>;

export type GetSSLEnforcementConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/ssl-enforcement"],
  "get",
  200
>;

export type UpdateSSLEnforcementConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/ssl-enforcement"],
  "put"
>;

export type UpdateSSLEnforcementConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/ssl-enforcement"],
  "put",
  200
>;

export type GetTypescriptTypesResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/types/typescript"],
  "get",
  200
>;

export type GetVanitySubdomainResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/vanity-subdomain"],
  "get",
  200
>;

export type GetUpgradeEligibilityResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/upgrade/eligibility"],
  "get",
  200
>;

export type GetUpgradeStatusResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/upgrade/status"],
  "get",
  200
>;

export type GetReadonlyModeStatusResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/readonly"],
  "get",
  200
>;

export type GetProjectPGConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/database/postgres"],
  "get",
  200
>;

export type UpdateProjectPGConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/database/postgres"],
  "put"
>;

export type UpdateProjectPGConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/database/postgres"],
  "put",
  200
>;

export type GetProjectPgBouncerConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/database/pgbouncer"],
  "get",
  200
>;

export type GetSSOProvidersResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/sso/providers"],
  "get",
  200
>;

export type GetProjectAuthConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth"],
  "get",
  200
>;

export type UpdateProjectAuthConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth"],
  "patch"
>;

export type UpdateProjectAuthConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth"],
  "patch",
  200
>;

export type CreateSSOProviderRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth/sso/providers"],
  "post"
>;

export type CreateSSOProviderResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/sso/providers"],
  "post",
  201
>;

export type GetSSOProviderResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/sso/providers/{provider_id}"],
  "get",
  200
>;

export type UpdateSSOProviderRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth/sso/providers/{provider_id}"],
  "put"
>;

export type UpdateSSOProviderResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/sso/providers/{provider_id}"],
  "put",
  200
>;

export type ListSnippetsResponseData = ExtractResponseContent<
  paths["/v1/snippets"],
  "get",
  200
>;

export type GetSnippetResponseData = ExtractResponseContent<
  paths["/v1/snippets/{id}"],
  "get",
  200
>;

export type CheckServiceQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/health"],
  "get"
>;

export type CheckServiceHealthResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/health"],
  "get",
  200
>;

// Projects (general)

export type GetAvailableRegionsQuery = ExtractRequestQuery<
  paths["/v1/projects/available-regions"],
  "get"
>;

export type GetAvailableRegionsResponseData = ExtractResponseContent<
  paths["/v1/projects/available-regions"],
  "get",
  200
>;

export type GetProjectResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}"],
  "get",
  200
>;

export type UpdateProjectRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}"],
  "patch"
>;

export type UpdateProjectResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}"],
  "patch",
  200
>;

export type ListAvailableRestoreVersionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/restore"],
  "get",
  200
>;

export type GetProjectClaimTokenResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/claim-token"],
  "get",
  200
>;

export type CreateProjectClaimTokenResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/claim-token"],
  "post",
  200
>;

// Database

export type RunReadOnlyQueryRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/query/read-only"],
  "post"
>;

export type UpdateDatabasePasswordRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/password"],
  "patch"
>;

export type UpdateDatabasePasswordResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/password"],
  "patch",
  200
>;

export type GetDatabaseContextResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/context"],
  "get",
  200
>;

export type ListMigrationsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/migrations"],
  "get",
  200
>;

export type UpsertMigrationRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/migrations"],
  "put"
>;

export type ApplyMigrationRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/migrations"],
  "post"
>;

export type RollbackMigrationsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/database/migrations"],
  "delete"
>;

export type GetMigrationResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/migrations/{version}"],
  "get",
  200
>;

export type PatchMigrationRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/migrations/{version}"],
  "patch"
>;

export type ListBackupsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/backups"],
  "get",
  200
>;

export type RestorePitrBackupRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/backups/restore-pitr"],
  "post"
>;

export type GetRestorePointQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/database/backups/restore-point"],
  "get"
>;

export type GetRestorePointResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/backups/restore-point"],
  "get",
  200
>;

export type CreateRestorePointRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/backups/restore-point"],
  "post"
>;

export type CreateRestorePointResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/backups/restore-point"],
  "post",
  201
>;

export type UndoToRestorePointRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/backups/undo"],
  "post"
>;

export type GetJitAccessResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/jit"],
  "get",
  200
>;

export type UpdateJitAccessRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/jit"],
  "put"
>;

export type UpdateJitAccessResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/jit"],
  "put",
  200
>;

export type AuthorizeJitAccessRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/database/jit"],
  "post"
>;

export type AuthorizeJitAccessResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/jit"],
  "post",
  200
>;

export type ListJitAccessResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/database/jit/list"],
  "get",
  200
>;

// Config — Disk
export type GetDiskUtilizationResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/disk/util"],
  "get",
  200
>;

export type ModifyDatabaseDiskRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/disk"],
  "post"
>;

export type GetDiskAutoscaleConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/disk/autoscale"],
  "get",
  200
>;

// Config — Storage
export type GetStorageConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/storage"],
  "get",
  200
>;

export type UpdateStorageConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/storage"],
  "patch"
>;

// Config — Pooler
export type GetPoolerConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/database/pooler"],
  "get",
  200
>;

export type UpdatePoolerConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/database/pooler"],
  "patch"
>;

export type UpdatePoolerConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/database/pooler"],
  "patch",
  200
>;

// Config — Realtime
export type GetRealtimeConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/realtime"],
  "get",
  200
>;

export type UpdateRealtimeConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/realtime"],
  "patch"
>;

// Config — Auth: Signing Keys
export type GetLegacySigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys/legacy"],
  "get",
  200
>;

export type CreateLegacySigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys/legacy"],
  "post",
  201
>;

export type ListSigningKeysResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys"],
  "get",
  200
>;

export type CreateSigningKeyRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth/signing-keys"],
  "post"
>;

export type CreateSigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys"],
  "post",
  201
>;

export type GetSigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys/{id}"],
  "get",
  200
>;

export type RemoveSigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys/{id}"],
  "delete",
  200
>;

export type UpdateSigningKeyRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth/signing-keys/{id}"],
  "patch"
>;

export type UpdateSigningKeyResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/signing-keys/{id}"],
  "patch",
  200
>;

// Config — Auth: Third-Party Auth (TPA)
export type ListThirdPartyAuthResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/third-party-auth"],
  "get",
  200
>;

export type CreateThirdPartyAuthRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/config/auth/third-party-auth"],
  "post"
>;

export type CreateThirdPartyAuthResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/third-party-auth"],
  "post",
  201
>;

export type GetThirdPartyAuthResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}"],
  "get",
  200
>;

export type DeleteThirdPartyAuthResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/config/auth/third-party-auth/{tpa_id}"],
  "delete",
  200
>;

// Networking
export type GetEnrichedNetworkBansResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/network-bans/retrieve/enriched"],
  "post",
  201
>;

export type PatchNetworkRestrictionsRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/network-restrictions"],
  "patch"
>;

export type PatchNetworkRestrictionsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/network-restrictions"],
  "patch",
  200
>;

// Read Replicas
export type SetUpReadReplicaRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/read-replicas/setup"],
  "post"
>;

export type RemoveReadReplicaRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/read-replicas/remove"],
  "post"
>;

// Billing & Addons
export type ListProjectAddonsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/billing/addons"],
  "get",
  200
>;

export type ApplyProjectAddonRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/billing/addons"],
  "patch"
>;

export type RemoveProjectAddonPathParams =
  paths["/v1/projects/{ref}/billing/addons/{addon_variant}"]["delete"]["parameters"]["path"];

// Storage
export type ListStorageBucketsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/storage/buckets"],
  "get",
  200
>;

// Analytics
export type GetProjectLogsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/analytics/endpoints/logs.all"],
  "get"
>;

export type GetProjectLogsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/analytics/endpoints/logs.all"],
  "get",
  200
>;

export type GetUsageApiCountsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/analytics/endpoints/usage.api-counts"],
  "get"
>;

export type GetUsageApiCountsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/analytics/endpoints/usage.api-counts"],
  "get",
  200
>;

export type GetUsageApiRequestsCountResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/analytics/endpoints/usage.api-requests-count"],
  "get",
  200
>;

export type GetFunctionCombinedStatsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/analytics/endpoints/functions.combined-stats"],
  "get"
>;

export type GetFunctionCombinedStatsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/analytics/endpoints/functions.combined-stats"],
  "get",
  200
>;

// Advisors
export type GetPerformanceAdvisorsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/advisors/performance"],
  "get",
  200
>;

export type GetSecurityAdvisorsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/advisors/security"],
  "get"
>;

export type GetSecurityAdvisorsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/advisors/security"],
  "get",
  200
>;

// Actions
export type ListActionRunsQuery = ExtractRequestQuery<
  paths["/v1/projects/{ref}/actions"],
  "get"
>;

export type ListActionRunsResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/actions"],
  "get",
  200
>;

export type GetActionRunResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/actions/{run_id}"],
  "get",
  200
>;

export type UpdateActionRunStatusRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/actions/{run_id}/status"],
  "patch"
>;

export type UpdateActionRunStatusResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/actions/{run_id}/status"],
  "patch",
  200
>;

// JIT Access (project-level)
export type GetJitAccessConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/jit-access"],
  "get",
  200
>;

export type UpdateJitAccessConfigRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/jit-access"],
  "put"
>;

export type UpdateJitAccessConfigResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/jit-access"],
  "put",
  200
>;

// CLI
export type CreateCliLoginRoleRequestBody = ExtractRequestBody<
  paths["/v1/projects/{ref}/cli/login-role"],
  "post"
>;

export type CreateCliLoginRoleResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/cli/login-role"],
  "post",
  201
>;

export type DeleteCliLoginRolesResponseData = ExtractResponseContent<
  paths["/v1/projects/{ref}/cli/login-role"],
  "delete",
  200
>;

// Organizations (by slug)
export type GetOrganizationBySlugResponseData = ExtractResponseContent<
  paths["/v1/organizations/{slug}"],
  "get",
  200
>;

export type ListOrganizationMembersResponseData = ExtractResponseContent<
  paths["/v1/organizations/{slug}/members"],
  "get",
  200
>;

export type GetOrganizationProjectsQuery = ExtractRequestQuery<
  paths["/v1/organizations/{slug}/projects"],
  "get"
>;

export type GetOrganizationProjectsResponseData = ExtractResponseContent<
  paths["/v1/organizations/{slug}/projects"],
  "get",
  200
>;

export type GetOrganizationProjectClaimResponseData = ExtractResponseContent<
  paths["/v1/organizations/{slug}/project-claim/{token}"],
  "get",
  200
>;
