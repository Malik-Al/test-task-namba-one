import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async productCreate(dto: CreateProductDto): Promise<Product> {
        const product = await this.productRepository.create(dto);
        return await this.productRepository.save(product)
    }

    async productAll(): Promise<Product[]> {
        const products = await this.productRepository.find();
        return products
      }
}
