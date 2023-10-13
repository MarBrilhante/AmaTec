import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StockModel } from './model/stock.model';
import { FindOptions } from 'sequelize';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockModel)
    private readonly stockModel: typeof StockModel,
  ) {}
  async create(createStockDto: CreateStockDto) {
    try {
      return await this.stockModel.create(createStockDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const { count, rows } = await this.stockModel.findAndCountAll({
        include: { all: true, nested: true },
      });
      return {
        total: count,
        items: rows,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.findOptios({
        where: { id },
        include: { all: true, nested: true },
      });
      if (!result)
        throw new HttpException(
          `Estoque de id ${id} não encontrado`,
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  findOptios(options: FindOptions) {
    try {
      return this.stockModel.findOne(options);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    try {
      await this.findOne(id);
      return this.stockModel.update(updateStockDto, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return this.stockModel.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
