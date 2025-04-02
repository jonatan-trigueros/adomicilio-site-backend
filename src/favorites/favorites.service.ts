/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
    constructor(private prisma: PrismaService) {}

    async getAllFavorites() {
        return this.prisma.favorite.findMany();
    }

    async createFavorite(data: Prisma.FavoriteCreateInput) {
        return this.prisma.favorite.create({ data });
    }
}
