"use strict";
/**
 * @fileoverview
 * Entry point for the server application.
 * Connects to MongoDB, starts the HTTP server, and sets up global error handlers
 * for unhandled promise rejections and uncaught exceptions to ensure graceful shutdown.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
let server;
/**
 * Connects to the MongoDB database and starts the HTTP server.
 *
 * @async
 * @function main
 * @returns {Promise<void>} Resolves when the server is listening or rejects on error.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Establish MongoDB connection
            yield mongoose_1.default.connect(config_1.default.database_url);
            // Start listening for incoming HTTP requests
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`app is listening on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            // Log any errors during startup
            console.error('Error during initialization:', err);
        }
    });
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
    }
    else {
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
