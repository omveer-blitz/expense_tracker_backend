import App from '@/app';
import ExternalRoutes from './routes/external.route';

const app = new App([new ExternalRoutes()]);

app.listen();
