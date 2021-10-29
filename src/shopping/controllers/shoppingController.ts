import express from 'express';
import shoppingService from '../services/shoppingService';

class ShoppingController {
  async listShopping(req: express.Request, res: express.Response) {
    const shoppings = await shoppingService.findAll(req.body.limit || 100, req.body.page || 0);
    return res.status(200).send(shoppings);
  }

  async getShoppingById(req: express.Request, res: express.Response) {
    const shopping = await shoppingService.getById(req.body.id);
    return res.status(200).send(shopping);
  }

  async createShopping(req: express.Request, res: express.Response) {
    const id = await shoppingService.create(req.body);
    return res.status(201).send({ id });
  }

  async patchShopping(req: express.Request, res: express.Response) {
    await shoppingService.patchById(req.body.id, req.body);
    return res.status(204).send();
  }

  async editShopping(req: express.Request, res: express.Response) {
    await shoppingService.editById(req.body.id, req.body);
    return res.status(204).send();
  }

  async removeShopping(req: express.Request, res: express.Response) {
    await shoppingService.deleteById(req.body.id);
    return res.status(204).send();
  }
}

export default new ShoppingController();
