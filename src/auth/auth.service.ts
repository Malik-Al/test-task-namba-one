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
        const candidate = await this.userService.getUserByLogin(userDto.login)
        if(candidate){
          throw new HttpException('Пользователь с таким login существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 10)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
      }


    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    private generateToken(user: User) {
        const payload = {id: user.id, login: user.login}
        return {
          token: this.jwtService.sign(payload)
        }    
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.loginGetUserByLogin(userDto.login)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals){
          return user
        }
        throw new UnauthorizedException({message: 'Неккоректный пароль'})
      }
      
}
