import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import debug from 'debug';

const log: debug.IDebugger = debug('app:sequelize-connection');

dotenv.config();
let url = '';
if (process.env.NODE_ENV === 'test') {
  url = process.env.DB_URI_TEST;
} else if (process.env.NODE_ENV === 'development') {
  url = process.env.DB_URI_DEV;
} else {
  url = process.env.DB_URI_PROD;
}

class DBSequelize {
  private instanceSequelize: Sequelize;

  constructor() {
    this.instanceSequelize = new Sequelize({
      dialect: 'sqlite',
      storage: `${url}`,
      models: [`${__dirname}/../../../**/*.model.ts`],
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

    this.authenticateDB();
    // this.syncDB();
  }

  private async authenticateDB() {
    await this.instanceSequelize.authenticate();
    log('Connection has been established successfully.');
  }

  private async syncDB() {
    // await this.instanceSequelize.sync({ force: true });
    await this.instanceSequelize.sync();
    log('Drop and re-sync db.');
  }
}

export default new DBSequelize();
