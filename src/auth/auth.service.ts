/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async validateRestaurant(email: string, password: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { email } });
    if (restaurant && (await bcrypt.compare(password, restaurant.password))) {
      return restaurant;
    }
    return null;
  }

  async validateDeliveryPerson(email: string, password: string) {
    const deliveryPerson = await this.prisma.deliveryPerson.findUnique({ where: { email } });
    if (deliveryPerson && (await bcrypt.compare(password, deliveryPerson.password))) {
      return deliveryPerson;
    }
    return null;
  }

  async validateErrandService(email: string, password: string) {
    const errandService = await this.prisma.errandService.findUnique({ where: { email } });
    if (errandService && (await bcrypt.compare(password, errandService.password))) {
      return errandService;
    }
    return null;
  }

  async login(user: { email: string; id: string }) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async loginRestaurant(restaurant: { email: string; id: string }) {
    const payload = { email: restaurant.email, sub: restaurant.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async loginDeliveryPerson(deliveryPerson: { email: string; id: string }) {
    const payload = { email: deliveryPerson.email, sub: deliveryPerson.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async loginErrandService(errandService: { email: string; id: string }) {
    const payload = { email: errandService.email, sub: errandService.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async registerUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashedPassword, name, username: email.split('@')[0] },
    });
  }

  async registerRestaurant(email: string, password: string, name: string, description?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.restaurant.create({
      data: { 
        email, 
        password: hashedPassword, 
        name, 
        description, 
        avgCostPerPerson: 0, // Default value
        hasDelivery: false   // Default value
      },
    });
  }

  async registerDeliveryPerson(email: string, password: string, name: string, username: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, username, name },
    });
    return this.prisma.deliveryPerson.create({
      data: { email, password: hashedPassword, name, username, user: { connect: { id: user.id } } },
    });
  }

  async registerErrandService(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.errandService.create({
      data: { email, password: hashedPassword, name },
    });
  }
}
