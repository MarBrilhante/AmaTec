import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stockService.findOne(+id);
  }

  @Patch(':serial')
  update(
    @Param('serial') serial: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(serial, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stockService.remove(+id);
  }
}
