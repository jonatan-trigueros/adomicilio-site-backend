import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return '¡NestJS + Prisma funcionando!';
  }

  @Get('users')
  async getUsers() {
    return this.prisma.user.findMany(); // Obtiene todos los usuarios de la DB
  }
}
