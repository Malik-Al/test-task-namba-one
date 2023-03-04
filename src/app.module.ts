import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
   }),
   TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRESS_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRESS_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [Product],
    synchronize: true,
  }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
