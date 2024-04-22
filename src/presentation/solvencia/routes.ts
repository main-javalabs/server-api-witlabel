import { Router } from "express";
import { CompanyController } from "./controllers/controller";
import { AuthMiddleware } from "../shared/middlewares/auth.middleware";
import { CompanyService } from "./services/company.service";

export class SolvenciaRoutes {
  static get routes(): Router {
    const router = Router();
    const companyService= new CompanyService
    const companyController = new CompanyController(companyService); 

    // Definir las rutas  empresa
    router.post("/create",[AuthMiddleware.validateJWT], companyController.create);
    router.put("/update/:id",companyController.update);
    router.get("/read/:id",companyController.readById);
    router.get("/read-all",companyController.readAll);
    router.delete("/delete/:id",companyController.delete);

    return router;
  }
}
