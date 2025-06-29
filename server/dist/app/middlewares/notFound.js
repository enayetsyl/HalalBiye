"use strict";
/**
 * @fileoverview Middleware to handle unmatched API routes (404 Not Found).
 *
 * Sends a standardized JSON response when no matching route is found.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
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
const notFound = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API Not Found !!',
        error: '',
    });
};
exports.default = notFound;
