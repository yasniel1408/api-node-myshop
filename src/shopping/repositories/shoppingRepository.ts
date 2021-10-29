import { PatchShoppingDto } from '../models/patchShoppingDto';
import { CRUDRepository } from '../../common/interfaces/crudRepository';
import { PutShoppingDto } from '../models/putShoppingDto';
import ShoppingDao from '../models/ShoppingDao.model';

class ShoppingRepository implements CRUDRepository {
  async findAll(limit: number, page: number): Promise<any> {
    return ShoppingDao.findAndCountAll({
      limit,
      offset: page,
      include: [{ all: true, nested: true }]
    });
  }

  async create(resource: any): Promise<any> {
    const shopping = new ShoppingDao(resource);
    await shopping.save();
    return shopping.getDataValue('id');
  }

  async editById(id: string, resource: PutShoppingDto | PatchShoppingDto): Promise<any> {
    const shopping = await ShoppingDao.findByPk(id);
    shopping.setAttributes(resource);
    await shopping.save();
    return shopping.getDataValue('id');
  }

  async getById(id: string): Promise<any> {
    const shopping = await ShoppingDao.findByPk(id, { include: [{ all: true, nested: true }] });
    return shopping;
  }

  async deleteById(id: string): Promise<any> {
    const shopping = await ShoppingDao.findByPk(id);
    await shopping.destroy();
    return shopping.getDataValue('id');
  }
}

export default new ShoppingRepository();
