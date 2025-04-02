import { Module } from '@nestjs/common';
import { ErrandServicesController } from './errand-services.controller';
import { ErrandServicesService } from './errand-services.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ErrandServicesController],
  providers: [ErrandServicesService, PrismaService],
})
export class ErrandServicesModule {}
