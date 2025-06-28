/**
 * @fileoverview Middleware to handle unmatched API routes (404 Not Found).
 *
 * Sends a standardized JSON response when no matching route is found.
 */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

/**
 * notFound
 *
 * Express middleware that catches all requests for which no route handler was matched,
 * and responds with a 404 status code and a JSON error message.
 *
 * @param {Request} req   - Express Request object
 * @param {Response} res  - Express Response object
 * @param {NextFunction} next - Express next middleware function (unused)
 *
 * @returns {void} Sends a JSON response with:
 *   - success: false
 *   - message: 'API Not Found !!'
 *   - error: '' (empty string for consistency)
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
