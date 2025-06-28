import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

/**
 * Creates an Express middleware that validates incoming requests against the provided Zod schema.
 *
 * This middleware will asynchronously parse and validate the `body` and `cookies` of the request.
 * If validation succeeds, it calls `next()` to proceed to the next handler. Any validation errors
 * will be thrown and handled by the centralized error handler (via `catchAsync`).
 *
 * @param schema - A Zod schema object defining the expected shape of `req.body` and `req.cookies`.
 * @returns An Express middleware function that performs schema validation.
 */
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Parse and validate request data against the schema
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    // Proceed if validation passed
    next();
  });
};

export default validateRequest;
