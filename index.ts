import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import AuthRoutes from './src/auth/routes';
import CategoryRoutes from './src/category/routes';
import './src/common/db/DBSequelize';
import Route from './src/common/routes';
import UserRoutes from './src/user/routes';

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 5000;
const routes: Array<Route> = [];

app.use(express.json());
app.use(cors());
app.use(helmet());

// add routes
routes.push(new AuthRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new CategoryRoutes(app));

const messageExpressServer = `Server is listening on ${port}`;
app.get('/', (req, res) => {
  res.send(messageExpressServer);
});
server.listen(port, () => {
  routes.forEach((route: Route) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
  console.log(messageExpressServer);
});
export default server;
