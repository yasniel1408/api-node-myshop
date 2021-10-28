import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import ProductDao from '../../product/models/ProductDao.model';

@Table({
  tableName: 'category'
})
class CategoryDao extends Model {
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

  @HasMany(() => ProductDao)
  products: ProductDao[];
}

export default CategoryDao;
