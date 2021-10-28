import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

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
      models: [`${__dirname}/../../../**/*.model.ts`]
    });
    this.authenticateDB();
    this.syncDB();
  }

  private async authenticateDB() {
    await this.instanceSequelize.authenticate();
    console.log('Connection has been established successfully.');
  }

  private async syncDB() {
    await this.instanceSequelize.sync({ force: true });
    console.log('Drop and re-sync db.');
  }
}

export default new DBSequelize();
