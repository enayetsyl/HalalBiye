/**
 * @module RequestController
 * 
 * Controller functions for handling connection request routes.
 * Uses catchAsync to wrap async handlers and sendResponse to format HTTP responses.
 */

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RequestService } from "./request.service";

/**
 * Send a new connection request from the authenticated user to another user.
 *
 * @async
 * @function sendRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user (populated by auth middleware).
 * @param {{ toUser: string }} req.body - Request payload containing the recipient user’s ID or email.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 201 response with the created request data.
 */
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

/**
 * Fetch all incoming connection requests for the authenticated user.
 *
 * @async
 * @function getIncomingRequests
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with an array of incoming requests.
 */
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

/**
 * Fetch all outgoing connection requests sent by the authenticated user.
 *
 * @async
 * @function getOutgoingRequests
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with an array of outgoing requests.
 */
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

/**
 * Accept an incoming connection request for the authenticated user.
 *
 * @async
 * @function acceptRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {{ id: string }} req.body - Request payload containing the ID of the request to accept.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with the updated request status.
 */
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

/**
 * Decline an incoming connection request for the authenticated user.
 *
 * @async
 * @function declineRequest
 * @param {import("express").Request} req - Express request object.
 * @param {string} req.user - Email of the authenticated user.
 * @param {{ id: string }} req.body - Request payload containing the ID of the request to decline.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>} Sends a 200 response with the updated request status.
 */
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
