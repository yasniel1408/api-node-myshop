import { CreateUserDto } from '../models/createUserDto';
import { CRUDService } from '../../common/interfaces/crudService';
import userRepository from '../repositories/userRepository';
import { PutUserDto } from '../models/putUserDto';
import { PatchUserDto } from '../models/patchUserDto';

class UserService implements CRUDService {
  async findAll(limit: number, page: number): Promise<any> {
    return userRepository.findAll(limit, page);
  }

  async create(resource: CreateUserDto): Promise<any> {
    return userRepository.create(resource);
  }

  async editById(id: string, resource: PutUserDto): Promise<any> {
    return userRepository.editById(id, resource);
  }

  async getById(id: string): Promise<any> {
    return userRepository.getById(id);
  }

  async deleteById(id: string): Promise<any> {
    return userRepository.deleteById(id);
  }

  async patchById(id: string, resource: PatchUserDto): Promise<any> {
    return userRepository.editById(id, resource);
  }

  async getUserByEmail(email: string): Promise<any> {
    return userRepository.getByEmail(email);
  }
}

export default new UserService();
