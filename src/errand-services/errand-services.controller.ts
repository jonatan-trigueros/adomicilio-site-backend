/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ErrandServicesService } from './errand-services.service';
import { Prisma } from '@prisma/client';

@Controller('errand-services')
export class ErrandServicesController {
    constructor(private readonly errandServicesService: ErrandServicesService) {}

    @Get()
    getAllErrandServices() {
        return this.errandServicesService.getAllErrandServices();
    }

    @Post()
    createErrandService(@Body() data: Prisma.ErrandServiceCreateInput) {
        return this.errandServicesService.createErrandService(data);
    }
}
