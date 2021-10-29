import {
  Table,
  Column,
  Model,
  CreatedAt,
  BelongsTo,
  AllowNull,
  PrimaryKey,
  ForeignKey
} from 'sequelize-typescript';
import ProductDao from '../../product/models/productDao.model';
import UserDao from '../../user/models/userDao.model';

@Table({
  tableName: 'shopping'
})
class ShoppingDao extends Model {
  @ForeignKey(() => ProductDao)
  @PrimaryKey
  @Column
  productId: number;

  @ForeignKey(() => UserDao)
  @PrimaryKey
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  paymentType: string;

  @CreatedAt
  createdAt: Date;

  @BelongsTo(() => ProductDao, 'productId')
  product: ProductDao;

  @BelongsTo(() => UserDao, 'userId')
  user: UserDao;
}

export default ShoppingDao;
