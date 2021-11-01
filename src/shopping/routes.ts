import express from 'express';
import jwtMiddleware from '../auth/middleware/jwtMiddleware';
import helpers from '../common/middleware/helpers';
import permission from '../common/middleware/permission';
import Rol from '../common/middleware/rol';
import Route from '../common/routes';
import userMiddleware from '../user/middleware/userMiddleware';
import shoppingController from './controllers/shoppingController';

export class ShoppingRoutes extends Route {
  constructor(app: express.Application) {
    super(app, 'ShoppingRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/shopping')
      .get(
        jwtMiddleware.validJWT,
        userMiddleware.onlySameUserOrAdminCanDoThisAction,
        shoppingController.listShopping
      )
      .post(jwtMiddleware.validJWT, shoppingController.createShopping);

    this.app.param('shoppingId', helpers.extractId('shoppingId'));
    this.app
      .route('/shopping/:shoppingId')
      .get(shoppingController.getShoppingById)
      .delete(
        jwtMiddleware.validJWT,
        permission.rolRequired(Rol.ADMIN),
        shoppingController.removeShopping
      );

    return this.app;
  }
}

export default ShoppingRoutes;
