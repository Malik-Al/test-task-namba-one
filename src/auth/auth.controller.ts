import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @ApiOperation({summary: 'login'})
    @ApiResponse({status: 200, type: User})
    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'registration'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

}
