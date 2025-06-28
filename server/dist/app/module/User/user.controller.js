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
/**
 * @module UserControllers
 */
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */
/**
 * @desc    Register a new user with email, password, and profile data.
 * @route   POST /api/v1/users/register
 * @access  Public
 *
 * @param {Request} req - Express request object, expecting `req.body.email`, `req.body.password`, and other profile fields.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
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
/**
 * @desc    Authenticate user and set JWT cookie.
 * @route   POST /api/v1/users/login
 * @access  Public
 *
 * @param {Request} req - Express request object, expecting `req.body.email` and `req.body.password`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate credentials via service layer
    const user = yield user_service_1.UserServices.loginUser(email, password);
    // Generate JWT token
    const token = (0, tokenGenerator_1.createToken)({ userId: email.toString(), role: 'user' }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    // Set HTTP-only auth cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: Number(config_1.default.jwt_cookie_expires_ms),
    });
    console.log('backend token and data', Object.assign(Object.assign({}, user), { token }));
    // Send response with user data
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: Object.assign(Object.assign({}, user), { token }),
    });
}));
/**
 * @desc    Log out the current user by clearing the auth cookie.
 * @route   POST /api/v1/users/logout
 * @access  Private
 *
 * @param {Request} req - Express request object (authenticated).
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear the token cookie to log out
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged out successfully',
        data: {}
    });
}));
/**
 * @desc    Fetch the profile of the authenticated user.
 * @route   GET /api/v1/users/me
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.user` set to the authenticated email by middleware.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getCurrentUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract authenticated email
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
 * @desc    Get a list of users matching optional query filters, excluding the current user.
 * @route   GET /api/v1/users
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.query` containing filter params and `req.user` set to email.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Copy query filters
    const filters = Object.assign({}, req.query);
    // Exclude current user by email
    if (req.user) {
        filters.email = { $ne: req.user };
    }
    const result = yield user_service_1.UserServices.getUsers(filters, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result,
    });
}));
/**
 * @desc    Update the profile of the authenticated user.
 * @route   PUT /api/v1/users/me
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.user` and `req.body` containing update fields.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const updateCurrentUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract authenticated email and update data
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
    logoutUser,
};
