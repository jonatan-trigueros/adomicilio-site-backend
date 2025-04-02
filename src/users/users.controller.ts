/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Obtener todos los usuarios con paginación y búsqueda
    @Get()
    async getAllUsers(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string
    ) {
        return this.usersService.getAllUsers(skip, take, search);
    }

    // Obtener un usuario por ID
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.usersService.getUserById(id);
        } catch (error) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }

    // Crear un nuevo usuario
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    // Actualizar un usuario
    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    // Eliminar un usuario
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    // Desactivar un usuario
    @Put(':id/deactivate')
    async deactivateUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deactivateUser(id);
    }
}
