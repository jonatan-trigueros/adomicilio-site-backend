/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) {}

    async getAllReviews() {
        return this.prisma.review.findMany();
    }

    async createReview(data: Prisma.ReviewCreateInput) {
        return this.prisma.review.create({ data });
    }
}
