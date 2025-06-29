"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Transforms a Mongoose CastError into a standardized error response.
 *
 * When Mongoose fails to cast a value (for example, an invalid ObjectId),
 * this handler captures the error details and returns a generic response
 * with HTTP status 400 (Bad Request), a user-friendly message, and
 * a list of error sources for client-side display or logging.
 *
 * @param err - The CastError instance thrown by Mongoose when casting fails
 * @returns A TGenericErrorResponse containing:
 *   - statusCode: 400
 *   - message: 'Invalid ID'
 *   - errorSources: array with { path, message } from the original error
 */
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};
exports.default = handleCastError;
