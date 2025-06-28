/**
 * Describes a single field-level error returned by the API.
 *
 * @property path - The name of the field (or JSON path) that caused the error.
 * @property message - A human-readable description of what went wrong for this field.
 */
export type ApiErrorSource = {
  path: string;
  message: string;
};

/**
 * The shape of an error response returned from the backend.
 *
 * @property success - Always `false` for error responses.
 * @property message - A summary of the error, suitable for display.
 * @property errorSources - An array of detailed, field-level errors.
 * @property err - (Optional) The raw error object sent by the server.
 * @property stack - (Optional) A stack trace string for debugging purposes.
 */
export type ApiErrorResponse = {
  success: false;
  message: string;
  errorSources: ApiErrorSource[];
  err?: unknown;
  stack?: string | null;
};

/**
 * A normalized error type used by client-side code for handling and displaying errors.
 *
 * @property message - The primary error message to show the user.
 * @property status - The HTTP status code associated with the error.
 * @property errorSources - (Optional) A list of field-specific errors for form validation, etc.
 */
export type ApiError = {
  message: string;
  status: number;
  errorSources?: { path: string; message: string }[];
};
