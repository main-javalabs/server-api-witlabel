import express, { Application, Express, Router } from 'express';
import path from 'path';
import cors from 'cors';
import { envs } from '../config';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import hpp from 'hpp';

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app: Express = express();
  private serverListener?: ReturnType<typeof express.application.listen>;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;

    // Configuración inicial del servidor
    this.initialize();
  }

  private initialize(): void {
    this.app.use(express.json());
    this.securityMiddleware(this.app);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);

    // Servir la aplicación Angular en todas las demás rutas
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [envs.SECRET_KEY_ONE!, envs.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: envs.NODE_ENV !== 'development', //asi no sale el erorr currente
        // sameSite: 'none' // comentar si lo hago en local
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: envs.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  public async start(): Promise<void> {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close(): void {
    if (this.serverListener) {
      this.serverListener.close(() => {
        console.log('Server closed');
      });
    }
  }
}
