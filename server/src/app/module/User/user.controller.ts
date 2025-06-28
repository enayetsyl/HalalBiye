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

export const UserControllers = {
  registerUser,loginUser,
};
