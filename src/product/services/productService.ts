import { CRUDService } from '../../common/interfaces/crudService';
import productRepository from '../repositories/productRepository';
import { PatchProductDto } from '../models/patchProductDto';
import { PutProductDto } from '../models/putProductDto';
import { CreateProductDto } from '../models/createProductDto';

class ProductService implements CRUDService {
  async findAll(limit: number, page: number): Promise<any> {
    return productRepository.findAll(limit, page);
  }

  async create(resource: CreateProductDto): Promise<any> {
    return productRepository.create(resource);
  }

  async editById(id: string, resource: PutProductDto): Promise<any> {
    return productRepository.editById(id, resource);
  }

  async getById(id: string): Promise<any> {
    return productRepository.getById(id);
  }

  async deleteById(id: string): Promise<any> {
    return productRepository.deleteById(id);
  }

  async patchById(id: string, resource: PatchProductDto): Promise<any> {
    return productRepository.editById(id, resource);
  }
}

export default new ProductService();
