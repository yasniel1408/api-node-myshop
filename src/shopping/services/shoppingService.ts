import { CRUDService } from '../../common/interfaces/crudService';
import shoppingRepository from '../repositories/shoppingRepository';
import { PatchShoppingDto } from '../models/patchShoppingDto';
import { PutShoppingDto } from '../models/putShoppingDto';
import { CreateShoppingDto } from '../models/createShoppingDto';

class ShoppingService implements CRUDService {
  async findAll(limit: number, page: number): Promise<any> {
    return shoppingRepository.findAll(limit, page);
  }

  async create(resource: CreateShoppingDto): Promise<any> {
    return shoppingRepository.create(resource);
  }

  async editById(id: string, resource: PutShoppingDto): Promise<any> {
    return shoppingRepository.editById(id, resource);
  }

  async getById(id: string): Promise<any> {
    return shoppingRepository.getById(id);
  }

  async deleteById(id: string): Promise<any> {
    return shoppingRepository.deleteById(id);
  }

  async patchById(id: string, resource: PatchShoppingDto): Promise<any> {
    return shoppingRepository.editById(id, resource);
  }
}

export default new ShoppingService();
