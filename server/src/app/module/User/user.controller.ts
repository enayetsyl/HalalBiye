import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { createToken } from '../../utils/tokenGenerator';
import config from '../../../config';
import type { StringValue } from 'ms';

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
const registerUser = catchAsync(async (req, res) => {
  // Destructure email, password and any other profile fields
  const { email, password, ...profileData } = req.body;

  // Call the service layer to handle registration logic
  const result = await UserServices.registerUser(email, password, profileData);

  // Send a clean, consistent response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

/**
 * @desc    Authenticate user and set JWT cookie.
 * @route   POST /api/v1/users/login
 * @access  Public
 *
 * @param {Request} req - Express request object, expecting `req.body.email` and `req.body.password`.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Validate credentials via service layer
  const user = await UserServices.loginUser(email, password);

  // Generate JWT token
  const token = createToken(
    { userId: email.toString(), role: 'user' },
    config.jwt_secret as string,
    config.jwt_expires_in
  );

  // Set HTTP-only auth cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: Number(config.jwt_cookie_expires_ms),
  });

  // Send response with user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: user,
  });
});

/**
 * @desc    Log out the current user by clearing the auth cookie.
 * @route   POST /api/v1/users/logout
 * @access  Private
 *
 * @param {Request} req - Express request object (authenticated).
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const logoutUser = catchAsync(async (req, res) => {
  // Clear the token cookie to log out
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully',
    data: {}
  });
});

/**
 * @desc    Fetch the profile of the authenticated user.
 * @route   GET /api/v1/users/me
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.user` set to the authenticated email by middleware.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getCurrentUser = catchAsync(async (req, res) => {
  // Extract authenticated email
  const email = req.user as string;
  const result = await UserServices.getUserByEmail(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: result,
  });
});

/**
 * @desc    Get a list of users matching optional query filters, excluding the current user.
 * @route   GET /api/v1/users
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.query` containing filter params and `req.user` set to email.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getUsers = catchAsync(async (req, res) => {
  // Copy query filters
  const filters = { ...req.query } as Record<string, any>;

  // Exclude current user by email
  if (req.user) {
    filters.email = { $ne: req.user };
  }

  const result = await UserServices.getUsers(filters, req.user as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

/**
 * @desc    Update the profile of the authenticated user.
 * @route   PUT /api/v1/users/me
 * @access  Private
 *
 * @param {Request} req - Express request object, with `req.user` and `req.body` containing update fields.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const updateCurrentUser = catchAsync(async (req, res) => {
  // Extract authenticated email and update data
  const email = req.user as string;
  const updateData = req.body;

  const updatedUser = await UserServices.updateUserProfile(email, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
  updateCurrentUser,
  logoutUser,
};
