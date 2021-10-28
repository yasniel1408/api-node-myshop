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
import ProductDao from '../../product/models/ProductDao.model';
import UserDao from '../../user/models/UserDao.model';

@Table({
  tableName: 'shopping'
})
class ShoppingDao extends Model {
  @AllowNull(false)
  @Column
  paymentType: string;

  @CreatedAt
  createdAt: Date;

  @ForeignKey(() => ProductDao)
  @PrimaryKey
  @Column
  productId: number;

  @BelongsTo(() => ProductDao, 'productId')
  product: ProductDao;

  @ForeignKey(() => UserDao)
  @PrimaryKey
  @Column
  userId: number;

  @BelongsTo(() => UserDao, 'userId')
  user: UserDao;
}

export default ShoppingDao;
