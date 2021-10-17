import { PatchUserDto } from '../models/patchUserDto';
import Rol from '../../common/middleware/rol';
import { CreateUserDto } from '../models/createUserDto';
import { PutUserDto } from '../models/putUserDto';
import UserDao from '../models/userDao';
import { CRUDRepository } from '../../common/interfaces/crudRepository';

class UserRepository implements CRUDRepository {
  async findAll(limit: number, page: number): Promise<any> {
    return UserDao.findAndCountAll({ limit, offset: page });
  }

  async create(resource: CreateUserDto): Promise<string> {
    const user = new UserDao({
      ...resource,
      rol: Rol.AUTHENTICATE
    });
    await user.save();
    return user.getDataValue('id');
  }

  async editById(id: string, resource: PutUserDto | PatchUserDto): Promise<string> {
    const user = await UserDao.findByPk(id);
    user.setAttributes(resource);
    await user.save();
    return user.getDataValue('id');
  }

  async getById(id: string): Promise<any> {
    const user = await UserDao.findByPk(id);
    return user;
  }

  async getByEmail(email: string): Promise<any> {
    const user = await UserDao.findOne({
      where: { email }
    });
    return user;
  }

  async deleteById(id: string): Promise<string> {
    const user = await UserDao.findByPk(id);
    await user.destroy();
    return user.getDataValue('id');
  }
}

export default new UserRepository();
