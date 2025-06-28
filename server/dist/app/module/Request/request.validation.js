"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdParamSchema = exports.sendRequestSchema = void 0;
const zod_1 = require("zod");
exports.sendRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        toUser: zod_1.z.string().min(1, 'Target user is required'),
    }),
});
exports.requestIdParamSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Request ID is required'),
    }),
});
