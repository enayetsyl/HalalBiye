/**
 * @module RequestRoutes
 * @description
 * Defines all `/api/v1/requests` endpoints for managing connection requests between users.
 * Each route is protected by authentication middleware and, where applicable,
 * request payloads are validated against JSON schemas.
 */

import { Router } from 'express';
import * as RequestController from '../Request/request.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { sendRequestSchema, requestIdParamSchema } from '../Request/request.validation';

const router = Router();

/**
 * Send a new connection request.
 *
 * @route POST /
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against sendRequestSchema
 * @controller RequestController.sendRequest
 *
 * @example
 * POST /api/v1/requests
 * {
 *   "toUser": "60d0fe4f5311236168a109ca"
 * }
 */
router.post(
  '/',
  authMiddleware,
  validateRequest(sendRequestSchema),
  RequestController.sendRequest
);

/**
 * Retrieve all incoming connection requests for the authenticated user.
 *
 * @route GET /incoming
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @controller RequestController.getIncomingRequests
 */
router.get(
  '/incoming',
  authMiddleware,
  RequestController.getIncomingRequests
);

/**
 * Retrieve all outgoing connection requests sent by the authenticated user.
 *
 * @route GET /outgoing
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @controller RequestController.getOutgoingRequests
 */
router.get(
  '/outgoing',
  authMiddleware,
  RequestController.getOutgoingRequests
);

/**
 * Accept a pending connection request.
 *
 * @route POST /accept
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against requestIdParamSchema
 * @controller RequestController.acceptRequest
 *
 * @example
 * POST /api/v1/requests/accept
 * {
 *   "id": "60d0fe4f5311236168a109cb"
 * }
 */
router.post(
  '/accept',
  authMiddleware,
  validateRequest(requestIdParamSchema),
  RequestController.acceptRequest
);

/**
 * Decline a pending connection request.
 *
 * @route POST /decline
 * @access Protected
 * @middleware authMiddleware       - ensures the user is authenticated
 * @middleware validateRequest      - enforces shape of request body against requestIdParamSchema
 * @controller RequestController.declineRequest
 *
 * @example
 * POST /api/v1/requests/decline
 * {
 *   "id": "60d0fe4f5311236168a109cc"
 * }
 */
router.post(
  '/decline',
  authMiddleware,
  validateRequest(requestIdParamSchema),
  RequestController.declineRequest
);

export const RequestRoutes = router;
