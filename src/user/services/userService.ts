import { CreateUserDto } from '../models/createUserDto';
import { PatchUserDto } from '../models/patchUserDto';
import { PutUserDto } from '../models/putUserDto';
import userRepository from '../repositories/userRepository';
import { CRUDService } from '../../common/interfaces/crudService';

class UsersService implements CRUDService {
  async findAll(limit: number, page: number): Promise<any> {
    return userRepository.findAll(limit, page);
  }

  async create(resource: CreateUserDto): Promise<any> {
    return userRepository.create(resource);
  }

  async editById(id: string, resource: PutUserDto): Promise<string> {
    return userRepository.editById(id, resource);
  }

  async getById(id: string): Promise<any> {
    return userRepository.getById(id);
  }

  async getUserByEmail(email: string): Promise<any> {
    return userRepository.getByEmail(email);
  }

  async deleteById(id: string): Promise<string> {
    return userRepository.deleteById(id);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<string> {
    return userRepository.editById(id, resource);
  }
}

export default new UsersService();
