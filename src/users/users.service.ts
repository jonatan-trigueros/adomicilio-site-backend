/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Obtener todos los usuarios con paginación y búsqueda
    async getAllUsers(skip = 0, take = 10, search?: string) {
        return this.prisma.user.findMany({
            skip,
            take,
            where: search
                ? { name: { contains: search, mode: 'insensitive' } }
                : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }

    // Contar la cantidad total de usuarios
    async countUsers() {
        return this.prisma.user.count();
    }

    // Obtener un usuario por ID con manejo de error si no existe
    async getUserById(id: number) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
        });
    }

    // Crear un usuario con verificación de email y cifrado de contraseña
    async createUser(data: Prisma.UserCreateInput) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('El correo ya está en uso');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: { ...data, password: hashedPassword },
        });
    }

    // Actualizar un usuario por ID con validación
    async updateUser(id: number, data: Prisma.UserUpdateInput) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }

    // Actualizar la contraseña de un usuario
    async updatePassword(id: number, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }

    // Eliminar un usuario por ID con validación
    async deleteUser(id: number) {
        try {
            return await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
    }

    // Desactivar un usuario en lugar de eliminarlo
    async deactivateUser(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
    }

    // Actualizar el rol de un usuario
    async updateUserRole(id: number, role: string) {
        return this.prisma.user.update({
            where: { id },
            data: { role },
        });
    }
}
