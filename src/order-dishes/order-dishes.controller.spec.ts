/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderDishesController } from './order-dishes.controller';

describe('OrderDishesController', () => {
  let controller: OrderDishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderDishesController],
    }).compile();

    controller = module.get<OrderDishesController>(OrderDishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
