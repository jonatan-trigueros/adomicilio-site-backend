/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prismaServiceMock: {
    user: {
      findMany: jest.Mock;
      count: jest.Mock;
      findUnique: jest.Mock;
      findUniqueOrThrow: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prismaServiceMock = {
      user: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.user.findMany when getAllUsers is called', async () => {
    await service.getAllUsers();
    expect(prismaServiceMock.user.findMany).toHaveBeenCalled();
  });

  it('should call prisma.user.count when countUsers is called', async () => {
    await service.countUsers();
    expect(prismaServiceMock.user.count).toHaveBeenCalled();
  });

  it('should call prisma.user.findUniqueOrThrow when getUserById is called', async () => {
    const id = 1;
    await service.getUserById(id);
    expect(prismaServiceMock.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('should hash the password and call prisma.user.create when createUser is called', async () => {
    const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' };
    const hashedPassword = 'hashedPassword123';
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);

    await service.createUser(userData as any);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
      data: { ...userData, password: hashedPassword },
    });
  });

  it('should call prisma.user.update when updateUser is called', async () => {
    const id = 1;
    const updateData = { name: 'Updated Name' };
    await service.updateUser(id, updateData as any);
    expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
      where: { id },
      data: updateData,
    });
  });

  it('should hash the password and call prisma.user.update when updatePassword is called', async () => {
    const id = 1;
    const newPassword = 'newPassword123';
    const hashedPassword = 'hashedNewPassword123';
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);

    await service.updatePassword(id, newPassword);
    expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, 10);
    expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
      where: { id },
      data: { password: hashedPassword },
    });
  });

  it('should call prisma.user.delete when deleteUser is called', async () => {
    const id = 1;
    await service.deleteUser(id);
    expect(prismaServiceMock.user.delete).toHaveBeenCalledWith({ where: { id } });
  });

  it('should call prisma.user.update when deactivateUser is called', async () => {
    const id = 1;
    await service.deactivateUser(id);
    expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
      where: { id },
      data: { isActive: false },
    });
  });

  it('should call prisma.user.update when updateUserRole is called', async () => {
    const id = 1;
    const role = 'admin';
    await service.updateUserRole(id, role);
    expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
      where: { id },
      data: { role },
    });
  });

  it('should throw NotFoundException if updateUser fails', async () => {
    const id = 1;
    const updateData = { name: 'Updated Name' };
    prismaServiceMock.user.update.mockRejectedValueOnce(new Error());

    await expect(service.updateUser(id, updateData as any)).rejects.toThrow(
      NotFoundException,
    );
  });
});
