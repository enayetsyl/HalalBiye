import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import { TErrorSources } from '../type';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

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
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.statusCode);

  // Default error response values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Handle Zod schema validation errors
  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;

  // Handle Mongoose schema validation errors
  } else if (err?.name === 'ValidationError') {
    const simplified = handleValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;

  // Handle Mongoose cast errors (e.g., invalid ObjectId)
  } else if (err?.name === 'CastError') {
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;

  // Handle Mongoose duplicate key errors (code 11000)
  } else if (err?.code === 11000) {
    const simplified = handleDuplicateError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;

  // Handle custom AppError instances
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: '', message: err.message }];

  // Handle any other generic Error
  } else if (err instanceof Error) {
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
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
