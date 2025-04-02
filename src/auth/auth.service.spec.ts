/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: { findUnique: jest.fn(), create: jest.fn() },
            restaurant: { findUnique: jest.fn(), create: jest.fn() },
            deliveryPerson: { findUnique: jest.fn(), create: jest.fn() },
            errandService: { findUnique: jest.fn(), create: jest.fn() },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const mockUser = { email: 'test@example.com', password: await bcrypt.hash('password', 10) };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toEqual(mockUser);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await authService.validateUser('test@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const mockUser = { email: 'test@example.com', id: '123' };
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

      const result = await authService.login(mockUser);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('registerUser', () => {
    it('should create a new user', async () => {
      const mockUser = { email: 'test@example.com', password: 'hashedPassword', name: 'Test User', username: 'test' };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const result = await authService.registerUser('test@example.com', 'password', 'Test User');
      expect(result).toEqual(mockUser);
    });
  });

  describe('validateRestaurant', () => {
    it('should return restaurant if credentials are valid', async () => {
      const mockRestaurant = { email: 'restaurant@example.com', password: await bcrypt.hash('password', 10) };
      jest.spyOn(prismaService.restaurant, 'findUnique').mockResolvedValue(mockRestaurant);

      const result = await authService.validateRestaurant('restaurant@example.com', 'password');
      expect(result).toEqual(mockRestaurant);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(prismaService.restaurant, 'findUnique').mockResolvedValue(null);

      const result = await authService.validateRestaurant('restaurant@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('validateDeliveryPerson', () => {
    it('should return delivery person if credentials are valid', async () => {
      const mockDeliveryPerson = { email: 'delivery@example.com', password: await bcrypt.hash('password', 10) };
      jest.spyOn(prismaService.deliveryPerson, 'findUnique').mockResolvedValue(mockDeliveryPerson);

      const result = await authService.validateDeliveryPerson('delivery@example.com', 'password');
      expect(result).toEqual(mockDeliveryPerson);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(prismaService.deliveryPerson, 'findUnique').mockResolvedValue(null);

      const result = await authService.validateDeliveryPerson('delivery@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('validateErrandService', () => {
    it('should return errand service if credentials are valid', async () => {
      const mockErrandService = { email: 'errand@example.com', password: await bcrypt.hash('password', 10) };
      jest.spyOn(prismaService.errandService, 'findUnique').mockResolvedValue(mockErrandService);

      const result = await authService.validateErrandService('errand@example.com', 'password');
      expect(result).toEqual(mockErrandService);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(prismaService.errandService, 'findUnique').mockResolvedValue(null);

      const result = await authService.validateErrandService('errand@example.com', 'password');
      expect(result).toBeNull();
    });
  });

  describe('loginRestaurant', () => {
    it('should return an access token for restaurant', async () => {
      const mockRestaurant = { email: 'restaurant@example.com', id: '123' };
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

      const result = await authService.loginRestaurant(mockRestaurant);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('loginDeliveryPerson', () => {
    it('should return an access token for delivery person', async () => {
      const mockDeliveryPerson = { email: 'delivery@example.com', id: '456' };
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

      const result = await authService.loginDeliveryPerson(mockDeliveryPerson);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('loginErrandService', () => {
    it('should return an access token for errand service', async () => {
      const mockErrandService = { email: 'errand@example.com', id: '789' };
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mockToken');

      const result = await authService.loginErrandService(mockErrandService);
      expect(result).toEqual({ access_token: 'mockToken' });
    });
  });

  describe('registerRestaurant', () => {
    it('should create a new restaurant', async () => {
      const mockRestaurant = { email: 'restaurant@example.com', password: 'hashedPassword', name: 'Test Restaurant' };
      jest.spyOn(prismaService.restaurant, 'create').mockResolvedValue(mockRestaurant);

      const result = await authService.registerRestaurant('restaurant@example.com', 'password', 'Test Restaurant');
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('registerDeliveryPerson', () => {
    it('should create a new delivery person', async () => {
      const mockDeliveryPerson = { email: 'delivery@example.com', password: 'hashedPassword', name: 'Test Delivery' };
      jest.spyOn(prismaService.deliveryPerson, 'create').mockResolvedValue(mockDeliveryPerson);

      const result = await authService.registerDeliveryPerson('delivery@example.com', 'password', 'Test Delivery');
      expect(result).toEqual(mockDeliveryPerson);
    });
  });

  describe('registerErrandService', () => {
    it('should create a new errand service', async () => {
      const mockErrandService = { email: 'errand@example.com', password: 'hashedPassword', name: 'Test Errand' };
      jest.spyOn(prismaService.errandService, 'create').mockResolvedValue(mockErrandService);

      const result = await authService.registerErrandService('errand@example.com', 'password', 'Test Errand');
      expect(result).toEqual(mockErrandService);
    });
  });
});