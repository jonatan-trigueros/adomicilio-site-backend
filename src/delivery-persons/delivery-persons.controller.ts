/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DeliveryPersonsService } from './delivery-persons.service';
import { Prisma } from '@prisma/client';

@Controller('delivery-persons')
export class DeliveryPersonsController {
    constructor(private readonly deliveryPersonsService: DeliveryPersonsService) {}

    @Get()
    getAllDeliveryPersons() {
        return this.deliveryPersonsService.getAllDeliveryPersons();
    }

    @Post()
    createDeliveryPerson(@Body() data: Prisma.DeliveryPersonCreateInput) {
        return this.deliveryPersonsService.createDeliveryPerson(data);
    }
}
