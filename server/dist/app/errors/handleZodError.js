"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const handleZodError = (err) => {
    // Convert each ZodIssue into our internal TErrorSource format
    const errorSources = err.issues.map((issue) => {
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
exports.default = handleZodError;
