/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderDishesService {
    constructor(private prisma: PrismaService) {}

    async getAllOrderDishes() {
        return this.prisma.orderDish.findMany();
    }

    async createOrderDish(data: Prisma.OrderDishCreateInput) {
        return this.prisma.orderDish.create({ data });
    }
}
