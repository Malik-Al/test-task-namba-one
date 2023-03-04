import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Product } from 'src/entity/product.entity';
import { UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @ApiOperation({summary: 'create product'})
    @ApiResponse({status: 201, type: Product})
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() dto: CreateProductDto) {
      const product = await this.productService.createProduct(dto);
      return product 
      ? {success: true, message: 'Успешно создался product'} 
      : {success: false, message: 'Не получилось создать продукт'}
    }
    

    @ApiOperation({summary: 'find all products'})
    @ApiResponse({status: 200, type: [Product]})
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
      const products = await this.productService.getAllProduct();
      return {success: true, data: products}
    }


    @ApiOperation({summary: 'find one product'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id') id: number) {
      const product = await this.productService.getOneProduct(id);
      return product 
      ? {success: true, data: product} 
      : {success: false, message: 'Не получилось найти product'}
    }


    @ApiOperation({summary: 'update product'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() product: Product
        ): Promise<Observable<UpdateResult>> {
            const result = await this.productService.updateProduct(id, product);
            return result
        }
    
        
    @ApiOperation({summary: 'delete product'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        const product = await this.productService.deleteProduct(id);
        return product 
        ? {success: true, message: `Успешно удален product c id: ${id}`} 
        : {success: false, message: `Не получилось удалить product c id: ${id}`}
    }
    
  
}
