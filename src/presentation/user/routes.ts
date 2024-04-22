import { Router } from "express";
import { UserController } from "./controllers/controller";
import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { UserService } from "./services/user.service";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const userService= new UserService
    const userController = new UserController(userService); 

    // Definir las rutas  empresa
    router.post("/create",[AuthMiddleware.validateJWT], userController.create);
    router.put("/update/:id",[AuthMiddleware.validateJWT],userController.update);
    router.get("/read/:id",[AuthMiddleware.validateJWT],userController.readById);
    router.get("/read-all",userController.readAll);
    router.delete("/delete/:id",[AuthMiddleware.validateJWT],userController.delete);

    return router;
  }
}
