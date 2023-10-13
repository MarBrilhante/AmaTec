import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockModel } from './model/stock.model';

@Module({
  imports: [SequelizeModule.forFeature([StockModel])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
