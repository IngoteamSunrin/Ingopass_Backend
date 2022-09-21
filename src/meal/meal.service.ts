import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import 'dotenv/config';
import Neis from '@my-school.info/neis-api';

@Injectable()
export class MealService {
  neisService = new Neis({ KEY: process.env.NEIS_APIKEY, Type: 'json' });

  async findMeal(date: string): Promise<any> {
    try {
      const mealInfo = await this.neisService.getMealInfo({
        ATPT_OFCDC_SC_CODE: 'B10',
        SD_SCHUL_CODE: '7010536',
        MLSV_FROM_YMD: date,
      });
      const info = mealInfo[0].DDISH_NM.split('<br/>');
      const returnmeal = [];
      info.forEach((i) => {
        returnmeal.push(i.split('(')[0].split('  ')[0]);
      });
      return { info: info, returnmeal: returnmeal };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'API 요청이 잘못되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
