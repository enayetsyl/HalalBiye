/**
 * @file handleDuplicateError.ts
 * @description
 * Utility to convert a MongoDB duplicate key error into a standardized
 * generic error response (`TGenericErrorResponse`), extracting the offending
 * field or value and returning a 400 Bad Request with details.
 */

import { TErrorSources, TGenericErrorResponse } from "../type";

/**
 * Handle a MongoDB duplicate-key error by extracting the duplicate value
 * from the error message and returning a well-formed API error response.
 *
 * @param err - The raw error thrown by Mongoose/MongoDB when a unique constraint is violated.
 * @returns A `TGenericErrorResponse` containing:
 *   - `statusCode`: HTTP status code (400).
 *   - `message`: A high-level error message.
 *   - `errorSources`: An array with a single entry indicating which value already exists.
 */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Attempt to extract the duplicated value (text within quotes) from the error message
  const match = err.message.match(/"([^"]*)"/);
  const extractedValue = match?.[1] ?? "";

  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedValue} already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleDuplicateError;
