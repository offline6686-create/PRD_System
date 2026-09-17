import jwt from 'jsonwebtoken';
import { config } from '../app/config';
import { UserPayload } from '../app/middleware/auth.middleware';

export class JwtService {
  public static generateAccessToken(payload: UserPayload): string {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
  }

  public static generateRefreshToken(payload: UserPayload): string {
    return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '7d' });
  }

  public static verifyAccessToken(token: string): UserPayload {
    return jwt.verify(token, config.jwtSecret) as UserPayload;
  }

  public static verifyRefreshToken(token: string): UserPayload {
    return jwt.verify(token, config.jwtRefreshSecret) as UserPayload;
  }
}
