import { Controller, Get, Req } from '@nestjs/common';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
  constructor(private readonly authService: MealService) {}

  @Get('info')
  async mealInfo(@Req() req) {
    console.log(req.user);
    return 'test!';
  }
}
