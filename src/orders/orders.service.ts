/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) {}

    async getAllOrders() {
        return this.prisma.order.findMany();
    }

    async createOrder(data: Prisma.OrderCreateInput) {
        return this.prisma.order.create({ data });
    }
}
