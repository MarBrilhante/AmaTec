import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
