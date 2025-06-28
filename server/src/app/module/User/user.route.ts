/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  validateRequest(UserValidation.registerSchema),
  UserControllers.registerUser,
);

/**
 * @route   POST /login
 * @desc    Authenticate a user
 * @access  Public
 */
router.post(
  '/login',
  validateRequest(UserValidation.loginSchema),
  UserControllers.loginUser,
);

/**
 * @route   GET /me
 * @desc    Log and return the authenticated user’s email
 * @access  Private
 */
router.get(
  '/me',
  authMiddleware,
  UserControllers.getCurrentUser
);

/**
 * @route   GET /api/v1/users
 * @desc    Browse other users’ profiles, supports query filters
 * @access  Private
 */
router.get(
  '/',
  authMiddleware,
  UserControllers.getUsers
);

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update authenticated user’s profile
 * @access  Private
 */
router.put(
  '/me',
  authMiddleware,
  validateRequest(UserValidation.updateUserSchema),
  UserControllers.updateCurrentUser
);

export const UserRoutes = router;
