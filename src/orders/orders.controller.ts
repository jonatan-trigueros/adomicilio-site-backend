/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }

    @Post()
    createOrder(@Body() data: Prisma.OrderCreateInput) {
        return this.ordersService.createOrder(data);
    }
}
