import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Product } from 'src/entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    async createProduct(dto: CreateProductDto): Promise<Product> {
        try {
            const product = await this.productRepository.create(dto);
            return await this.productRepository.save(product)
        } catch (error) {
            throw error
        }
    }

    async getAllProduct(): Promise<Product[]> {
        try {
            const products = await this.productRepository.find();
            return products
        } catch (error) {
            throw error
        }
    }

    async getOneProduct(id: number): Promise<Product> {
        try {
            return await this.productRepository.findOneBy({id});
        } catch (error) {
            throw error
        }
    }

    async updateProduct(id: number, product: UpdateProductDto): Promise<Observable<UpdateResult>> {
        try {
            const result = from( this.productRepository.update(id, {...product}))
            return result
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id: number) {
        try {
            const deleteUser = await this.productRepository.delete(id);
            return deleteUser.affected;
        } catch (error) {
            throw error
        }
      }
    
}
