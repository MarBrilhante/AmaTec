import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeDatabase } from './database/sequelize.options';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({ dialect: 'postgres', ...SequelizeDatabase }),
    ProductsModule,
    StockModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
