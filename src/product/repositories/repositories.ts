import { PatchProductDto } from '../models/patchProductDto';
import { CRUDRepository } from '../../common/interfaces/crudRepository';
import { PutProductDto } from '../models/putProductDto';
import ProductDao from '../models/ProductDao.model';

class ProductRepository implements CRUDRepository {
  async findAll(limit: number, page: number): Promise<any> {
    return ProductDao.findAndCountAll({ limit, offset: page });
  }

  async create(resource: any): Promise<any> {
    const product = new ProductDao(resource);
    await product.save();
    return product.getDataValue('id');
  }

  async editById(id: string, resource: PutProductDto | PatchProductDto): Promise<any> {
    const product = await ProductDao.findByPk(id);
    product.setAttributes(resource);
    await product.save();
    return product.getDataValue('id');
  }

  async getById(id: string): Promise<any> {
    const product = await ProductDao.findByPk(id);
    return product;
  }

  async deleteById(id: string): Promise<any> {
    const product = await ProductDao.findByPk(id);
    await product.destroy();
    return product.getDataValue('id');
  }
}

export default new ProductRepository();
