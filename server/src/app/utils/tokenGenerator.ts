/**
 * Utilities for creating and verifying JSON Web Tokens (JWT) using the `jsonwebtoken` library.
 *
 * @module auth/tokenUtils
 */

import * as jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

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
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: number | StringValue
): string => {
  const opts: SignOptions = { expiresIn };
  return jwt.sign(jwtPayload, secret, opts);
};

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
export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
