import { Response, Request } from "express";
import { CustomError } from "../../domain";
import { AuthService } from "./auth.service"; // Asegúrate de que la ruta de importación sea correcta.

export class ConcurretController {
  constructor(private readonly _authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  // Método para obtener la información del usuario conectado
  public getCurrentUser = async (req: Request, res: Response) => {
    try {
      // Asegura que el middleware previo haya adjuntado el id del usuario a req.user
      if (!req.user || !req.user.id) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userInfo = await this._authService.getCurrentUser(req.user.id);
      res.json(userInfo);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
