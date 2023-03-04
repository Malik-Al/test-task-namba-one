import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'admin', description: 'Логин'})  
    @IsString({message: 'Должна быть строкой'})
    readonly login: string;

    @ApiProperty({example: '123456', description: 'Пароль'})  
    @Length(6, 16,{message: 'Не меньше 6 и не больше 16'})
    readonly password: string;
}
