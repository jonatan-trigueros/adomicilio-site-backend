/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ErrandServicesService {
    constructor(private prisma: PrismaService) {}

    // Obtener todos los servicios de mandaditos con paginación y búsqueda
    async getAllErrandServices(skip = 0, take = 10, search?: string) {
        return this.prisma.errandService.findMany({
            skip,
            take,
            where: search
                ? { name: { contains: search, mode: 'insensitive' } }
                : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }

    // Contar la cantidad total de servicios de mandaditos
    async countErrandServices() {
        return this.prisma.errandService.count();
    }

    // Obtener un servicio de mandaditos por ID con manejo de error si no existe
    async getErrandServiceById(id: number) {
        return this.prisma.errandService.findUniqueOrThrow({
            where: { id },
        });
    }

    // Crear un servicio de mandaditos con verificación de email y cifrado de contraseña
    async createErrandService(data: Prisma.ErrandServiceCreateInput) {
        const existingService = await this.prisma.errandService.findUnique({
            where: { email: data.email },
        });
        if (existingService) {
            throw new Error('El correo ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.errandService.create({
            data: { ...data, password: hashedPassword },
        });
    }

    // Actualizar un servicio de mandaditos por ID con validación
    async updateErrandService(id: number, data: Prisma.ErrandServiceUpdateInput) {
        try {
            return await this.prisma.errandService.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Servicio de mandaditos con ID ${id} no encontrado`);
        }
    }

    // Actualizar la contraseña de un servicio de mandaditos
    async updatePassword(id: number, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.errandService.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }

    // Eliminar un servicio de mandaditos por ID con validación
    async deleteErrandService(id: number) {
        try {
            return await this.prisma.errandService.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Servicio de mandaditos con ID ${id} no encontrado`);
        }
    }

    // Desactivar un servicio de mandaditos en lugar de eliminarlo
    async deactivateErrandService(id: number) {
        return this.prisma.errandService.update({
            where: { id },
            data: { isActive: false },
        });
    }

    // Actualizar el rol de un servicio de mandaditos (si aplica)
    async updateErrandServiceRole(id: number, role: string) {
        return this.prisma.errandService.update({
            where: { id },
            data: { role },
        });
    }
}
