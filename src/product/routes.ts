import express from 'express';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwtMiddleware';
import bodyValidation from '../common/middleware/bodyValidation';
import helpers from '../common/middleware/helpers';
import permission from '../common/middleware/permission';
import Rol from '../common/middleware/rol';
import Route from '../common/routes';
import productController from './controllers/productController';

export class ProductRoutes extends Route {
  constructor(app: express.Application) {
    super(app, 'ProductRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/product')
      .get(productController.listProduct)
      .post(
        jwtMiddleware.validJWT,
        body('name').isString(),
        body('photo').isString().optional(),
        body('price').isNumeric(),
        body('amount').isNumeric(),
        body('description').isString().optional(),
        permission.rolRequired(Rol.ADMIN),
        bodyValidation.verifyBodyFieldsErrors,
        productController.createProduct
      );

    this.app.param('productId', helpers.extractId('productId'));
    this.app
      .route('/product/:productId')
      .get(productController.getProductById)
      .delete(
        jwtMiddleware.validJWT,
        permission.rolRequired(Rol.ADMIN),
        productController.removeProduct
      )
      .all(
        jwtMiddleware.validJWT,
        body('name').isString(),
        body('photo').isString(),
        body('price').isNumeric(),
        body('amount').isNumeric(),
        body('description').isString(),
        bodyValidation.verifyBodyFieldsErrors,
        permission.rolRequired(Rol.ADMIN)
      )
      .put(productController.editProduct)
      .all(
        jwtMiddleware.validJWT,
        body('name').isString().optional(),
        body('photo').isString().optional(),
        body('price').isNumeric().optional(),
        body('amount').isNumeric().optional(),
        body('description').isString().optional(),
        bodyValidation.verifyBodyFieldsErrors,
        permission.rolRequired(Rol.ADMIN)
      )
      .patch(productController.patchProduct);

    return this.app;
  }
}

export default ProductRoutes;
