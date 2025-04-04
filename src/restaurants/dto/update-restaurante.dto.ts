/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsBoolean, IsArray, IsNumber, IsEmail, IsPositive, Min, Max } from 'class-validator';


export class UpdateRestaurantDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    coverPhoto?: string;

    @IsOptional()
    @IsString()
    breadcrumb?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    avgCostPerPerson?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @IsOptional()
    @IsBoolean()
    hasDelivery?: boolean;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    cuisine?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    role?: string;
}