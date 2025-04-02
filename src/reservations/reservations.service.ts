/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationsService {
    constructor(private prisma: PrismaService) {}

    async getAllReservations() {
        return this.prisma.reservation.findMany();
    }

    async createReservation(data: Prisma.ReservationCreateInput) {
        return this.prisma.reservation.create({ data });
    }
}
