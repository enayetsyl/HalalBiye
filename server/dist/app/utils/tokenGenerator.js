"use strict";
/**
 * Utilities for creating and verifying JSON Web Tokens (JWT) using the `jsonwebtoken` library.
 *
 * @module auth/tokenUtils
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
/**
 * Creates a signed JWT containing the given payload.
 *
 * @param jwtPayload - An object containing the data to encode in the token.
 *   @property userId - The unique identifier of the user.
 *   @property role - The user's role (e.g., "admin", "user").
 * @param secret - The secret key (string or buffer) used to sign the token.
 * @param expiresIn - Token lifetime, either as a number of seconds or a string (e.g., "1h", "7d").
 * @returns A signed JWT as a string.
 *
 * @example
 * const token = createToken(
 *   { userId: 'abc123', role: 'user' },
 *   process.env.JWT_SECRET!,
 *   '2h'
 * );
 */
const createToken = (jwtPayload, secret, expiresIn) => {
    const opts = { expiresIn };
    return jwt.sign(jwtPayload, secret, opts);
};
exports.createToken = createToken;
/**
 * Verifies a JWT and returns its decoded payload.
 *
 * @param token - The JWT string to verify.
 * @param secret - The secret key (string or buffer) used to verify the token.
 * @returns The decoded token payload as a JwtPayload.
 *
 * @throws {JsonWebTokenError} if the token is malformed or signature verification fails.
 * @throws {TokenExpiredError} if the token has expired.
 *
 * @example
 * try {
 *   const payload = verifyToken(token, process.env.JWT_SECRET!);
 *   console.log(payload.userId, payload.role);
 * } catch (err) {
 *   // handle invalid or expired token
 * }
 */
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
exports.verifyToken = verifyToken;
