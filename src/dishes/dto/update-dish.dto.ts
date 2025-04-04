/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class UpdateDishDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    preparationTime?: number;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ingredients?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    gallery?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
