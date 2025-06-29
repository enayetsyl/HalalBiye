"use strict";
/**
 * @module RequestRoutes
 * @description
 * Defines all `/api/v1/requests` endpoints for managing connection requests between users.
 * Each route is protected by authentication middleware and, where applicable,
 * request payloads are validated against JSON schemas.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRoutes = void 0;
const express_1 = require("express");
const RequestController = __importStar(require("../Request/request.controller"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const request_validation_1 = require("../Request/request.validation");
const router = (0, express_1.Router)();
/**
 * Send a new connection request.
 *
 * @route POST /
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against sendRequestSchema
 * @controller RequestController.sendRequest
 *
 * @example
 * POST /api/v1/requests
 * {
 *   "toUser": "60d0fe4f5311236168a109ca"
 * }
 */
router.post('/', authMiddleware_1.default, (0, validateRequest_1.default)(request_validation_1.sendRequestSchema), RequestController.sendRequest);
/**
 * Retrieve all incoming connection requests for the authenticated user.
 *
 * @route GET /incoming
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @controller RequestController.getIncomingRequests
 */
router.get('/incoming', authMiddleware_1.default, RequestController.getIncomingRequests);
/**
 * Retrieve all outgoing connection requests sent by the authenticated user.
 *
 * @route GET /outgoing
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @controller RequestController.getOutgoingRequests
 */
router.get('/outgoing', authMiddleware_1.default, RequestController.getOutgoingRequests);
/**
 * Accept a pending connection request.
 *
 * @route POST /accept
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against requestIdParamSchema
 * @controller RequestController.acceptRequest
 *
 * @example
 * POST /api/v1/requests/accept
 * {
 *   "id": "60d0fe4f5311236168a109cb"
 * }
 */
router.post('/accept', authMiddleware_1.default, (0, validateRequest_1.default)(request_validation_1.requestIdParamSchema), RequestController.acceptRequest);
/**
 * Decline a pending connection request.
 *
 * @route POST /decline
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against requestIdParamSchema
 * @controller RequestController.declineRequest
 *
 * @example
 * POST /api/v1/requests/decline
 * {
 *   "id": "60d0fe4f5311236168a109cc"
 * }
 */
router.post('/decline', authMiddleware_1.default, (0, validateRequest_1.default)(request_validation_1.requestIdParamSchema), RequestController.declineRequest);
exports.RequestRoutes = router;
