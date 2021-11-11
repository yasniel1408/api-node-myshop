import express from 'express';
import Rol from './rol';

class Permission {
  rolRequired(rol: Rol) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const userRol = parseInt(res.locals.jwt.rol, 10);
      if (userRol === rol) {
        return next();
      }
      return res.status(403).send();
    };
  }

  onlySameUserOrAdminCanDoThisAction(
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

export default new Permission();
