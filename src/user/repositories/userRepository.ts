import { PatchUserDto } from '../models/patchUserDto';
import Rol from '../../common/middleware/rol';
import { CRUDRepository } from '../../common/interfaces/crudRepository';
import { PutUserDto } from '../models/putUserDto';
import UserDao from '../models/userDao.model';

class UserRepository implements CRUDRepository {
  async findAll(limit: number, page: number): Promise<any> {
    return UserDao.findAndCountAll({ limit, offset: page, include: [{ all: true, nested: true }] });
  }

  async create(resource: any): Promise<any> {
    const user = new UserDao({
      ...resource,
      rol: Rol.AUTHENTICATE
    });
    await user.save();
    return user.getDataValue('id');
  }

  async editById(id: string, resource: PutUserDto | PatchUserDto): Promise<any> {
    const user = await UserDao.findByPk(id);
    user.setAttributes(resource);
    await user.save();
    return user.getDataValue('id');
  }

  async getById(id: string): Promise<any> {
    const user = await UserDao.findByPk(id);
    return user;
  }

  async deleteById(id: string): Promise<any> {
    const user = await UserDao.findByPk(id);
    await user.destroy();
    return user.getDataValue('id');
  }

  async getByEmail(email: string): Promise<any> {
    const user = await UserDao.findOne({
      where: { email }
    });
    return user;
  }
}

export default new UserRepository();
