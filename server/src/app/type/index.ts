/**
 * Pagination metadata returned alongside list data.
 */
export type TMeta = {
  /** Number of items per page */
  limit: number;
  /** Current page number (1-indexed) */
  page: number;
  /** Total number of items across all pages */
  total: number;
  /** Total number of pages available */
  totalPage: number;
};

/**
 * Standard API response envelope.
 *
 * @template T  Type of the `data` payload.
 */
export type TResponse<T> = {
  /** HTTP status code of the response */
  statusCode: number;
  /** Indicates if the request was successful */
  success: boolean;
  /** Optional human-readable message (e.g. error or informational) */
  message?: string;
  /** Optional pagination metadata (for list endpoints) */
  meta?: TMeta;
  /** The actual response payload */
  data: T;
};

/**
 * Describes individual error details for validation or processing failures.
 */
export type TErrorSources = {
  /** Path or index identifying the field/item with the error */
  path: string | number;
  /** Error message describing what went wrong */
  message: string;
}[];

/**
 * Shape of a generic error response from the API.
 */
export type TGenericErrorResponse = {
  /** HTTP status code of the error response */
  statusCode: number;
  /** Human-readable error message */
  message: string;
  /** Detailed list of error sources */
  errorSources: TErrorSources;
};

/**
 * Allowed values for a user's gender.
 */
export type Gender = 'Male' | 'Female' | 'Other';

/**
 * Payload for creating or updating a user profile.
 * All fields are optional to allow partial updates.
 */
export type TProfileData = {
  /** User's full name */
  name?: string;
  /** User's age in years */
  age?: number;
  /** User's gender */
  gender?: Gender;
  /** User's religious affiliation */
  religion?: string;
  /** User's location (e.g. city or region) */
  location?: string;
  /** User's height in centimeters */
  height?: number;
  /** User's highest level of education */
  education?: string;
  /** User's current occupation or job title */
  occupation?: string;
};
