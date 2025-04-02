/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ErrandServicesController } from './errand-services.controller';

describe('ErrandServicesController', () => {
  let controller: ErrandServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrandServicesController],
    }).compile();

    controller = module.get<ErrandServicesController>(ErrandServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
