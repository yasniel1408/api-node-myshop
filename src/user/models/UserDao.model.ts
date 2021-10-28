import { Table, Column, Model, HasMany, DataType, CreatedAt } from 'sequelize-typescript';
import ShoppingDao from '../../shopping/models/ShoppingDao.model';

@Table({
  tableName: 'user'
})
class UserDao extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: 'Email is required!'
      },
      isEmail: {
        msg: 'Email is not correct!'
      }
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      min: 6,
      max: 50,
      notNull: {
        msg: 'Password is required!'
      }
    }
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Rol is required!'
      }
    }
  })
  rol: string;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => ShoppingDao)
  hobbies: ShoppingDao[];
}

export default UserDao;
