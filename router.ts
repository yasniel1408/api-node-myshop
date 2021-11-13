import debug from 'debug';
import AuthRoutes from './src/auth/routes';
import CategoryRoutes from './src/category/routes';
import Route from './src/common/routes';
import ProductRoutes from './src/product/routes';
import ShoppingRoutes from './src/shopping/routes';
import UserRoutes from './src/user/routes';

const log: debug.IDebugger = debug('router:app-router');

class Router {
  routes: Array<Route> = [];

  addRoutes(app): Array<Route> {
    log('Add all the routes');

    this.routes.push(new AuthRoutes(app));
    this.routes.push(new UserRoutes(app));
    this.routes.push(new CategoryRoutes(app));
    this.routes.push(new ProductRoutes(app));
    this.routes.push(new ShoppingRoutes(app));

    return this.routes;
  }
}

export default new Router();
