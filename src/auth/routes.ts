import express from 'express';
import { body } from 'express-validator';
import bodyValidation from '../common/middleware/bodyValidation';
import Route from '../common/routes';
import authController from './controllers/authController';
import authMiddleware from './middleware/authMiddleware';
import jwtMiddleware from './middleware/jwtMiddleware';

export default class AuthRoutes extends Route {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post('/auth', [
      body('email').isEmail(),
      body('password').isString(),
      bodyValidation.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);
    this.app.post('/auth/refresh-token', [
      jwtMiddleware.validJWT,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT,
    ]);
    return this.app;
  }
}
