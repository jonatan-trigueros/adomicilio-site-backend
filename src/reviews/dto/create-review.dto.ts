/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString, IsArray, IsNumber, IsDateString } from 'class-validator';

export class CreateReviewDto {
    @IsInt()
    userId: number;

    @IsOptional()
    @IsInt()
    restaurantId?: number;

    @IsOptional()
    @IsInt()
    dishId?: number;

    @IsOptional()
    @IsInt()
    deliveryPersonId?: number;

    @IsOptional()
    @IsInt()
    errandServiceId?: number;

    @IsNumber()
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsDateString()
    createdAt?: string;
}