import * as jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions, Secret } from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: number | StringValue
): string => {
  const opts: SignOptions = { expiresIn };
  return jwt.sign(jwtPayload, secret, opts);
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};