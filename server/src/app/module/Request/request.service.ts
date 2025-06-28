/**
 * RequestService
 *
 * Provides methods to manage connection requests between users:
 * - sending requests
 * - fetching incoming/outgoing requests
 * - accepting or declining pending requests
 */

import AppError from "../../errors/AppError";
import User from "../User/user.model";
import { Request } from "./request.model";

 /**
  * Sends a connection request from one user to another.
  *
  * @param fromUserEmail - Email of the user initiating the request.
  * @param toUserId - MongoDB ObjectId (as string) of the user to receive the request.
  * @returns The newly created request document.
  * @throws {AppError} 404 if requesting user not found.
  * @throws {AppError} 400 if attempting to send a request to oneself.
  * @throws {AppError} 409 if a request between these users already exists.
  */
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

 /**
  * Retrieves all pending or processed requests sent *to* the given user.
  *
  * @param userEmail - Email of the user whose incoming requests will be fetched.
  * @returns A Mongoose query that resolves to an array of requests populated with sender details.
  * @throws {AppError} 404 if the specified user is not found.
  */
const getIncomingRequests = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new AppError(404, "User not found");

  return Request
    .find({ toUser: user._id })
    .populate(
      'fromUser',
      'name email age gender religion location height education occupation'
    );
};

 /**
  * Retrieves all pending or processed requests *sent by* the given user.
  *
  * @param userEmail - Email of the user whose outgoing requests will be fetched.
  * @returns A Mongoose query that resolves to an array of requests populated with recipient details.
  * @throws {AppError} 404 if the specified user is not found.
  */
const getOutgoingRequests = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) throw new AppError(404, "User not found");

  return Request
    .find({ fromUser: user._id })
    .populate(
      'toUser',
      'name email age gender religion location height education occupation'
    );
};

 /**
  * Accepts a pending connection request on behalf of the recipient.
  *
  * @param requestId - MongoDB ObjectId (as string) of the request to accept.
  * @param userEmail - Email of the user performing the acceptance (must match request.toUser).
  * @returns The updated request document with status set to 'accepted'.
  * @throws {AppError} 404 if the user or request is not found.
  * @throws {AppError} 403 if the user is not authorized to accept this request.
  * @throws {AppError} 400 if the request status is not 'pending'.
  */
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

 /**
  * Declines a pending connection request on behalf of the recipient.
  *
  * @param requestId - MongoDB ObjectId (as string) of the request to decline.
  * @param userEmail - Email of the user performing the decline (must match request.toUser).
  * @returns The updated request document with status set to 'rejected'.
  * @throws {AppError} 404 if the user or request is not found.
  * @throws {AppError} 403 if the user is not authorized to decline this request.
  * @throws {AppError} 400 if the request status is not 'pending'.
  */
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
};
