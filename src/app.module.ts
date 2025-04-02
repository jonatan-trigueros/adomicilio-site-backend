/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryPersonsModule } from './delivery-persons/delivery-persons.module';
import { ErrandServicesModule } from './errand-services/errand-services.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrderDishesModule } from './order-dishes/order-dishes.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ConfigModule.forRoot(), UsersModule, RestaurantsModule, DishesModule, OrdersModule, DeliveryPersonsModule, ErrandServicesModule, ReservationsModule, ReviewsModule, FavoritesModule, OrderDishesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
