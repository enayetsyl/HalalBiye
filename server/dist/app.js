"use strict";
/**
 * @file Sets up and configures the Express application for the HalalBiye server.
 *       - Parses JSON payloads
 *       - Parses cookies
 *       - Enables CORS for allowed origins
 *       - Mounts API routes under `/api/v1`
 *       - Defines a health-check root endpoint
 *       - Registers global error handling and 404 middleware
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const app = (0, express_1.default)();
////////////////////////////////////////////////////////////////////////////////
// Middleware Configuration
////////////////////////////////////////////////////////////////////////////////
/**
 * Parse incoming requests with JSON payloads.
 */
app.use(express_1.default.json());
/**
 * Parse Cookie header and populate req.cookies.
 */
app.use((0, cookie_parser_1.default)());
/**
 * Enable CORS for specified frontend origins and allow credentials (cookies).
 */
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://halal-biye.vercel.app',
    ],
    credentials: true,
}));
////////////////////////////////////////////////////////////////////////////////
// Route Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * Mount all application routes under the `/api/v1` prefix.
 */
app.use('/api/v1', routes_1.default);
/**
 * Health-check endpoint.
 *
 * @route GET /
 * @returns A simple greeting to confirm the server is running.
 */
app.get('/', (req, res) => {
    res.send('Hello from Halal Biye Server');
});
////////////////////////////////////////////////////////////////////////////////
// Error Handling
////////////////////////////////////////////////////////////////////////////////
/**
 * Global error handler middleware.
 * Catches errors thrown from any route and formats the response.
 */
app.use(globalErrorhandler_1.default);
/**
 * 404 Not Found middleware.
 * Handles requests to undefined routes.
 */
app.use(notFound_1.default);
exports.default = app;
