import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class SignOutController {
  public signOut(req: Request, res: Response): void {
    // Limpiar la sesión asignándole null
    req.session = null;

    res.clearCookie('session', { path: '/' }); // Asegúrate de que el nombre 'session' coincida con tu configuración

    res.status(HTTP_STATUS.OK).json({ message: 'Logout successful' });
  }
}
