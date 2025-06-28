"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A higher-order function to wrap asynchronous Express route handlers
 * and forward any errors to the next middleware (error handler).
 *
 * @param fn - An Express request handler function that may return a promise.
 * @returns A new request handler that calls the original handler and
 *          catches any rejected promises, passing errors to next().
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
        // Execute the handler and catch errors to delegate to Express error middleware
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;
