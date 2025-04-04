import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishesService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los platillos con paginación y búsqueda
  async getAllDishes(skip = 0, take = 10, search?: string) {
    return this.prisma.dish.findMany({
      skip,
      take,
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Contar la cantidad total de platillos
  async countDishes() {
    return this.prisma.dish.count();
  }

  // Obtener un platillo por ID con manejo de error si no existe
  async getDishById(id: number) {
    return this.prisma.dish.findUniqueOrThrow({
      where: { id },
    });
  }

  // Crear un platillo
  async createDish(createDishDto: CreateDishDto) {
    return this.prisma.dish.create({
      data: {
        name: createDishDto.name,
        description: createDishDto.description,
        price: createDishDto.price,
        preparationTime: createDishDto.preparationTime,
        ingredients: createDishDto.ingredients,
        gallery: createDishDto.gallery,
        restaurant: {
          connect: { id: createDishDto.restaurantId }, // Relación correcta
        },
        createdAt: createDishDto.createdAt,
        isActive: true,
      },
    });
  }

  // Actualizar un platillo por ID con validación
  async updateDish(id: number, data: Prisma.DishUpdateInput) {
    try {
      return await this.prisma.dish.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Platillo con ID ${id} no encontrado`);
    }
  }

  // Eliminar un platillo por ID con validación
  async deleteDish(id: number) {
    try {
      return await this.prisma.dish.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Platillo con ID ${id} no encontrado`);
    }
  }

  // Desactivar un platillo en lugar de eliminarlo
  async deactivateDish(id: number) {
    return this.prisma.dish.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Actualizar la calificación de un platillo
  async updateDishRating(id: number, rating: number) {
    return this.prisma.dish.update({
      where: { id },
      data: { rating },
    });
  }
}
