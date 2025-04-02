/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ErrandServicesService } from './errand-services.service';

describe('ErrandServicesService', () => {
  let service: ErrandServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrandServicesService],
    }).compile();

    service = module.get<ErrandServicesService>(ErrandServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
