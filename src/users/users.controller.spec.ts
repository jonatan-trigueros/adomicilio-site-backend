/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      deactivateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllUsers on service when getAllUsers is called', async () => {
    await controller.getAllUsers();
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it('should call getUserById on service with correct id', async () => {
    const id = '1';
    await controller.getUserById(Number(id));
    expect(service.getUserById).toHaveBeenCalledWith(Number(id));
  });

  it('should call createUser on service with correct data', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    await controller.createUser(userData as any);
    expect(service.createUser).toHaveBeenCalledWith(userData);
  });

  it('should call updateUser on service with correct id and data', async () => {
    const id = '1';
    const updateData = { name: 'Jane Doe' };
    await controller.updateUser(Number(id), updateData as any);
    expect(service.updateUser).toHaveBeenCalledWith(Number(id), updateData);
  });

  it('should call deleteUser on service with correct id', async () => {
    const id = '1';
    await controller.deleteUser(Number(id));
    expect(service.deleteUser).toHaveBeenCalledWith(Number(id));
  });

  it('should call deactivateUser on service with correct id', async () => {
    const id = '1';
    await controller.deactivateUser(Number(id));
    expect(service.deactivateUser).toHaveBeenCalledWith(Number(id));
  });
});
