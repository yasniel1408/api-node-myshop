import express from 'express';
import Rol from '../../common/middleware/rol';
import userService from '../services/userService';

class UsersMiddleware {
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ errors: ['User email already exists'] });
    } else {
      next();
    }
  }

  async validateSameUserIsSameUserOrAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (res.locals.user.id === req.params.userId) next();
    if (res.locals.user.rol === Rol.ADMIN) next();

    res.status(400).send({ errors: ['Invalid User'] });
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getById(req.params.userId);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`]
      });
    }
  }

  async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
