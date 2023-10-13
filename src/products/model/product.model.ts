import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Product',
  timestamps: false,
})
export class ProductModel extends Model<ProductModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.FLOAT })
  price: number;
}
