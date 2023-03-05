import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entity/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async registration(userDto: CreateUserDto){
      try {
        const candidate = await this.userService.getUserByLogin(userDto.login)
        if(candidate){
          throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
      } catch (error) {
        throw error
        }
      }


    async login(userDto: CreateUserDto) {
      try {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
      } catch (error) {
        throw error
      }
    }


    private generateToken(user: User) {
      try {
        const payload = {id: user.id, login: user.login}
        return {
          token: this.jwtService.sign(payload)
        }    
      } catch (error) {
        throw error
      }
    }

    private async validateUser(userDto: CreateUserDto) {
      try {
        const user = await this.userService.loginGetUserByLogin(userDto.login)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals){
          return user
        }
        throw new UnauthorizedException({message: 'Неккоректный пароль'})
        
      } catch (error) {
        throw error
        }
      }
      
}
