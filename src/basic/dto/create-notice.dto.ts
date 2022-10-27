import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '공지의 Type 여부 (학생회 공지 or Ingoteam 공지)',
    example: 'Ingoteam',
    enum: ['StudentCouncil', 'Ingoteam'],
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '공지 제목',
    example: '이세계 아이돌 영원해',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '공지 내용',
    example:
      '와 비챤 이쁘다 고세구도 이쁘다 주르르도 이쁘다 아이네도 이쁘다 릴파도 이쁘다 징버거도 긔얍다 그냥 다 귀엽고 이쁘다',
  })
  content: string;
}
