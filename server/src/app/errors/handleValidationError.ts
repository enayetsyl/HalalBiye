import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../type';

/**
 * Transforms a Mongoose ValidationError into a standardized error response.
 *
 * @param err - The ValidationError thrown by Mongoose when document validation fails.
 * @returns An object conforming to TGenericErrorResponse, containing:
 *   - statusCode: HTTP status code (400 Bad Request)
 *   - message: A general “Validation Error” label
 *   - errorSources: An array of { path, message } pairs for each field that failed validation
 */
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  // Extract each validation error from the Mongoose error object
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        // The document path (field name) where validation failed
        path: val.path,
        // The human-readable validation error message
        message: val.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
