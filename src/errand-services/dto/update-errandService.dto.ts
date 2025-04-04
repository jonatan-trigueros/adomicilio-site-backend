/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsEmail, IsBoolean, IsNumber, Min, Max } from 'class-validator';


export class UpdateErrandServiceDto {
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
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    role?: string;
}