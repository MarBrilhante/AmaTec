import {
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { ProductModel } from 'src/products/model/product.model';

@Table({
  tableName: 'Stock',
  timestamps: false,
})
export class StockModel extends Model<StockModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => ProductModel)
  @Column
  serialProduct: string;

  @Column
  qtd: number;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
