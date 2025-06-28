"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data,
    });
};
exports.default = sendResponse;
