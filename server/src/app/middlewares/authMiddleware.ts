// server/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { verifyToken } from '../utils/tokenGenerator';


interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: string;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Grab token from Authorization header (Bearer) or HttpOnly cookie
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 2. Use your helper to verify & decode
    const decoded = verifyToken(token, config.jwt_secret!) as JwtPayload;

    // 3. Attach user ID for downstream handlers
    req.user = decoded.userId;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;
