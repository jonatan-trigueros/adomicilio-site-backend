/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class UpdateDeliveryPersonDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    schedule?: string[];

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsNumber()
    restaurantId?: number;
}
