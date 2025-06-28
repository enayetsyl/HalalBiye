"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AppError
 *
 * A custom Error subclass that includes an HTTP status code.
 * Use this to throw application-specific errors in your controllers or services,
 * ensuring you can distinguish between different error types and status codes.
 *
 * @example
 *   // In an Express route handler:
 *   if (!user) {
 *     throw new AppError(404, 'User not found');
 *   }
 *
 * @extends Error
 */
class AppError extends Error {
    /**
     * Constructs a new AppError.
     *
     * @param statusCode - The HTTP status code (e.g., 400, 401, 404, 500).
     * @param message - A human-readable description of the error.
     * @param stack - Optional stack trace override. If provided, this replaces the default.
     */
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            // Use the provided stack trace (useful when re-throwing errors)
            this.stack = stack;
        }
        else {
            // Capture the stack trace at the point where this error was instantiated,
            // omitting this constructor from the trace.
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
