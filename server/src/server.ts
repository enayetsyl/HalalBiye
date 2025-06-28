/**
 * @fileoverview
 * Entry point for the server application.
 * Connects to MongoDB, starts the HTTP server, and sets up global error handlers
 * for unhandled promise rejections and uncaught exceptions to ensure graceful shutdown.
 */

import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

/**
 * Connects to the MongoDB database and starts the HTTP server.
 *
 * @async
 * @function main
 * @returns {Promise<void>} Resolves when the server is listening or rejects on error.
 */
async function main(): Promise<void> {
  try {
    // Establish MongoDB connection
    await mongoose.connect(config.database_url as string);

    // Start listening for incoming HTTP requests
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    // Log any errors during startup
    console.error('Error during initialization:', err);
  }
}

// Invoke the main startup function
main();

/**
 * Handle any unhandled promise rejections throughout the app.
 * Logs the error and attempts to close the server gracefully before exiting.
 */
process.on('unhandledRejection', (err) => {
  console.error('😈 unhandledRejection detected, shutting down...', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

/**
 * Handle uncaught exceptions in the Node.js event loop.
 * Logs a message and exits the process immediately to avoid an undefined state.
 */
process.on('uncaughtException', (err) => {
  console.error('😈 uncaughtException detected, shutting down...', err);
  process.exit(1);
});
