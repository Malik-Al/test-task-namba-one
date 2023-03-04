import { IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Должна быть строкой'})
    readonly login: string;

    @Length(6, 16,{message: 'Не меньше 6 и не больше 16'})
    readonly password: string;
}
