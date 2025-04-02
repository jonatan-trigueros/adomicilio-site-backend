/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DeliveryPersonsService {
    constructor(private prisma: PrismaService) {}

    async getAllDeliveryPersons() {
        return this.prisma.deliveryPerson.findMany();
    }

    async createDeliveryPerson(data: Prisma.DeliveryPersonCreateInput) {
        return this.prisma.deliveryPerson.create({ data });
    }
}
