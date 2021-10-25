import express from 'express';
import Rol from '../../common/middleware/rol';
import userService from '../services/userService';

class UserMiddleware {
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ errors: ['User email already exists'] });
    }
    return next();
  }

  async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.userId;
    return next();
  }

  async validateUserExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getById(req.params.userId);
    if (user) {
      res.locals.user = user;
      return next();
    }
    return res.status(400).send({
      errors: [`User ${req.params.userId} not found`]
    });
  }

  async onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userRol = parseInt(res.locals.jwt.rol, 10);
    if (req.params && req.params.userId && req.params.userId === res.locals.jwt.userId) {
      return next();
    }
    if (userRol === Rol.ADMIN) {
      return next();
    }
    return res.status(403).send();
  }
}

export default new UserMiddleware();
