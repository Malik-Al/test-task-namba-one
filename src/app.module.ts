import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

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
    UserModule,
    AuthModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
