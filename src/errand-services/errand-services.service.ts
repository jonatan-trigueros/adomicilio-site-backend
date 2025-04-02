/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ErrandServicesService {
    constructor(private prisma: PrismaService) {}

    async getAllErrandServices() {
        return this.prisma.errandService.findMany();
    }

    async createErrandService(data: Prisma.ErrandServiceCreateInput) {
        return this.prisma.errandService.create({ data });
    }
}
