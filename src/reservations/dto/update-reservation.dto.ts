/* eslint-disable prettier/prettier */
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateReservationDto {
    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @IsInt()
    restaurantId?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsDateString()
    time?: string;

    @IsOptional()
    @IsString()
    table?: string;

    @IsOptional()
    @IsInt()
    peopleCount?: number;

    @IsOptional()
    @IsString()
    area?: string;

    @IsOptional()
    @IsString()
    specialRequests?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    guests?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}