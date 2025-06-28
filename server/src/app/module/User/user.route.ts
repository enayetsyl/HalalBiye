/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Request, Response, NextFunction } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

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
router.post(
  '/register',
  validateRequest(UserValidation.registerSchema),
  UserControllers.registerUser,
);

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
router.post(
  '/login',
  validateRequest(UserValidation.loginSchema),
  UserControllers.loginUser,
);

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
router.post(
  '/logout',
  authMiddleware,
  UserControllers.logoutUser,
);

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
router.get(
  '/me',
  authMiddleware,
  UserControllers.getCurrentUser,
);

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
router.get(
  '/',
  authMiddleware,
  UserControllers.getUsers,
);

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
router.put(
  '/me',
  authMiddleware,
  validateRequest(UserValidation.updateUserSchema),
  UserControllers.updateCurrentUser,
);

/**
 * @exports UserRoutes
 * @type {import('express').Router}
 */
export const UserRoutes = router;
