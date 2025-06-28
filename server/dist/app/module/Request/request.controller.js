"use strict";
/**
 * @module RequestController
 *
 * Controller functions for handling connection request routes.
 * Uses catchAsync to wrap async handlers and sendResponse to format HTTP responses.
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
exports.declineRequest = exports.acceptRequest = exports.getOutgoingRequests = exports.getIncomingRequests = exports.sendRequest = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const request_service_1 = require("./request.service");
/**
 * Send a new connection request from the authenticated user to another user.
 *
 * @async
 * @function sendRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user (populated by auth middleware).
 * @param {{ toUser: string }} req.body - Request payload containing the recipient user’s ID or email.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 201 response with the created request data.
 */
exports.sendRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fromUserEmail = req.user; // now just email
    const { toUser } = req.body;
    const request = yield request_service_1.RequestService.sendConnectionRequest(fromUserEmail, toUser);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Request sent successfully',
        data: request,
    });
}));
/**
 * Fetch all incoming connection requests for the authenticated user.
 *
 * @async
 * @function getIncomingRequests
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with an array of incoming requests.
 */
exports.getIncomingRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user; // just email
    const requests = yield request_service_1.RequestService.getIncomingRequests(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Incoming requests fetched',
        data: requests,
    });
}));
/**
 * Fetch all outgoing connection requests sent by the authenticated user.
 *
 * @async
 * @function getOutgoingRequests
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with an array of outgoing requests.
 */
exports.getOutgoingRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user;
    const requests = yield request_service_1.RequestService.getOutgoingRequests(userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Outgoing requests fetched',
        data: requests,
    });
}));
/**
 * Accept an incoming connection request for the authenticated user.
 *
 * @async
 * @function acceptRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {{ id: string }} req.body - Request payload containing the ID of the request to accept.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with the updated request status.
 */
exports.acceptRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user;
    const { id } = req.body;
    console.log("Request params:", req.body);
    const updated = yield request_service_1.RequestService.acceptRequest(id, userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Request accepted',
        data: updated,
    });
}));
/**
 * Decline an incoming connection request for the authenticated user.
 *
 * @async
 * @function declineRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {{ id: string }} req.body - Request payload containing the ID of the request to decline.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with the updated request status.
 */
exports.declineRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user;
    const { id } = req.body;
    console.log("Request params:", req.body);
    const updated = yield request_service_1.RequestService.declineRequest(id, userEmail);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Request declined',
        data: updated,
    });
}));
