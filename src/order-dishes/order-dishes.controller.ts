/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderDishesService } from './order-dishes.service';
import { Prisma } from '@prisma/client';

@Controller('order-dishes')
export class OrderDishesController {
    constructor(private readonly orderDishesService: OrderDishesService) {}

    @Get()
    getAllOrderDishes() {
        return this.orderDishesService.getAllOrderDishes();
    }

    @Post()
    createOrderDish(@Body() data: Prisma.OrderDishCreateInput) {
        return this.orderDishesService.createOrderDish(data);
    }
}
