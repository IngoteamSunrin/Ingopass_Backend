import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MealService } from './meal.service';

@Controller('meal')
@ApiTags('Meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '급식 정보',
    description:
      '해당 날짜의 급식을 불러옵니다. 값이 없으면 오늘의 급식을 불러옵니다.',
  })
  @ApiParam({
    type: 'string',
    name: 'date',
    description: '급식을 불러올 날짜',
    example: '20220923',
  })
  @ApiCreatedResponse({
    description: '급식 정보',
    schema: {
      example: {
        data: [
          '콩나물밥/부추양념장',
          '우렁된장찌개',
          '비건함박구이',
          '총각김치',
          '쥬시쿨',
          '파스타샐러드',
        ],
      },
    },
  })
  async mealInfoDay(@Query('date') date: string): Promise<any> {
    if (!date) {
      date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    }
    console.log(date);
    return this.mealService.findMeal(date);
  }
}
