/**
 * Thrown by SupabaseManagementAPI methods when the HTTP response status is >= 400.
 */
export class SupabaseManagementAPIError extends Error {
  readonly status: number;
  readonly data: unknown;
  readonly headers: Headers;

  constructor(
    response: { status: number; data: unknown; headers: Headers },
    methodName?: string,
  ) {
    const baseMessage =
      response.data != null &&
      typeof response.data === 'object' &&
      'message' in response.data &&
      typeof (response.data as Record<string, unknown>).message === 'string'
        ? (response.data as { message: string }).message
        : `HTTP ${response.status}`;

    const message = methodName ? `[${methodName}] failed: ${baseMessage}` : baseMessage;

    super(message);
    this.name = 'SupabaseManagementAPIError';
    this.status = response.status;
    this.data = response.data;
    this.headers = response.headers;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
