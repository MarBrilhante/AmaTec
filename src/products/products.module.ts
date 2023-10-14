import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { StockService } from 'src/stock/stock.service';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel]), StockModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
