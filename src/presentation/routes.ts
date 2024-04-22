import { Router } from 'express';
import { Authroutes } from './auth/routes';
import { CompanyRoutes } from './company/routes';
import { UserRoutes } from './user/routes';
import { LiquidezRoutes } from './liquidez/routes';
import { SolvenciaRoutes } from './solvencia/routes';
import { GestionRoutes } from './gestion/routes';
import { RentabilidadRoutes } from './rentabilidad/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', Authroutes.routes );
    router.use('/api/user', UserRoutes.routes );
    router.use('/api/company', CompanyRoutes.routes );
    router.use('/api/solvencia', SolvenciaRoutes.routes );
    router.use('/api/liquidez', LiquidezRoutes.routes );
    router.use('/api/gestion', GestionRoutes.routes );
    router.use('/api/rentabilidad', RentabilidadRoutes.routes );
    // router.use('/api/report', ReportGenerarRoutes.routes );



    return router;
  }


}

