/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return 'Backend de Adomicilio.site!, solo personal autorizado debe ingresar 👮🏾👮🏾👮🏾🚨🚨🚔🚔🚔'; // Mensaje de bienvenida
  }
}
