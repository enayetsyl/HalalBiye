"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const router = express_1.default.Router();
/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.registerSchema), user_controller_1.UserControllers.registerUser);
/**
 * @route   POST /login
 * @desc    Authenticate a user
 * @access  Public
 */
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginSchema), user_controller_1.UserControllers.loginUser);
/**
 * @route   POST /logout
 * @desc    Log the user out (clear auth cookie)
 * @access  Private
 */
router.post('/logout', authMiddleware_1.default, user_controller_1.UserControllers.logoutUser);
/**
 * @route   GET /me
 * @desc    Log and return the authenticated user’s email
 * @access  Private
 */
router.get('/me', authMiddleware_1.default, user_controller_1.UserControllers.getCurrentUser);
/**
 * @route   GET /api/v1/users
 * @desc    Browse other users’ profiles, supports query filters
 * @access  Private
 */
router.get('/', authMiddleware_1.default, user_controller_1.UserControllers.getUsers);
/**
 * @route   PUT /api/v1/users/me
 * @desc    Update authenticated user’s profile
 * @access  Private
 */
router.put('/me', authMiddleware_1.default, (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserSchema), user_controller_1.UserControllers.updateCurrentUser);
exports.UserRoutes = router;
