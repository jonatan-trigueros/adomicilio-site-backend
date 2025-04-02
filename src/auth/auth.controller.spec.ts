/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      validateUser: jest.fn(),
      validateRestaurant: jest.fn(),
      validateDeliveryPerson: jest.fn(),
      validateErrandService: jest.fn(),
      loginUser: jest.fn(),
      loginRestaurant: jest.fn(),
      loginDeliveryPerson: jest.fn(),
      loginErrandService: jest.fn(),
      registerUser: jest.fn(),
      registerRestaurant: jest.fn(),
      registerDeliveryPerson: jest.fn(),
      registerErrandService: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should throw BadRequestException if role is missing', async () => {
      await expect(
        controller.login({ email: 'test@example.com', password: 'password', role: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should call validateUser and loginUser for role "user"', async () => {
      const mockUser = { email: 'test@example.com', id: '1' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'loginUser').mockResolvedValue({ access_token: 'token' });

      const result = await controller.login({ email: 'test@example.com', password: 'password', role: 'user' });

      expect(authService.validateUser).toHaveBeenCalledWith('test@example.com', 'password');
      expect(authService.loginUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ access_token: 'token' });
    });

    it('should throw BadRequestException for invalid role', async () => {
      await expect(
        controller.login({ email: 'test@example.com', password: 'password', role: 'invalidRole' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('register', () => {
    it('should throw BadRequestException if role is missing', async () => {
      await expect(
        controller.register({ email: 'test@example.com', password: 'password', role: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should call registerUser for role "user"', async () => {
      jest.spyOn(authService, 'registerUser').mockResolvedValue({ id: 1, email: 'test@example.com' });

      const result = await controller.register({
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      });

      expect(authService.registerUser).toHaveBeenCalledWith('test@example.com', 'password', undefined);
      expect(result).toEqual({ id: '1', email: 'test@example.com' });
    });

    it('should throw BadRequestException for invalid role', async () => {
      await expect(
        controller.register({ email: 'test@example.com', password: 'password', role: 'invalidRole' }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
