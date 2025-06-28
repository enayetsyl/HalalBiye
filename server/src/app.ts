/**
 * @file Sets up and configures the Express application for the HalalBiye server.
 *       - Parses JSON payloads
 *       - Parses cookies
 *       - Enables CORS for allowed origins
 *       - Mounts API routes under `/api/v1`
 *       - Defines a health-check root endpoint
 *       - Registers global error handling and 404 middleware
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();

////////////////////////////////////////////////////////////////////////////////
// Middleware Configuration
////////////////////////////////////////////////////////////////////////////////

/**
 * Parse incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Parse Cookie header and populate req.cookies.
 */
app.use(cookieParser());

/**
 * Enable CORS for specified frontend origins and allow credentials (cookies).
 */
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://halal-biye.vercel.app',
    ],
    credentials: true,
  })
);

////////////////////////////////////////////////////////////////////////////////
// Route Definitions
////////////////////////////////////////////////////////////////////////////////

/**
 * Mount all application routes under the `/api/v1` prefix.
 */
app.use('/api/v1', router);

/**
 * Health-check endpoint.
 *
 * @route GET /
 * @returns A simple greeting to confirm the server is running.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Halal Biye Server');
});

////////////////////////////////////////////////////////////////////////////////
// Error Handling
////////////////////////////////////////////////////////////////////////////////

/**
 * Global error handler middleware.
 * Catches errors thrown from any route and formats the response.
 */
app.use(globalErrorHandler);

/**
 * 404 Not Found middleware.
 * Handles requests to undefined routes.
 */
app.use(notFound);

export default app;
