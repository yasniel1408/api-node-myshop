import './src/common/db/dbSequelize';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import debug from 'debug';
import * as http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Route from './src/common/routes';
import router from './router';

import swagger from './swagger.json';

const log: debug.IDebugger = debug('index:app-server');

const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
const swaggerDocument = swaggerJSDoc(swagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

const messageExpressServer = `Server is listening on ${port}`;

app.get('/', (req, res) => {
  res.send(messageExpressServer);
});

server.listen(port, () => {
  router.addRoutes(app).forEach((route: Route) => {
    log(`Routes configured for ${route.getName()}`);
  });
  if (process.env.DEBUG) {
    log(messageExpressServer);
  } else {
    // eslint-disable-next-line no-console
    console.log(messageExpressServer);
  }
});

export default server;
