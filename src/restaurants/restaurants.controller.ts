/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurante.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // Obtener todos los restaurantes con paginación y búsqueda
  @Get()
  async getAllRestaurants(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('search') search?: string
  ) {
    return this.restaurantsService.getAllRestaurants(skip, take, search);
  }

  // Obtener un restaurante por ID
  @Get(':id')
  async getRestaurantById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.restaurantsService.getRestaurantById(id);
    } catch (error) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }
  }

  // Crear un nuevo restaurante
  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.createRestaurant(createRestaurantDto);
  }

  // Actualizar un restaurante
  @Put(':id')
  async updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto
  ) {
    return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
  }

  // Eliminar un restaurante
  @Delete(':id')
  async deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.deleteRestaurant(id);
  }

  // Desactivar un restaurante
  @Put(':id/deactivate')
  async deactivateRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.deactivateRestaurant(id);
  }

  // Actualizar el rol de un restaurante
  @Put(':id/role')
  async updateRestaurantRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: string
  ) {
    return this.restaurantsService.updateRestaurantRole(id, role);
  }
}
