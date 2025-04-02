/* eslint-disable prettier/prettier */
import { IsInt, IsOptional } from 'class-validator';
export class CreateFavoriteDto {
    @IsInt()
    userId: number;

    @IsOptional()
    @IsInt()
    restaurantId?: number;

    @IsOptional()
    @IsInt()
    dishId?: number;
}