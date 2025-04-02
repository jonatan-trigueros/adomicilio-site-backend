/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Prisma } from '@prisma/client';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get()
    getAllFavorites() {
        return this.favoritesService.getAllFavorites();
    }

    @Post()
    createFavorite(@Body() data: Prisma.FavoriteCreateInput) {
        return this.favoritesService.createFavorite(data);
    }
}
