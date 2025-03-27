/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async getAllRestaurants() {
    return this.prisma.restaurant.findMany();
  }

  async createRestaurant(data: Prisma.RestaurantCreateInput) {
    return this.prisma.restaurant.create({ data });
  }
}
