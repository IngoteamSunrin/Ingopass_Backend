import { Controller, Get, Param } from '@nestjs/common'
import { MealService } from './meal.service'

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) { }

  @Get('day/:id')
  async mealInfoDay(@Param('id') date: string): Promise<any> {
    // return method: /20220919, /20230101 
    return this.mealService.mealFind(date)
  }

}
