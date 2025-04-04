/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { connect } from 'http2';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los restaurantes con paginación y búsqueda
  async getAllRestaurants(skip = 0, take = 10, search?: string) {
    return this.prisma.restaurant.findMany({
      skip,
      take,
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Contar la cantidad total de restaurantes
  async countRestaurants() {
    return this.prisma.restaurant.count();
  }

  // Obtener un restaurante por ID con manejo de error si no existe
  async getRestaurantById(id: number) {
    return this.prisma.restaurant.findUniqueOrThrow({
      where: { id },
    });
  }

  // Crear un restaurante con verificación de email y cifrado de contraseña
  async createRestaurant(data: CreateRestaurantDto) {
    const existingRestaurant = await this.prisma.restaurant.findUnique({
      where: { email: data.email },
    });
  
    if (existingRestaurant) {
      throw new Error('El correo ya está en uso');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
  
    const {
      popularDishes,
      menu,
      reviews,
      orders,
      reservations,
      favorites,
      deliveryPersons,
      errandServices,
      ...rest
    } = data;
  
    const connectArray = (ids?: number[]) =>
      ids?.length ? { connect: ids.map((id) => ({ id })) } : undefined;
  
    return this.prisma.restaurant.create({
      data: {
        ...rest,
        password: hashedPassword,
        popularDishes: connectArray(popularDishes),
        menu: connectArray(menu),
        reviews: connectArray(reviews),
        orders: connectArray(orders),
        reservations: connectArray(reservations),
        favorites: connectArray(favorites),
        deliveryPersons: connectArray(deliveryPersons),
        errandServices: connectArray(errandServices),
      },
    });
  }
  
  // Actualizar un restaurante por ID con validación
  async updateRestaurant(id: number, data: Prisma.RestaurantUpdateInput) {
    try {
      return await this.prisma.restaurant.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }
  }

  // Actualizar la contraseña de un restaurante
  async updatePassword(id: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.restaurant.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // Eliminar un restaurante por ID con validación
  async deleteRestaurant(id: number) {
    try {
      return await this.prisma.restaurant.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado`);
    }
  }

  // Desactivar un restaurante en lugar de eliminarlo
  async deactivateRestaurant(id: number) {
    return this.prisma.restaurant.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Actualizar el rol de un restaurante
  async updateRestaurantRole(id: number, role: string) {
    return this.prisma.restaurant.update({
      where: { id },
      data: { role },
    });
  }
}
