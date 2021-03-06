import { PatchCategoryDto } from '../models/patchCategoryDto';
import { CRUDRepository } from '../../common/interfaces/crudRepository';
import { PutCategoryDto } from '../models/putCategoryDto';
import CategoryDao from '../models/categoryDao.model';
import ProductDao from '../../product/models/productDao.model';

class CategoryRepository implements CRUDRepository {
  async findAll(limit: number, page: number): Promise<any> {
    return CategoryDao.findAndCountAll({ limit, offset: page });
  }

  async create(resource: any): Promise<any> {
    const category = new CategoryDao(resource);
    await category.save();
    return category.getDataValue('id');
  }

  async editById(id: string, resource: PutCategoryDto | PatchCategoryDto): Promise<any> {
    const category = await CategoryDao.findByPk(id);
    category.setAttributes(resource);
    await category.save();
    return category.getDataValue('id');
  }

  async getById(id: string): Promise<any> {
    const category = await CategoryDao.findByPk(id, { include: [ProductDao] });
    return category;
  }

  async deleteById(id: string): Promise<any> {
    const category = await CategoryDao.findByPk(id);
    await category.destroy();
    return category.getDataValue('id');
  }
}

export default new CategoryRepository();
