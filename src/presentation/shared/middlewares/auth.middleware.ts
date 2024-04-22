// AuthMiddleware.ts
import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../config';
import { UserModel } from '../../../data';

interface IAuthPayload {
  id: string;
  name: string;
  img?: string; 
  email: string;
  role: string[]; 
}

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload; 
    }
  }
}

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) {
      return res.status(401).json({ error: 'No token provided' });
    }
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid Bearer token' });
    }

    // Usamos 'split' y aseguramos que 'token' sea un string. El 'pop' podría devolver 'undefined', por eso el fallback a ''.
    const token = authorization.split(' ')[1] || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await UserModel.findById(payload.id);
      if (!user) {
        return res.status(401).json({ error: 'User does not exist' });
      }

      // Adjunta el usuario al objeto request. Aquí podrías querer ajustar según tu lógica de negocio.
      // Si UserModel es un modelo de Mongoose, user será un documento de Mongoose.
      // Puedes querer convertirlo a un objeto JS simple, especialmente si planeas modificarlo o agregar propiedades.
      const userObject = user.toObject(); // Convierte el documento a un objeto plano de JavaScript.
      
      const { _id, name, img, email, role } = userObject;

      req.user = {
        id: _id.toString(),
        name,
        img,
        email,
        role
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
