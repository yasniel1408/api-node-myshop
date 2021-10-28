import express from 'express';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwtMiddleware';
import bodyValidation from '../common/middleware/bodyValidation';
import helpers from '../common/middleware/helpers';
import permission from '../common/middleware/permission';
import Rol from '../common/middleware/rol';
import Route from '../common/routes';
import categoryController from './controllers/categoryController';

export class CategoryRoutes extends Route {
  constructor(app: express.Application) {
    super(app, 'CategoryRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/category')
      .get(jwtMiddleware.validJWT, categoryController.listCategory)
      .post(
        body('name').isString(),
        permission.rolRequired(Rol.ADMIN),
        bodyValidation.verifyBodyFieldsErrors,
        categoryController.createCategory
      );

    this.app.param('categoryId', helpers.extractId('categoryId'));
    this.app
      .route('/category/:categoryId')
      .all(jwtMiddleware.validJWT)
      .get(categoryController.getCategoryById)
      .delete(permission.rolRequired(Rol.ADMIN), categoryController.removeCategory);

    this.app
      .route('/category/:categoryId')
      .all(
        jwtMiddleware.validJWT,
        body('name').isString(),
        bodyValidation.verifyBodyFieldsErrors,
        permission.rolRequired(Rol.ADMIN)
      )
      .put(categoryController.editCategory)
      .patch(categoryController.patchCategory);

    return this.app;
  }
}

export default CategoryRoutes;
