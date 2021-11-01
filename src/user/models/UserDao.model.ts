import {
  Table,
  Column,
  Model,
  CreatedAt,
  PrimaryKey,
  IsUUID,
  Length,
  IsEmail,
  Unique,
  AllowNull,
  HasMany,
  DataType
} from 'sequelize-typescript';
import ShoppingDao from '../../shopping/models/shoppingDao.model';

@Table({
  tableName: 'user'
})
class UserDao extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(50),
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @IsEmail
  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @Length({ min: 6, max: 50 })
  @AllowNull(false)
  @Column
  password: string;

  @AllowNull
  @Column
  firstName: string;

  @AllowNull
  @Column
  lastName: string;

  @AllowNull
  @Column
  avatar: string;

  @AllowNull(false)
  @Column
  rol: string;

  @HasMany(() => ShoppingDao, 'userId')
  shoppings: ShoppingDao[];
}

export default UserDao;
