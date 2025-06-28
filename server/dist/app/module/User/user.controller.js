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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const tokenGenerator_1 = require("../../utils/tokenGenerator");
const config_1 = __importDefault(require("../../../config"));
// Controller for registering a new user
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure email, password and any other profile fields
    const _a = req.body, { email, password } = _a, profileData = __rest(_a, ["email", "password"]);
    // Call the service layer to handle registration logic
    const result = yield user_service_1.UserServices.registerUser(email, password, profileData);
    // Send a clean, consistent response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_service_1.UserServices.loginUser(email, password);
    // generate JWT
    const token = (0, tokenGenerator_1.createToken)({ userId: email.toString(), role: 'user' }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    // set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Number(config_1.default.jwt_cookie_expires_ms),
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: user,
    });
}));
/**
 * @desc    Return the authenticated user’s profile (by email from req.user)
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getCurrentUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.user was set to the email in your authMiddleware
    const email = req.user;
    const result = yield user_service_1.UserServices.getUserByEmail(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile fetched successfully',
        data: result,
    });
}));
/**
 * @desc    Get a list of users matching optional filters
 * @route   GET /api/v1/users
 * @access  Private
 */
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Cast query params into a filter object
    const filters = req.query;
    const result = yield user_service_1.UserServices.getUsers(filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result,
    });
}));
const updateCurrentUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req.user contains the authenticated email
    const email = req.user;
    const updateData = req.body;
    const updatedUser = yield user_service_1.UserServices.updateUserProfile(email, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
    });
}));
exports.UserControllers = {
    registerUser,
    loginUser,
    getCurrentUser,
    getUsers,
    updateCurrentUser,
};
