import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MealService } from './meal.service';

@Controller('meal')
@ApiTags('Meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  @ApiParam({
    type: 'string',
    name: 'date',
    description: '급식을 불러올 날짜',
    example: '20220923',
  })
  async mealInfoDay(@Param('date') date: string): Promise<any> {
    return this.mealService.findMeal(date);
  }
}
