import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  ForeignKey,
  PrimaryKey
} from 'sequelize-typescript';
import ProductDao from '../../product/models/ProductDao.model';
import UserDao from '../../user/models/UserDao.model';

@Table({
  tableName: 'shopping'
})
class ShoppingDao extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'paymentType is required!'
      }
    }
  })
  paymentType: string;

  @CreatedAt
  createdAt: Date;

  @ForeignKey(() => ProductDao)
  @PrimaryKey
  @Column
  productId: number;

  @ForeignKey(() => UserDao)
  @PrimaryKey
  @Column
  userId: number;
}

export default ShoppingDao;
