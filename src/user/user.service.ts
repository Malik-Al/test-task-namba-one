import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createUser(dto: CreateUserDto): Promise<User>{
      try {
        const user = await this.userRepository.create(dto)
        if(!user.login || !user.password){
          throw new HttpException('login и password Обязательны!', HttpStatus.BAD_REQUEST)
        }
        return await this.userRepository.save(user)
        
      } catch (error) {
        throw error
        }
      }


      async getUserByLogin(login: string) {
        try {
          const user = await this.userRepository.findOne({ where: {login}})
          return user;
        } catch (error) {
          throw error
        }
    }  


    async loginGetUserByLogin(login: string){
      try {
        const user = await this.userRepository.findOne({ where: {login}})
        if(!user){
          throw new HttpException('Не корректный login', HttpStatus.BAD_REQUEST)
        }
        return user
        
      } catch (error) {
        throw error
        }
      }
      
}
