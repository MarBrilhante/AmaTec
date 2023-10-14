import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductModel } from 'src/products/model/product.model';

@Table({
  tableName: 'Transaction',
  timestamps: false,
})
export class TransactionModel extends Model<TransactionModel> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  type: string;

  @ForeignKey(() => ProductModel)
  @Column
  serialProduct: string;

  @Column
  qtd: number;

  @BelongsTo(() => ProductModel)
  product: ProductModel;
}
