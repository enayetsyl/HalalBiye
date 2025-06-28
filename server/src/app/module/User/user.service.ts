
import AppError from '../../errors/AppError';
import { TProfileData } from '../../type';
import { User } from './user.model';


/**
 * Service to register a new user
 * @param email    – user's email
 * @param password – user's password (will get hashed by the model pre-save hook)
 * @param profileData – any additional profile fields
 */
const registerUser = async (
  email: string,
  password: string,
  profileData: TProfileData
) => {
   // 1) Check if a user with this email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // 409 Conflict – email is already taken
    throw new AppError(409, 'Email already registered');
  }

  // 2) If not, create the new user
  const result = await User.create({ email, password, ...profileData });
  return result;
};

const loginUser = async (email: string, password: string) => {
  // 1) fetch user + password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // 2) verify password
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  // 3) return user (password field is stripped by your toJSON/toObject transforms)
  return user;
};

export const UserServices = {
  registerUser,  loginUser,
 
};
