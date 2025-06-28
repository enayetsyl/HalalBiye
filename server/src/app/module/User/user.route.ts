/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response, NextFunction } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

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
export const UserRoutes = router;
