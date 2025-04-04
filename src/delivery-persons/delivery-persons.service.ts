/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DeliveryPersonsService {
    constructor(private prisma: PrismaService) {}

    // Obtener todos los repartidores con paginación y búsqueda
    async getAllDeliveryPersons(skip = 0, take = 10, search?: string) {
        return this.prisma.deliveryPerson.findMany({
            skip,
            take,
            where: search
                ? { name: { contains: search, mode: 'insensitive' } }
                : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }

    // Contar la cantidad total de repartidores
    async countDeliveryPersons() {
        return this.prisma.deliveryPerson.count();
    }

    // Obtener un repartidor por ID con manejo de error si no existe
    async getDeliveryPersonById(id: number) {
        return this.prisma.deliveryPerson.findUniqueOrThrow({
            where: { id },
        });
    }

    // Crear un repartidor con verificación de email y cifrado de contraseña
    async createDeliveryPerson(data: Prisma.DeliveryPersonCreateInput) {
        const existingDeliveryPerson = await this.prisma.deliveryPerson.findUnique({
            where: { email: data.email },
        });
        if (existingDeliveryPerson) {
            throw new Error('El correo ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.deliveryPerson.create({
            data: { ...data, password: hashedPassword },
        });
    }

    // Actualizar un repartidor por ID con validación
    async updateDeliveryPerson(id: number, data: Prisma.DeliveryPersonUpdateInput) {
        try {
            return await this.prisma.deliveryPerson.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
        }
    }

    // Actualizar la contraseña de un repartidor
    async updatePassword(id: number, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.deliveryPerson.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }

    // Eliminar un repartidor por ID con validación
    async deleteDeliveryPerson(id: number) {
        try {
            return await this.prisma.deliveryPerson.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Repartidor con ID ${id} no encontrado`);
        }
    }

    // Desactivar un repartidor en lugar de eliminarlo
    async deactivateDeliveryPerson(id: number) {
        return this.prisma.deliveryPerson.update({
            where: { id },
            data: { isActive: false },
        });
    }

    // Actualizar el rol de un repartidor
    async updateDeliveryPersonRole(id: number, role: string) {
        return this.prisma.deliveryPerson.update({
            where: { id },
            data: { role },
        });
    }
}
