import { Router } from 'express';
import * as RequestController from '../Request/request.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import validateRequest from '../../middlewares/validateRequest';
import { sendRequestSchema, requestIdParamSchema } from '../Request/request.validation';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validateRequest(sendRequestSchema),
  RequestController.sendRequest
);

router.get(
  '/incoming',
  authMiddleware,
  RequestController.getIncomingRequests
);

router.get(
  '/outgoing',
  authMiddleware,
  RequestController.getOutgoingRequests
);

router.post(
  '/accept',
  authMiddleware,
  validateRequest(requestIdParamSchema),
  RequestController.acceptRequest
);

router.post(
  '/decline',
  authMiddleware,
  validateRequest(requestIdParamSchema),
  RequestController.declineRequest
);


export const RequestRoutes = router;