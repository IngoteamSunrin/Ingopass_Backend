import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(payload: JwtPayload, refresh: boolean): object {
    if (refresh) {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: this.configService.get<string>('JWT_SERCET'),
        expiresIn: '1y',
      });
      return token;
    } else {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: this.configService.get<string>('JWT_SERCET'),
        expiresIn: '1w',
      });
      return token;
    }
  }

  async verify() {}
}
