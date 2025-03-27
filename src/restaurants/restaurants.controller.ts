/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Prisma } from '@prisma/client';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  getAllRestaurants() {
    return this.restaurantsService.getAllRestaurants();
  }

  @Post()
  createRestaurant(@Body() data: Prisma.RestaurantCreateInput) {
    return this.restaurantsService.createRestaurant(data);
  }
}
