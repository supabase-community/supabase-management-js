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
