/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Prisma } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    // Obtener todas las reservaciones con paginación y búsqueda
    @Get()
    async getAllReservations(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string
    ) {
        return this.reservationsService.getAllReservations(skip, take, search);
    }

    // Obtener una reservación por ID
    @Get(':id')
    async getReservationById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.reservationsService.getReservationById(id);
        } catch (error) {
            throw new NotFoundException(`Reservación con ID ${id} no encontrada`);
        }
    }

    // Crear una nueva reservación
    @Post()
    async createReservation(@Body() createReservationDto: Prisma.ReservationCreateInput) {
        return this.reservationsService.createReservation(createReservationDto);
    }

    // Actualizar una reservación
    @Put(':id')
    async updateReservation(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateReservationDto: Prisma.ReservationUpdateInput
    ) {
        return this.reservationsService.updateReservation(id, updateReservationDto);
    }

    // Eliminar una reservación
    @Delete(':id')
    async deleteReservation(@Param('id', ParseIntPipe) id: number) {
        return this.reservationsService.deleteReservation(id);
    }

    // Desactivar una reservación
    @Put(':id/deactivate')
    async deactivateReservation(@Param('id', ParseIntPipe) id: number) {
        return this.reservationsService.deactivateReservation(id);
    }
}
