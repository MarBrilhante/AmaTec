import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { FindOptions, Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const { name } = createProductDto;
      const hasExist = await this.findOptios({
        where: { name: { [Op.iLike]: name } },
      });
      if (hasExist)
        throw new HttpException(
          `Produto ${name} já cadastrado`,
          HttpStatus.BAD_REQUEST,
        );
      return await this.productModel.create(createProductDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const { count, rows } = await this.productModel.findAndCountAll();
      return {
        total: count,
        items: rows,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(serial: string) {
    try {
      const result = await this.findOptios({
        where: { serial },
      });
      if (!result)
        throw new HttpException(
          `Produto de serial ${serial} não encontrado`,
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      throw error;
    }
  }

  findOptios(options: FindOptions) {
    try {
      return this.productModel.findOne(options);
    } catch (error) {
      throw error;
    }
  }

  async update(serial: string, updateProductDto: UpdateProductDto) {
    try {
      await this.findOne(serial);
      const hasExist = await this.findOptios({
        where: { name: { [Op.iLike]: updateProductDto.name } },
      });
      if (hasExist && hasExist.serial != serial)
        throw new HttpException(
          `Produto ${updateProductDto.name} já cadastrado`,
          HttpStatus.BAD_REQUEST,
        );
      return this.productModel.update(updateProductDto, { where: { serial } });
    } catch (error) {
      throw error;
    }
  }

  async remove(serial: string) {
    try {
      await this.findOne(serial);
      return this.productModel.destroy({ where: { serial } });
    } catch (error) {
      throw error;
    }
  }
}
