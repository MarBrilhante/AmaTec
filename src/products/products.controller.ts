import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':serial')
  findOne(@Param('serial') serial: string) {
    return this.productsService.findOne(serial);
  }

  @Patch(':serial')
  update(
    @Param('serial') serial: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(serial, updateProductDto);
  }

  @Delete(':serial')
  remove(@Param('serial') serial: string) {
    return this.productsService.remove(serial);
  }
}
