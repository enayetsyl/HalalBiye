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
exports.declineRequest = exports.acceptRequest = exports.getOutgoingRequests = exports.getIncomingRequests = exports.sendRequest = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const request_service_1 = require("./request.service");
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
