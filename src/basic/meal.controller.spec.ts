import { Test, TestingModule } from '@nestjs/testing';
import { MealController } from './meal.controller';

describe('MealController', () => {
  let controller: MealController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealController],
    }).compile();

    controller = module.get<MealController>(MealController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
