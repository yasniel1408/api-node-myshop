import express from 'express';

class Helpers {
  extractId(id: string) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      req.body.id = req.params[id];
      return next();
    };
  }
}

export default new Helpers();
