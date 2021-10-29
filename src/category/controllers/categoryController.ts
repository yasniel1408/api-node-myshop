import express from 'express';
import categoryService from '../services/categoryService';

class CategoryController {
  async listCategory(req: express.Request, res: express.Response) {
    const categories = await categoryService.findAll(req.body.limit || 100, req.body.page || 0);
    return res.status(200).send(categories);
  }

  async getCategoryById(req: express.Request, res: express.Response) {
    const category = await categoryService.getById(req.body.id);
    return res.status(200).send(category);
  }

  async createCategory(req: express.Request, res: express.Response) {
    const id = await categoryService.create(req.body);
    return res.status(201).send({ id });
  }

  async patchCategory(req: express.Request, res: express.Response) {
    await categoryService.patchById(req.body.id, req.body);
    return res.status(204).send();
  }

  async editCategory(req: express.Request, res: express.Response) {
    await categoryService.editById(req.body.id, req.body);
    return res.status(204).send();
  }

  async removeCategory(req: express.Request, res: express.Response) {
    await categoryService.deleteById(req.body.id);
    return res.status(204).send();
  }
}

export default new CategoryController();
