import {
  Column,
  Model,
  Table,
  HasMany,
  CreatedAt,
  ForeignKey,
  IsUrl,
  IsUUID,
  PrimaryKey,
  Unique,
  IsNull,
  AllowNull,
  BelongsTo
} from 'sequelize-typescript';
import CategoryDao from '../../category/models/categoryDao.model';
import ShoppingDao from '../../shopping/models/ShoppingDao.model';

@Table({
  tableName: 'product'
})
class ProductDao extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @IsUrl
  @AllowNull
  @Column
  photo: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  amount: number;

  @Column
  description: string;

  @CreatedAt
  createdAt: Date;

  @HasMany(() => ShoppingDao, 'productId')
  shoppings: ShoppingDao[];

  // @ForeignKey(() => CategoryDao)
  // @Column
  // categoryId: number;
  @BelongsTo(() => CategoryDao, 'categoryId')
  category: CategoryDao;
}

export default ProductDao;
