/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ErrandServicesService } from './errand-services.service';
import { Prisma } from '@prisma/client';

@Controller('errand-services')
export class ErrandServicesController {
    constructor(private readonly errandServicesService: ErrandServicesService) {}

    // Obtener todos los servicios de mandaditos con paginación y búsqueda
    @Get()
    async getAllErrandServices(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string
    ) {
        return this.errandServicesService.getAllErrandServices(skip, take, search);
    }

    // Obtener un servicio de mandaditos por ID
    @Get(':id')
    async getErrandServiceById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.errandServicesService.getErrandServiceById(id);
        } catch (error) {
            throw new NotFoundException(`Servicio de mandaditos con ID ${id} no encontrado`);
        }
    }

    // Crear un nuevo servicio de mandaditos
    @Post()
    async createErrandService(@Body() data: Prisma.ErrandServiceCreateInput) {
        return this.errandServicesService.createErrandService(data);
    }

    // Actualizar un servicio de mandaditos
    @Put(':id')
    async updateErrandService(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: Prisma.ErrandServiceUpdateInput
    ) {
        return this.errandServicesService.updateErrandService(id, data);
    }

    // Eliminar un servicio de mandaditos
    @Delete(':id')
    async deleteErrandService(@Param('id', ParseIntPipe) id: number) {
        return this.errandServicesService.deleteErrandService(id);
    }

    // Desactivar un servicio de mandaditos
    @Put(':id/deactivate')
    async deactivateErrandService(@Param('id', ParseIntPipe) id: number) {
        return this.errandServicesService.deactivateErrandService(id);
    }

    // Actualizar el rol de un servicio de mandaditos
    @Put(':id/role')
    async updateErrandServiceRole(
        @Param('id', ParseIntPipe) id: number,
        @Body('role') role: string
    ) {
        return this.errandServicesService.updateErrandServiceRole(id, role);
    }
}
