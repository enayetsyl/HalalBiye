"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdParamSchema = exports.sendRequestSchema = void 0;
const zod_1 = require("zod");
/**
 * @module validation/schemas/requests
 *
 * Zod schemas for validating request-related payloads in the API.
 */
/**
 * Schema for validating the payload when sending a new connection request.
 *
 * @typedef {object} SendRequestBody
 * @property {string} toUser - The ID of the user to whom the connection request is being sent. Must be a non-empty string.
 *
 * @example
 * // Valid payload
 * {
 *   body: {
 *     toUser: "60f7a1c8e13b3b0015d8f123"
 *   }
 * }
 */
exports.sendRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        toUser: zod_1.z
            .string()
            .min(1, 'Target user is required'),
    }),
});
/**
 * Schema for validating the payload when responding to an existing request.
 *
 * @typedef {object} RequestIdParamBody
 * @property {string} id - The ID of the existing connection request to accept or decline. Must be a non-empty string.
 *
 * @example
 * // Valid payload
 * {
 *   body: {
 *     id: "60f7a1c8e13b3b0015d8f124"
 *   }
 * }
 */
exports.requestIdParamSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string()
            .min(1, 'Request ID is required'),
    }),
});
