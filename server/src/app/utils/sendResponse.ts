import { Response } from 'express';
import { TResponse } from '../type';

/**
 * Send a standardized JSON response.
 *
 * @template T
 * @param {Response} res - The Express response object.
 * @param {TResponse<T>} data - The response payload, including status code, message,
 *   optional metadata, and data of type T.
 *
 * Example usage:
 * ```ts
 * sendResponse(res, {
 *   statusCode: 200,
 *   success: true,
 *   message: 'User fetched successfully',
 *   meta: { page: 1, pageSize: 10 },
 *   data: userList
 * });
 * ```
 */
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
