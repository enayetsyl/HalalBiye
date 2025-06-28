"use strict";
// server/src/middleware/authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const tokenGenerator_1 = require("../utils/tokenGenerator");
const authMiddleware = (req, res, next) => {
    var _a;
    // 1. Grab token from Authorization header (Bearer) or HttpOnly cookie
    const authHeader = req.headers.authorization;
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))
        ? authHeader.split(' ')[1]
        : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        // 2. Use your helper to verify & decode
        const decoded = (0, tokenGenerator_1.verifyToken)(token, config_1.default.jwt_secret);
        // 3. Attach user ID for downstream handlers
        req.user = decoded.userId;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.default = authMiddleware;
