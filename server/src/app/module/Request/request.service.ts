import AppError from "../../errors/AppError";
import User from "../User/user.model";
import { Request } from "./request.model";


const sendConnectionRequest = async (fromUserEmail: string, toUserId: string) => {
  const fromUser = await User.findOne({ email: fromUserEmail });
  if (!fromUser) throw new AppError(404, "Requesting user not found");

  const fromUserId = String(fromUser._id);
  if (fromUserId === toUserId) throw new AppError(400, "Cannot send request to yourself");

  const existing = await Request.findOne({ fromUser: fromUserId, toUser: toUserId });
  if (existing) throw new AppError(409, "Request already exists");

  const newRequest = await Request.create({ fromUser: fromUserId, toUser: toUserId });
  return newRequest;
};



const getIncomingRequests = async (userEmail: string) => {
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new AppError(404, "User not found");
    return Request.find({ toUser: user._id}).populate('fromUser', 'name email age gender religion location height education occupation');
  }

const getOutgoingRequests = async (userEmail: string) => {
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new AppError(404, "User not found");
    return Request.find({ fromUser: user._id }).populate('toUser', 'name email age gender religion location height education occupation');
  }

const acceptRequest = async (requestId: string, userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new AppError(404, "User not found");

  const userId = String(user._id);

  const reqDoc = await Request.findById(requestId);
  if (!reqDoc) throw new AppError(404, 'Request not found');
  if (String(reqDoc.toUser) !== userId) throw new AppError(403, 'Not authorized');
  if (reqDoc.status !== 'pending') throw new AppError(400, 'Request is not pending');

  reqDoc.status = 'accepted';
  await reqDoc.save();
  return reqDoc;
};


const declineRequest = async (requestId: string, userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new AppError(404, "User not found");

  const userId = String(user._id);

  const reqDoc = await Request.findById(requestId);
  if (!reqDoc) throw new AppError(404, 'Request not found');
  if (String(reqDoc.toUser) !== userId) throw new AppError(403, 'Not authorized');
  if (reqDoc.status !== 'pending') throw new AppError(400, 'Request is not pending');

  reqDoc.status = 'rejected';
  await reqDoc.save();
  return reqDoc;
};



export const RequestService = {
  sendConnectionRequest,
  getIncomingRequests,
  getOutgoingRequests,
  acceptRequest,
  declineRequest
}