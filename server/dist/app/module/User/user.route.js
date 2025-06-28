"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const router = express_1.default.Router();
/**
 * @module UserRoutes
 * @description
 * Defines all `/api/v1/users` endpoints for user registration, authentication,
 * profile retrieval, browsing, and updates. Applies request validation and
 * authentication middleware as needed.
 */
/**
 * Register a new user.
 *
 * @name POST /register
 * @access Public
 * @middleware validateRequest(UserValidation.registerSchema)
 *
 * @param {Request} req  - Express request object, expects `body` matching registerSchema
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.registerSchema), user_controller_1.UserControllers.registerUser);
/**
 * Authenticate a user and issue a session cookie.
 *
 * @name POST /login
 * @access Public
 * @middleware validateRequest(UserValidation.loginSchema)
 *
 * @param {Request} req  - Express request object, expects `body` matching loginSchema
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginSchema), user_controller_1.UserControllers.loginUser);
/**
 * Log the user out by clearing their authentication cookie.
 *
 * @name POST /logout
 * @access Private
 * @middleware authMiddleware
 *
 * @param {Request} req  - Authenticated Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.post('/logout', authMiddleware_1.default, user_controller_1.UserControllers.logoutUser);
/**
 * Retrieve the currently authenticated user's basic info (email).
 *
 * @name GET /me
 * @access Private
 * @middleware authMiddleware
 *
 * @param {Request} req  - Authenticated Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.get('/me', authMiddleware_1.default, user_controller_1.UserControllers.getCurrentUser);
/**
 * Browse other users’ profiles, with optional query filters (e.g., gender, location).
 *
 * @name GET /
 * @access Private
 * @middleware authMiddleware
 *
 * @param {Request} req  - Authenticated Express request object, may include query parameters
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.get('/', authMiddleware_1.default, user_controller_1.UserControllers.getUsers);
/**
 * Update the profile fields of the currently authenticated user.
 *
 * @name PUT /me
 * @access Private
 * @middleware authMiddleware
 * @middleware validateRequest(UserValidation.updateUserSchema)
 *
 * @param {Request} req  - Authenticated Express request object, expects `body` matching updateUserSchema
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
router.put('/me', authMiddleware_1.default, (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserSchema), user_controller_1.UserControllers.updateCurrentUser);
/**
 * @exports UserRoutes
 * @type {import('express').Router}
 */
exports.UserRoutes = router;
