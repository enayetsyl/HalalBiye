"use strict";
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
const getIncomingRequests = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    return request_model_1.Request.find({ toUser: user._id }).populate('fromUser', 'name email age gender religion location height education occupation');
});
const getOutgoingRequests = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user)
        throw new AppError_1.default(404, "User not found");
    return request_model_1.Request.find({ fromUser: user._id }).populate('toUser', 'name email age gender religion location height education occupation');
});
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
