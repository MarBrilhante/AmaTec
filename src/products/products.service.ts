import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './model/product.model';
import { FindOptions, Op, Sequelize } from 'sequelize';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: typeof ProductModel,
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize,
    private stockService: StockService,
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
      const data = [
        {
          serial: '765489765',
          name: 'arroz',
          description: 'arroz 100% integral',
          price: 3.99,
        },
        {
          serial: '876543126',
          name: 'feijão',
          description: 'feijão do gostinho brasileiro',
          price: 4.99,
        },
        {
          serial: '897654321',
          name: 'coca-cola',
          description: 'refrigerante de cola de 200mL',
          price: 1.99,
        },
        {
          serial: '217654839',
          name: 'nescau',
          description: 'achocolato em pó de 390g',
          price: 7.99,
        },
        {
          serial: '698765463',
          name: 'café',
          description: 'café em pó do brasileiro',
          price: 5.99,
        },
      ];
      const result = await this.productModel.findAll();
      console.log(result);
      if (!result.length) {
        data.map(async (element) => {
          await this.create(element);
          await this.stockService.create({
            qtd: 2,
            serialProduct: element.serial,
          });
        });
      }

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
