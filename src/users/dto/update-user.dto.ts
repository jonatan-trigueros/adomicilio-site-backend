/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';


export class UpdateUserDto {
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
    profilePic?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    favoriteFood?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    badges?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    role?: string;
}