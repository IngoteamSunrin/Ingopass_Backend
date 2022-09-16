import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createToken(payload: JwtPayload, refresh: boolean) {
    if (refresh) {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: process.env.JWT_SERECT,
        expiresIn: '1y',
      });
      return token;
    } else {
      const token = this.jwtService.sign(payload, {
        algorithm: 'HS512',
        secret: process.env.JWT_SERECT,
        expiresIn: '1w',
      });
      return token;
    }
  }
}
