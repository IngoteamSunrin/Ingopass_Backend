import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MealService } from './meal.service';

@Controller('meal')
@ApiTags('Meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    type: 'string',
    name: 'date',
    description: '급식을 불러올 날짜',
    example: '20220923',
  })
  async mealInfoDay(@Query('date') date: string): Promise<any> {
    return this.mealService.findMeal(date);
  }
}
