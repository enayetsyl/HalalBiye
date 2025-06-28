import { z } from 'zod';

export const sendRequestSchema = z.object({
  body: z.object({
    toUser: z.string().min(1, 'Target user is required'),
  }),
});

export const requestIdParamSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'Request ID is required'),
  }),
});
