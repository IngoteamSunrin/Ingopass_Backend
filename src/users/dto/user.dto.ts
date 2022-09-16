import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  grade: number;

  @IsNotEmpty()
  @IsNumber()
  class: number;

  @IsNotEmpty()
  @IsNumber()
  num: number;
}
