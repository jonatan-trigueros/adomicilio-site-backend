/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Backend de Adomicilio.site!, solo personal autorizado debe ingresar 👮🏾👮🏾👮🏾🚨🚨🚔🚔🚔"', () => {
      expect(appController.getHello()).toBe('Backend de Adomicilio.site!, solo personal autorizado debe ingresar 👮🏾👮🏾👮🏾🚨🚨🚔🚔🚔');
    });
  });
});
