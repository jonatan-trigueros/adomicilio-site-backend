/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderDishesService } from './order-dishes.service';

describe('OrderDishesService', () => {
  let service: OrderDishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDishesService],
    }).compile();

    service = module.get<OrderDishesService>(OrderDishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
