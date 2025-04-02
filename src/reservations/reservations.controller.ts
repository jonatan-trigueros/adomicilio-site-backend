/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Prisma } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Get()
    getAllReservations() {
        return this.reservationsService.getAllReservations();
    }

    @Post()
    createReservation(@Body() data: Prisma.ReservationCreateInput) {
        return this.reservationsService.createReservation(data);
    }
}
