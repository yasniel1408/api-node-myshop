import {
  Table,
  Column,
  Model,
  HasMany,
  IsUUID,
  PrimaryKey,
  Unique,
  AllowNull,
  DataType
} from 'sequelize-typescript';
import ProductDao from '../../product/models/productDao.model';

@Table({
  tableName: 'category'
})
class CategoryDao extends Model {
  @PrimaryKey
  @Column({
    type: DataType.STRING(50),
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @HasMany(() => ProductDao, 'categoryId')
  products: ProductDao[];
}

export default CategoryDao;
