import AppError from '../../errors/AppError';
import { TProfileData } from '../../type';
import { IUser, User } from './user.model';
import { UpdateProfileData } from './user.types';
import { Request as ConnectionRequest } from "../Request/request.model";

/**
 * @module UserServices
 * 
 * Collection of user-related service functions:
 * - registerUser
 * - loginUser
 * - getUserByEmail
 * - getUsers
 * - updateUserProfile
 */

/**
 * Register a new user account.
 *
 * @param email - The user's email address (must be unique).
 * @param password - The user's password (will be hashed by the model pre-save hook).
 * @param profileData - Additional profile fields to set (name, age, gender, etc.).
 * @returns The newly created user document.
 * @throws {AppError} 409 if the email is already registered.
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

/**
 * Authenticate a user by email and password.
 *
 * @param email - The user's email address.
 * @param password - The plaintext password to verify.
 * @returns The user document (password field stripped via transform).
 * @throws {AppError} 404 if no user is found with the given email.
 * @throws {AppError} 401 if the provided password is invalid.
 */
const loginUser = async (
  email: string,
  password: string
) => {
  // 1) Fetch user along with hashed password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  // 2) Verify provided password against stored hash
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    throw new AppError(401, 'Invalid email or password');
  }

  // 3) Return user (toJSON/toObject will omit password)
  return user;
};

/**
 * Fetch a single user by email.
 *
 * @param email - The email address of the user to retrieve.
 * @returns The user document without the password.
 * @throws {AppError} 404 if no user is found with the given email.
 */
const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

/**
 * Retrieve a list of users matching given filters, along with
 * their connection status relative to the current user.
 *
 * @param filters - MongoDB query filters to apply (e.g., { gender: 'Female' }).
 * @param currentUserEmail - The email of the authenticated user making the request.
 * @returns Array of user objects extended with a `connectionStatus` field:
 *          'none' | 'pending' | 'accepted' | 'rejected'.
 * @throws {AppError} 404 if the current user cannot be found.
 */
const getUsers = async (
  filters: Record<string, any>,
  currentUserEmail: string
) => {
  // Fetch all users matching filters
  const users = await User.find(filters);

  // Ensure current user exists
  const currentUser = await User.findOne({ email: currentUserEmail });
  if (!currentUser) throw new AppError(404, "Current user not found");

  const currentUserId = String(currentUser._id);
  const userIds = users.map(u => String(u._id));

  // Find any connection requests between current user and listed users
  const requests = await ConnectionRequest.find({
    $or: [
      { fromUser: currentUserId, toUser: { $in: userIds } },
      { fromUser: { $in: userIds }, toUser: currentUserId }
    ]
  });

  // Map each other-user ID to its connection status
  const connectionStatusMap: Record<string, string> = {};
  requests.forEach(req => {
    if (req.status === "accepted") {
      const otherUserId =
        String(req.fromUser) === currentUserId
          ? String(req.toUser)
          : String(req.fromUser);
      connectionStatusMap[otherUserId] = "accepted";
    } else if (String(req.fromUser) === currentUserId) {
      connectionStatusMap[String(req.toUser)] = req.status;
    }
  });

  // Attach `connectionStatus` to each user object
  const usersWithStatus = users.map(user => {
    const status = connectionStatusMap[String(user._id)] || "none";
    return { ...user.toObject(), connectionStatus: status };
  });

  return usersWithStatus;
};

/**
 * Update profile fields for the authenticated user.
 *
 * @param email - The email of the user to update.
 * @param updateData - Partial profile data to apply (name, age, gender, etc.).
 * @returns The updated user object without the password.
 * @throws {AppError} 404 if the user cannot be found.
 */
const updateUserProfile = async (
  email: string,
  updateData: UpdateProfileData
): Promise<Omit<IUser, 'password'>> => {
  const user = await User.findOneAndUpdate(
    { email },
    updateData,
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

export const UserServices = {
  registerUser,
  loginUser,
  getUserByEmail,
  getUsers,
  updateUserProfile,
};
