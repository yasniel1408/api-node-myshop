import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  PrimaryKey,
  IsUUID,
  Length,
  NotNull,
  IsEmail,
  Unique,
  IsNull,
  AllowNull
} from 'sequelize-typescript';
import ShoppingDao from '../../shopping/models/ShoppingDao.model';

@Table({
  tableName: 'user'
})
class UserDao extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
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

  @CreatedAt
  createdAt: Date;

  @HasMany(() => ShoppingDao, 'userId')
  hobbies: ShoppingDao[];
}

export default UserDao;
