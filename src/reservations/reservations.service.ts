/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReservationsService {
    constructor(private prisma: PrismaService) {}

    // Obtener todas las reservaciones con paginación y búsqueda
    async getAllReservations(skip = 0, take = 10, search?: string) {
        return this.prisma.reservation.findMany({
            skip,
            take,
            where: search
                ? { title: { contains: search, mode: 'insensitive' } }
                : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }

    // Contar la cantidad total de reservaciones
    async countReservations() {
        return this.prisma.reservation.count();
    }

    // Obtener una reservación por ID con manejo de error si no existe
    async getReservationById(id: number) {
        return this.prisma.reservation.findUniqueOrThrow({
            where: { id },
        });
    }

    // Crear una reservación con validación de usuario y restaurante
    async createReservation(data: Prisma.ReservationCreateInput) {
        return this.prisma.reservation.create({
            data,
        });
    }

    // Actualizar una reservación por ID con validación
    async updateReservation(id: number, data: Prisma.ReservationUpdateInput) {
        try {
            return await this.prisma.reservation.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Reservación con ID ${id} no encontrada`);
        }
    }

    // Eliminar una reservación por ID con validación
    async deleteReservation(id: number) {
        try {
            return await this.prisma.reservation.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Reservación con ID ${id} no encontrada`);
        }
    }

    // Desactivar una reservación en lugar de eliminarla
    async deactivateReservation(id: number) {
        return this.prisma.reservation.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
