import { CRUDService } from '../../common/interfaces/crudService';
import categoryRepository from '../repositories/categoryRepository';
import { PatchCategoryDto } from '../models/patchCategoryDto';
import { PutCategoryDto } from '../models/putCategoryDto';
import { CreateCategoryDto } from '../models/createCategoryDto';

class CategoryService implements CRUDService {
  async findAll(limit: number, page: number): Promise<any> {
    return categoryRepository.findAll(limit, page);
  }

  async create(resource: CreateCategoryDto): Promise<any> {
    return categoryRepository.create(resource);
  }

  async editById(id: string, resource: PutCategoryDto): Promise<any> {
    return categoryRepository.editById(id, resource);
  }

  async getById(id: string): Promise<any> {
    return categoryRepository.getById(id);
  }

  async deleteById(id: string): Promise<any> {
    return categoryRepository.deleteById(id);
  }

  async patchById(id: string, resource: PatchCategoryDto): Promise<any> {
    return categoryRepository.editById(id, resource);
  }
}

export default new CategoryService();
