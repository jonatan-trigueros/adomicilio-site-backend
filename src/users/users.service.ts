/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        return this.prisma.user.findMany();
    }
    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }
}
