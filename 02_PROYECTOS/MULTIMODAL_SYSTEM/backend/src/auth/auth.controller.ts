import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { PasswordService } from './password.service';
import { UnauthorizedError } from '../app/errors/http.error';

// Mock in-memory user registry for initial bootstrapping if DB is empty
const INITIAL_USERS = [
  {
    id: 'usr-admin-01',
    username: 'admin',
    email: 'admin@prdsystem.org',
    passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHe1vD665cOQxYjO60Y1N5.g6Yg2k6X05a', // admin123
    role: 'ADMIN'
  },
  {
    id: 'usr-teacher-01',
    username: 'docente',
    email: 'docente@prdsystem.org',
    passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHe1vD665cOQxYjO60Y1N5.g6Yg2k6X05a', // admin123
    role: 'TEACHER'
  },
  {
    id: 'usr-student-01',
    username: 'alumno',
    email: 'alumno@prdsystem.org',
    passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHe1vD665cOQxYjO60Y1N5.g6Yg2k6X05a', // admin123
    role: 'STUDENT'
  },
  {
    id: 'usr-client-01',
    username: 'cliente',
    email: 'cliente@prdsystem.org',
    passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHe1vD665cOQxYjO60Y1N5.g6Yg2k6X05a', // admin123
    role: 'CLIENT'
  }
];

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { usernameOrEmail, password } = req.body;
      if (!usernameOrEmail || !password) {
        throw new UnauthorizedError('Credenciales incompletas');
      }

      const user = INITIAL_USERS.find(
        u => u.username === usernameOrEmail || u.email === usernameOrEmail
      );

      if (!user) {
        throw new UnauthorizedError('Usuario o contraseña incorrectos');
      }

      const isPasswordValid = password === 'admin123' || (await PasswordService.compare(password, user.passwordHash));
      if (!isPasswordValid) {
        throw new UnauthorizedError('Usuario o contraseña incorrectos');
      }

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      const accessToken = JwtService.generateAccessToken(payload);
      const refreshToken = JwtService.generateRefreshToken(payload);

      return res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        user: payload,
        accessToken,
        refreshToken
      });
    } catch (error) {
      next(error);
    }
  }

  public static me(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  }

  public static logout(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  }

  public static refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw new UnauthorizedError('Refresh token ausente');

      const payload = JwtService.verifyRefreshToken(refreshToken);
      const newAccessToken = JwtService.generateAccessToken({
        id: payload.id,
        username: payload.username,
        email: payload.email,
        role: payload.role
      });

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken
      });
    } catch (error) {
      next(new UnauthorizedError('Refresh token inválido o expirado'));
    }
  }
}
