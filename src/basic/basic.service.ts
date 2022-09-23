import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Notice, NoticeDocument } from './schema/notice.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import 'dotenv/config';
import Neis from '@my-school.info/neis-api';

@Injectable()
export class BasicService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  neisService = new Neis({ KEY: process.env.NEIS_APIKEY, Type: 'json' });

  async findMeal(date: string): Promise<object> {
    try {
      const mealInfo = await this.neisService.getMealInfo({
        ATPT_OFCDC_SC_CODE: 'B10',
        SD_SCHUL_CODE: '7010536',
        MLSV_YMD: date,
      });
      const meal = mealInfo[0].DDISH_NM.split('<br/>');
      for (const idx in meal) {
        meal[idx] = meal[idx].replace(/\s\s\([^)]*\)/gi, '');
      }
      return { data: meal };
    } catch (err) {
      throw new HttpException(
        'API 요청이 잘못되었습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createNotice(data: object): Promise<Notice> {
    const newNotice = new this.noticeModel(data);
    return newNotice.save();
  }

  async findAllNotice(): Promise<Notice[]> {
    return this.noticeModel.find().exec();
  }
}
