import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

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

  public getSequelize(): Sequelize {
    this.instanceSequelize = new Sequelize({
      dialect: 'sqlite',
      storage: `${url}`
    });
    this.authenticateDB();
    this.syncDB();
    return this.instanceSequelize;
  }

  private async authenticateDB() {
    await this.instanceSequelize.authenticate();
    console.log('Connection has been established successfully.');
  }

  private async syncDB() {
    await this.instanceSequelize.sync();
    console.log('Drop and re-sync db.');
  }
}

export default new DBSequelize();
