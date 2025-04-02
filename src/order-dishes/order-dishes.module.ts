import { Module } from '@nestjs/common';
import { OrderDishesController } from './order-dishes.controller';
import { OrderDishesService } from './order-dishes.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OrderDishesController],
  providers: [OrderDishesService, PrismaService],
})
export class OrderDishesModule {}
