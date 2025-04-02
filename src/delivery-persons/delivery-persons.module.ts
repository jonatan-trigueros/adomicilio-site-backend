import { Module } from '@nestjs/common';
import { DeliveryPersonsController } from './delivery-persons.controller';
import { DeliveryPersonsService } from './delivery-persons.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeliveryPersonsController],
  providers: [DeliveryPersonsService, PrismaService],
})
export class DeliveryPersonsModule {}
