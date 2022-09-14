import { Test, TestingModule } from '@nestjs/testing';
import { IdController } from './id.controller';

describe('IdController', () => {
  let controller: IdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdController],
    }).compile();

    controller = module.get<IdController>(IdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
