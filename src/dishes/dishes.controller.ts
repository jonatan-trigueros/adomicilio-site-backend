/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // Obtener todos los platillos con paginación y búsqueda
  @Get()
  async getAllDishes(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string
  ) {
    return this.dishesService.getAllDishes(skip, take, search);
  }

  // Obtener un platillo por ID
  @Get(':id')
  async getDishById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.dishesService.getDishById(id);
    } catch (error) {
      throw new NotFoundException(`Platillo con ID ${id} no encontrado`);
    }
  }

  // Crear un nuevo platillo
  @Post()
  async createDish(@Body() createDishDto: CreateDishDto) {
    return this.dishesService.createDish(createDishDto);
  }

  // Actualizar un platillo
  @Put(':id')
  async updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDishDto: UpdateDishDto
  ) {
    return this.dishesService.updateDish(id, updateDishDto);
  }

  // Eliminar un platillo
  @Delete(':id')
  async deleteDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.deleteDish(id);
  }

  // Desactivar un platillo
  @Put(':id/deactivate')
  async deactivateDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.deactivateDish(id);
  }
}
