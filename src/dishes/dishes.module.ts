import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DishesController],
  providers: [DishesService, PrismaService],
})
export class DishesModule {}
