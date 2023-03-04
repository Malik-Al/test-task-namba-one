import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Product } from 'src/entity/product.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    async create(@Body() dto: CreateProductDto) {
      const product = await this.productService.createProduct(dto);
      return product 
      ? {success: true, message: 'Успешно создался product'} 
      : {success: false, message: 'Не получилось создать продукт'}
    }

    @Get()
    async getAll() {
      const products = await this.productService.getAllProduct();
      return {success: true, data: products}
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
      const product = await this.productService.getOneProduct(id);
      return product 
      ? {success: true, data: product} 
      : {success: false, message: 'Не получилось найти product'}
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() product: Product
        ): Promise<Observable<UpdateResult>> {
            const result = await this.productService.updateProduct(id, product);
            return result
        }
  
}
