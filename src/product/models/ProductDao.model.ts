import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  CreatedAt,
  ForeignKey
} from 'sequelize-typescript';
import CategoryDao from '../../category/models/CategoryDao.model';
import ShoppingDao from '../../shopping/models/ShoppingDao.model';

@Table({
  tableName: 'product'
})
class ProductDao extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required!'
      }
    }
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  photo: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Price is required!'
      }
    }
  })
  price: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Amount is required!'
      }
    }
  })
  amount: string;

  @Column({
    type: DataType.TEXT
  })
  description: string;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => ShoppingDao)
  shoppings: ShoppingDao[];

  @ForeignKey(() => CategoryDao)
  @Column
  categoryId: number;
}

export default ProductDao;
