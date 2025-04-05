/* eslint-disable prettier/prettier */
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator'; // Decorador para rutas públicas

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() //Ruta sin autenticación
  @Post('login')
  async login(@Body() body: { email: string; password: string; role: string }) {
    const { email, password, role } = body;

    if (!role) {
      throw new BadRequestException('Role is required');
    }

    let user;
    switch (role) {
      case 'user':
        user = await this.authService.validateUser(email, password);
        break;
      case 'restaurant':
        user = await this.authService.validateRestaurant(email, password);
        break;
      case 'deliveryPerson':
        user = await this.authService.validateDeliveryPerson(email, password);
        break;
      case 'errandService':
        user = await this.authService.validateErrandService(email, password);
        break;
      default:
        throw new BadRequestException('Invalid role');
    }

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService[`login${role.charAt(0).toUpperCase() + role.slice(1)}`](user);
  }

  @Public() // ✅ Ruta sin autenticación
  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      name?: string;
      role: string;
      description?: string;
      username?: string;
    },
  ) {
    const { email, password, name, role, description, username } = body;

    if (!role) {
      throw new BadRequestException('Role is required');
    }

    switch (role) {
      case 'user':
        return this.authService.registerUser(email, password, name);
      case 'restaurant':
        if (!name) {
          throw new BadRequestException('Name is required for restaurant registration');
        }
        return this.authService.registerRestaurant(email, password, name, description);
      case 'deliveryPerson':
        if (!name || !username) {
          throw new BadRequestException('Name and username are required for delivery person registration');
        }
        return this.authService.registerDeliveryPerson(email, password, name, username);
      case 'errandService':
        if (!name) {
          throw new BadRequestException('Name is required for errand service registration');
        }
        return this.authService.registerErrandService(email, password, name);
      default:
        throw new BadRequestException('Invalid role');
    }
  }
}
