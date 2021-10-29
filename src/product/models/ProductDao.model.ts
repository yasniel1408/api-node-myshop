import {
  Column,
  Model,
  Table,
  CreatedAt,
  IsUrl,
  IsUUID,
  PrimaryKey,
  Unique,
  AllowNull,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import CategoryDao from '../../category/models/categoryDao.model';
import ShoppingDao from '../../shopping/models/shoppingDao.model';

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

  @BelongsTo(() => CategoryDao, 'categoryId')
  category: CategoryDao;
}

export default ProductDao;
