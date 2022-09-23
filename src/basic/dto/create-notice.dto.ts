import { IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: ['StudentCouncil' | 'Ingoteam'] })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  date: string;
}
