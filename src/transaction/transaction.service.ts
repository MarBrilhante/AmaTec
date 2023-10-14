import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { RequestTransactionDto } from './dto/request-transaction.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from './model/transaction.model';
import { Sequelize } from 'sequelize';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionModel)
    private readonly transactionModel: typeof TransactionModel,
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize,
    private stockService: StockService,
  ) {}

  async request(request: RequestTransactionDto) {
    try {
      const { type, qtd, serialProduct } = request;

      return serialProduct.map(async (serial, index) => {
        const create: CreateTransactionDto = {
          serialProduct: serial,
          qtd: qtd[index],
          type,
        };
        await this.stockSum(serial, qtd, index, type);

        return await this.create(create);
      });
    } catch (error) {
      throw error;
    }
  }

  async stockSum(serial: string, qtd: number[], index: number, type: string) {
    const stock = await this.stockService.findOptios({
      where: { serialProduct: serial },
    });
    let sum = stock.qtd + qtd[index];
    if (type == 'saida') sum = stock.qtd - qtd[index];
    await this.stockService.update(serial, {
      qtd: sum,
      serialProduct: serial,
    });
  }

  async create(create: CreateTransactionDto) {
    try {
      return await this.transactionModel.create(create);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
    } catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
