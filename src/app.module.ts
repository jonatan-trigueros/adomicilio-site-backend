/* eslint-disable prettier/prettier */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { LoggerMiddleware } from './common/middleware/logger.middleware'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    RestaurantsModule,
    DishesModule,
    OrdersModule,
    DeliveryPersonsModule,
    ErrandServicesModule,
    ReservationsModule,
    ReviewsModule,
    FavoritesModule,
    OrderDishesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
// Este código define el módulo principal de la aplicación NestJS. Importa varios módulos y servicios necesarios para el funcionamiento de la aplicación, como ConfigModule para la configuración, PrismaService para la conexión a la base de datos y varios módulos relacionados con las funcionalidades de la aplicación (usuarios, restaurantes, platos, pedidos, etc.). También define un middleware LoggerMiddleware que se encarga de registrar las peticiones que llegan al servidor. El middleware se aplica a todas las rutas utilizando el método configure() del módulo principal.