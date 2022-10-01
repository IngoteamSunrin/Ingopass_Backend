import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(payload: JwtPayload): Promise<string> {
    if (payload.ref) {
      const token = await this.jwtService.signAsync(payload, {
        algorithm: 'HS512',
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1y',
      });
      return token;
    } else {
      const token = await this.jwtService.signAsync(payload, {
        algorithm: 'HS512',
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1w',
      });
      return token;
    }
  }

  async verify(token: string): Promise<JwtPayload> {
    try {
      const { id, refresh }: any = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return { id: id, ref: refresh };
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        throw new HttpException(
          '토큰이 만료되었습니다.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        '인증되지 않은 토큰입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
