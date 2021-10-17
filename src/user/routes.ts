import express from 'express';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwtMiddleware';
import bodyValidation from '../common/middleware/bodyValidation';
import permission from '../common/middleware/permission';
import { Rol } from '../common/middleware/rol';
import Route from '../common/routes';
import userController from './controllers/userController';
import userMiddleware from './middleware/userMiddleware';

export class UserRoutes extends Route {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/user')
      .get(jwtMiddleware.validJWT, permission.rolRequired(Rol.ADMIN), userController.listUsers)
      .post(
        body('email').isEmail(),
        body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
        bodyValidation.verifyBodyFieldsErrors,
        userMiddleware.validateSameEmailDoesntExist,
        userController.createUser
      );

    this.app.param('userId', userMiddleware.extractUserId);
    this.app
      .route('/user/:userId')
      .all(
        userMiddleware.validateUserExists,
        jwtMiddleware.validJWT,
        permission.onlySameUserOrAdminCanDoThisAction
      )
      .get(userController.getUserById)
      .delete(userController.removeUser);

    this.app.put('/user/:userId', [
      body('email').isEmail(),
      body('password').isLength({ min: 5 }).withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      body('avatar').isObject().optional(),
      body('rol').isInt().optional(),
      bodyValidation.verifyBodyFieldsErrors,
      userMiddleware.validateSameUserIsSameUser,
      userMiddleware.userCantChangePermission,
      permission.rolRequired(Rol.AUTHENTICATE),
      userController.editUser
    ]);

    this.app.patch('/user/:userId', [
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('avatar').isObject().optional(),
      body('rol').isInt().optional(),
      bodyValidation.verifyBodyFieldsErrors,
      userMiddleware.validatePatchEmail,
      userMiddleware.userCantChangePermission,
      permission.rolRequired(Rol.AUTHENTICATE),
      userController.patchUser
    ]);

    /**
     * This route does not currently require extra permissions.
     *
     * Please update it for admin usage in your own application!
     */
    this.app.put('/user/:userId/rol/:rol', [
      jwtMiddleware.validJWT,
      permission.rolRequired(
        // Rol.PUBLIC,
        Rol.AUTHENTICATE
        // Rol.ADMIN,
      ),
      userController.updatePermissionRol
    ]);

    return this.app;
  }
}

export default UserRoutes;
