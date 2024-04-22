import { envs } from './../../config';
import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../shared';
import { ConcurretController } from './concurrent';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';
import { SignOutController } from './signout';




export class Authroutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL,
    );

    const authService = new AuthService(emailService);

    const controller = new AuthController(authService);
    const concurrentController = new ConcurretController(authService);
    const signOutController = new SignOutController();

    // Definir las rutas
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );
    
    router.get('/validate-email/:token', controller.validateEmail );
    router.get('/current',[AuthMiddleware.validateJWT], concurrentController.getCurrentUser );


    // ruta de salida segura
    router.post('/signout',  signOutController.signOut);



    return router;
  }


}

