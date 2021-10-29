import express from 'express';
import productService from '../services/productService';

class ProductController {
  async listProduct(req: express.Request, res: express.Response) {
    const products = await productService.findAll(req.body.limit || 100, req.body.page || 0);
    return res.status(200).send(products);
  }

  async getProductById(req: express.Request, res: express.Response) {
    const product = await productService.getById(req.body.id);
    return res.status(200).send(product);
  }

  async createProduct(req: express.Request, res: express.Response) {
    const id = await productService.create(req.body);
    return res.status(201).send({ id });
  }

  async patchProduct(req: express.Request, res: express.Response) {
    await productService.patchById(req.body.id, req.body);
    return res.status(204).send();
  }

  async editProduct(req: express.Request, res: express.Response) {
    await productService.editById(req.body.id, req.body);
    return res.status(204).send();
  }

  async removeProduct(req: express.Request, res: express.Response) {
    await productService.deleteById(req.body.id);
    return res.status(204).send();
  }
}

export default new ProductController();
