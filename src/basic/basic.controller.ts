import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PrivilegedGuard } from 'src/auth/guard/privileged-auth.guard';
import { BasicService } from './basic.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { Notice } from './schema/notice.schema';

@Controller('basic')
@ApiTags('Basic')
export class BasicController {
  constructor(private readonly basicService: BasicService) {}

  @Get('meal')
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
  async getMeal(@Query('date') date: string): Promise<object> {
    if (!date) {
      date = new Date().toJSON().slice(0, 10).replace(/-/g, '');
    }
    console.log(date);
    return this.basicService.findMeal(date);
  }

  @Post('notice')
  @UseGuards(PrivilegedGuard)
  @ApiOperation({
    summary: '공지 생성',
    description: '공지를 생성합니다. Ingoteam과 학생회만 접근 권한이 있습니다.',
  })
  @ApiBody({ type: CreateNoticeDto })
  async postNotice(@Body() createNoticeDto: CreateNoticeDto): Promise<Notice> {
    return await this.basicService.createNotice(createNoticeDto);
  }

  @Get('notice')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '공지 보기',
    description: '그동안 올라온 모든 공지를 확인합니다.',
  })
  @ApiOkResponse({
    description: 'DB에 저장된 모든 공지들',
    type: [CreateNoticeDto],
  })
  async getNotice(): Promise<Notice[]> {
    return await this.basicService.findAllNotice();
  }
}
