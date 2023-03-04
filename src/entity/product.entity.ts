import { ApiProperty } from '@nestjs/swagger';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Product {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'laptop', description: 'Название товара'})  
  @Column()
  name: string;

  @ApiProperty({example: '80 236', description: 'Цена товара'})  
  @Column()
  price: number;

  @ApiProperty({example: 'true', description: 'Есть в наличий товар или нет'})  
  @Column({ default: true })
  isActive: boolean;

}
