/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    getAllReviews() {
        return this.reviewsService.getAllReviews();
    }

    @Post()
    createReview(@Body() data: Prisma.ReviewCreateInput) {
        return this.reviewsService.createReview(data);
    }
}
