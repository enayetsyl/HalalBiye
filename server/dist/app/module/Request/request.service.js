"use strict";
/**
 * RequestService
 *
 * Provides methods to manage connection requests between users:
 * - sending requests
 * - fetching incoming/outgoing requests
 * - accepting or declining pending requests
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
exports.RequestService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../User/user.model"));
const request_model_1 = require("./request.model");
/**
 * Sends a connection request from one user to another.
 *
 * @param fromUserEmail - Email of the user initiating the request.
 * @param toUserId - MongoDB ObjectId (as string) of the user to receive the request.
 * @returns The newly created request document.
 * @throws {AppError} 404 if requesting user not found.
 * @throws {AppError} 400 if attempting to send a request to oneself.
 * @throws {AppError} 409 if a request between these users already exists.
 */
const sendConnectionRequest = (fromUserEmail, toUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const fromUser = yield user_model_1.default.findOne({ email: fromUserEmail });
    if (!fromUser)
        throw new AppError_1.default(404, "Requesting user not found");
    const fromUserId = String(fromUser._id);
    if (fromUserId === toUserId)
        throw new AppError_1.default(400, "Cannot send request to yourself");
    const existing = yield request_model_1.Request.findOne({ fromUser: fromUserId, toUser: toUserId });
    if (existing)
        throw new AppError_1.default(409, "Request already exists");
    const newRequest = yield request_model_1.Request.create({ fromUser: fromUserId, toUser: toUserId });
    return newRequest;
});
/**
 * Retrieves all pending or processed requests sent *to* the given user.
 *
 * @param userEmail - Email of the user whose incoming requests will be fetched.
 * @returns A Mongoose query that resolves to an array of requests populated with sender details.
 * @throws {AppError} 404 if the specified user is not found.
 */
const getIncomingRequests = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    return request_model_1.Request
        .find({ toUser: user._id })
        .populate('fromUser', 'name email age gender religion location height education occupation');
});
/**
 * Retrieves all pending or processed requests *sent by* the given user.
 *
 * @param userEmail - Email of the user whose outgoing requests will be fetched.
 * @returns A Mongoose query that resolves to an array of requests populated with recipient details.
 * @throws {AppError} 404 if the specified user is not found.
 */
const getOutgoingRequests = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    return request_model_1.Request
        .find({ fromUser: user._id })
        .populate('toUser', 'name email age gender religion location height education occupation');
});
/**
 * Accepts a pending connection request on behalf of the recipient.
 *
 * @param requestId - MongoDB ObjectId (as string) of the request to accept.
 * @param userEmail - Email of the user performing the acceptance (must match request.toUser).
 * @returns The updated request document with status set to 'accepted'.
 * @throws {AppError} 404 if the user or request is not found.
 * @throws {AppError} 403 if the user is not authorized to accept this request.
 * @throws {AppError} 400 if the request status is not 'pending'.
 */
const acceptRequest = (requestId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    const userId = String(user._id);
    const reqDoc = yield request_model_1.Request.findById(requestId);
    if (!reqDoc)
        throw new AppError_1.default(404, 'Request not found');
    if (String(reqDoc.toUser) !== userId)
        throw new AppError_1.default(403, 'Not authorized');
    if (reqDoc.status !== 'pending')
        throw new AppError_1.default(400, 'Request is not pending');
    reqDoc.status = 'accepted';
    yield reqDoc.save();
    return reqDoc;
});
/**
 * Declines a pending connection request on behalf of the recipient.
 *
 * @param requestId - MongoDB ObjectId (as string) of the request to decline.
 * @param userEmail - Email of the user performing the decline (must match request.toUser).
 * @returns The updated request document with status set to 'rejected'.
 * @throws {AppError} 404 if the user or request is not found.
 * @throws {AppError} 403 if the user is not authorized to decline this request.
 * @throws {AppError} 400 if the request status is not 'pending'.
 */
const declineRequest = (requestId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    const userId = String(user._id);
    const reqDoc = yield request_model_1.Request.findById(requestId);
    if (!reqDoc)
        throw new AppError_1.default(404, 'Request not found');
    if (String(reqDoc.toUser) !== userId)
        throw new AppError_1.default(403, 'Not authorized');
    if (reqDoc.status !== 'pending')
        throw new AppError_1.default(400, 'Request is not pending');
    reqDoc.status = 'rejected';
    yield reqDoc.save();
    return reqDoc;
});
exports.RequestService = {
    sendConnectionRequest,
    getIncomingRequests,
    getOutgoingRequests,
    acceptRequest,
    declineRequest
};
