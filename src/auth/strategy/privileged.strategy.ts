import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import 'dotenv/config';

@Injectable()
export class PrivilegedStrategy extends PassportStrategy(
  Strategy,
  'privileged',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.refresh) {
      const user = await this.userService.findById(payload.id);
      if ([11010, 11007, 10517, 99999].includes(user.identity)) {
        return user;
      } else {
        throw new HttpException(
          '해당 경로는 학생회와 Ingoteam만 접근 가능한 경로입니다.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        '잘못된 토큰 형식입니다. Access Token을 전달해주세요.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
