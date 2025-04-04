/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { DeliveryPersonsService } from './delivery-persons.service';
import { CreateDeliveryPersonDto } from './dto/create-deliveryPerson.dto';
import { UpdateDeliveryPersonDto } from './dto/update-deliveryPerson.dto';

@Controller('delivery-persons')
export class DeliveryPersonsController {
    constructor(private readonly deliveryPersonsService: DeliveryPersonsService) {}

    // Obtener todos los repartidores con paginación y búsqueda
    @Get()
    async getAllDeliveryPersons(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string
    ) {
        return this.deliveryPersonsService.getAllDeliveryPersons(skip, take, search);
    }

    // Obtener un repartidor por ID
    @Get(':id')
    async getDeliveryPersonById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.deliveryPersonsService.getDeliveryPersonById(id);
        } catch (error) {
            throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
        }
    }

    // Crear un nuevo repartidor
    @Post()
    async createDeliveryPerson(@Body() createDeliveryPersonDto: CreateDeliveryPersonDto) {
        const deliveryPersonData = {
            ...createDeliveryPersonDto,
            user: { connect: { id: createDeliveryPersonDto.userId } },
        };
        return this.deliveryPersonsService.createDeliveryPerson(deliveryPersonData);
    }

    // Actualizar un repartidor
    @Put(':id')
    async updateDeliveryPerson(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDeliveryPersonDto: UpdateDeliveryPersonDto
    ) {
        return this.deliveryPersonsService.updateDeliveryPerson(id, updateDeliveryPersonDto);
    }

    // Eliminar un repartidor
    @Delete(':id')
    async deleteDeliveryPerson(@Param('id', ParseIntPipe) id: number) {
        return this.deliveryPersonsService.deleteDeliveryPerson(id);
    }

    // Desactivar un repartidor
    @Put(':id/deactivate')
    async deactivateDeliveryPerson(@Param('id', ParseIntPipe) id: number) {
        return this.deliveryPersonsService.deactivateDeliveryPerson(id);
    }
}
