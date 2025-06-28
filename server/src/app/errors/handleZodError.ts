import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../type';

/**
 * Transforms a ZodError thrown during schema validation into
 * a standardized generic error response that can be returned
 * by your API.
 *
 * @param err - The ZodError containing one or more validation issues.
 * @returns A TGenericErrorResponse with:
 *   - statusCode: HTTP status code for a validation error (400).
 *   - message: A human-readable error summary.
 *   - errorSources: An array of individual field errors, each with:
 *       • path: The name of the invalid field.
 *       • message: The validation failure message.
 */
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  // Convert each ZodIssue into our internal TErrorSource format
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      // Use the last segment of the issue.path as the field name
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400; // Bad Request

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
