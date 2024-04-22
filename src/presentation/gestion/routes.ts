import { Router } from "express";
import { GestionController } from "./controllers/controller";
import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { GestionService } from "./services/gestion.service";

export class GestionRoutes {
  static get routes(): Router {
    const router = Router();
    const gestionService= new GestionService
    const gestionController = new GestionController(gestionService); 

    // Definir las rutas  
    router.post("/create",[AuthMiddleware.validateJWT], gestionController.create);
    // router.put("/update/:id",[AuthMiddleware.validateJWT],gestionController.update);
    // router.get("/read/:id",[AuthMiddleware.validateJWT],gestionController.readById);
    router.get("/read-all",gestionController.readAll);
    // router.delete("/delete/:id",[AuthMiddleware.validateJWT],gestionController.delete);

    return router;
  }
}
