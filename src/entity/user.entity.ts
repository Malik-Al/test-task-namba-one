import { ApiProperty } from '@nestjs/swagger';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class User {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})  
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'admin', description: 'Логин'})  
  @Column()
  login: string;

  @ApiProperty({example: '123456', description: 'Пароль'})  
  @Column()
  password: string;

}
