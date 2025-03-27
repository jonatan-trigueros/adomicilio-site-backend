/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Prisma } from '@prisma/client';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  getAllDishes() {
    return this.dishesService.getAllDishes();
  }

  @Post()
  createDish(@Body() data: Prisma.DishCreateInput) {
    return this.dishesService.createDish (data);
  }
}
