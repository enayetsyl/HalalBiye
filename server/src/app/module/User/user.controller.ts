import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';


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

export const UserControllers = {
  registerUser,
};
