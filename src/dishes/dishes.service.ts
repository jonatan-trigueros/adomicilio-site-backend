/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  async getAllDishes() {
    return this.prisma.dish.findMany();
  }

  async createDish(data: Prisma.DishCreateInput) {
    return this.prisma.dish.create({ data });
  }
}
