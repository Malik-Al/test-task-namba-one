import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    create(@Body() dto: CreateProductDto) {
      return this.productService.productCreate(dto)
    }

    @Get()
    getAll() {
      return this.productService.productAll();
    }
  
}
