
import AppError from '../../errors/AppError';
import { TProfileData } from '../../type';
import { IUser, User } from './user.model';
import { UpdateProfileData } from './user.types';
import { Request as ConnectionRequest } from "../Request/request.model";

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

/**
 * Fetch the current user by email, stripping out the password.
 */
const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  return user;
};

/**
 * Fetch multiple users based on provided filters.
 * Any field in `filters` will be matched against the User schema.
 * Excludes the password in the result.
 */
const getUsers = async (filters: Record<string, any>, currentUserEmail: string) => {
  const users = await User.find(filters);

  const currentUser = await User.findOne({ email: currentUserEmail });
  if (!currentUser) throw new AppError(404, "Current user not found");

  const currentUserId = String(currentUser._id);
  const userIds = users.map(u => String(u._id));

  const requests = await ConnectionRequest.find({
    $or: [
      { fromUser: currentUserId, toUser: { $in: userIds } },
      { fromUser: { $in: userIds }, toUser: currentUserId }
    ]
  });

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

  const usersWithStatus = users.map(user => {
    const status = connectionStatusMap[String(user._id)] || "none";
    return { ...user.toObject(), connectionStatus: status };
  });

  return usersWithStatus;
};



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