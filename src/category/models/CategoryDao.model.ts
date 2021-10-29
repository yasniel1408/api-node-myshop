import {
  Table,
  Column,
  Model,
  HasMany,
  IsUUID,
  PrimaryKey,
  NotNull,
  Unique,
  AllowNull
} from 'sequelize-typescript';
import ProductDao from '../../product/models/productDao.model';

@Table({
  tableName: 'category'
})
class CategoryDao extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @HasMany(() => ProductDao, 'categoryId')
  products: ProductDao[];
}

export default CategoryDao;
