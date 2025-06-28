import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { createToken } from '../../utils/tokenGenerator';
import config from '../../../config';
import type { StringValue } from 'ms';

// Controller for registering a new user
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

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;


  const user = await UserServices.loginUser(email, password);

  // generate JWT
  const token = createToken(
    { userId: email.toString(), role: 'user' },
    config.jwt_secret as string,
    config.jwt_expires_in
  );

  // set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(config.jwt_cookie_expires_ms) ,
  });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: user,
  });
});


/**
 * @desc    Return the authenticated user’s profile (by email from req.user)
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getCurrentUser = catchAsync(async (req, res) => {
  // req.user was set to the email in your authMiddleware
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
 * @desc    Get a list of users matching optional filters
 * @route   GET /api/v1/users
 * @access  Private
 */
const getUsers = catchAsync(async (req, res) => {
  // Collect filters except for the current user
  const filters = { ...req.query } as Record<string, any>;

  // Exclude current user's email from results
  if (req.user) {
    filters.email = { $ne: req.user };
  }

  const result = await UserServices.getUsers(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const updateCurrentUser = catchAsync(async (req, res) => {
  // req.user contains the authenticated email
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
};


