"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
/**
 * Global error-handling middleware for Express.
 *
 * Catches all errors thrown in the application, classifies them,
 * and sends a consistent JSON response with status code, message,
 * and detailed error sources. In development mode, includes the stack trace.
 *
 * Supported error types:
 * - Zod validation errors
 * - Mongoose validation, cast, and duplicate key errors
 * - Custom AppError instances
 * - Generic JavaScript Error objects
 *
 * @type {ErrorRequestHandler}
 * @param {unknown & { statusCode?: number; name?: string; code?: number }} err
 *   The error object thrown or passed to next().
 *   May include custom properties like statusCode (for AppError),
 *   name ('ValidationError', 'CastError'), or code (e.g., 11000 for duplicates).
 * @param {import('express').Request} req
 *   The Express request object.
 * @param {import('express').Response} res
 *   The Express response object, used to send the JSON error response.
 * @param {import('express').NextFunction} next
 *   The next middleware function in the stack (unused here).
 */
const globalErrorHandler = (err, req, res, next) => {
    console.log(err.statusCode);
    // Default error response values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    // Handle Zod schema validation errors
    if (err instanceof zod_1.ZodError) {
        const simplified = (0, handleZodError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
        // Handle Mongoose schema validation errors
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplified = (0, handleValidationError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
        // Handle Mongoose cast errors (e.g., invalid ObjectId)
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplified = (0, handleCastError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
        // Handle Mongoose duplicate key errors (code 11000)
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplified = (0, handleDuplicateError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorSources = simplified.errorSources;
        // Handle custom AppError instances
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [{ path: '', message: err.message }];
        // Handle any other generic Error
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [{ path: '', message: err.message }];
    }
    // Send structured JSON response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        // Include stack trace only in development
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
