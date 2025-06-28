import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RequestService } from "./request.service";

export const sendRequest = catchAsync(async (req, res) => {
  const fromUserEmail = req.user; // now just email
  const { toUser } = req.body;
  const request = await RequestService.sendConnectionRequest(fromUserEmail!, toUser);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Request sent successfully',
    data: request,
  });
});

export const getIncomingRequests = catchAsync(async (req, res) => {
  const userEmail = req.user; // just email
  const requests = await RequestService.getIncomingRequests(userEmail!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Incoming requests fetched',
    data: requests,
  });
});

export const getOutgoingRequests = catchAsync(async (req, res) => {
  const userEmail = req.user;
  const requests = await RequestService.getOutgoingRequests(userEmail!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Outgoing requests fetched',
    data: requests,
  });
});

export const acceptRequest = catchAsync(async (req, res) => {
  const userEmail = req.user;
  const { id } = req.body;
  console.log("Request params:", req.body);

  const updated = await RequestService.acceptRequest(id, userEmail!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Request accepted',
    data: updated,
  });
});

export const declineRequest = catchAsync(async (req, res) => {
  const userEmail = req.user;
  const { id } = req.body;
    console.log("Request params:", req.body);
  const updated = await RequestService.declineRequest(id, userEmail!);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Request declined',
    data: updated,
  });
});
