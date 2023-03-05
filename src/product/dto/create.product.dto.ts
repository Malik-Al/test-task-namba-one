import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({example: 'laptop', description: 'Название товара'})  
    readonly name: string;

    @ApiProperty({example: '80 236', description: 'Цена товара'})  
    readonly price: number;
}
