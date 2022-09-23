import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.refresh) {
      return await this.userService.findById(payload.id);
    } else {
      throw new HttpException(
        '잘못된 토큰 형식입니다. Access Token을 전달해주세요.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
