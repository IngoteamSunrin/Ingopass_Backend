import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from 'src/auth/interface/payload.interface';

@Injectable()
export class CheckPermissionMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const bearer = req.headers.authorization;
    const access_token = bearer && bearer.split(' ')[1];

    try {
      const { id, refresh }: JwtPayload = await this.authService.verify(
        access_token,
      );
      if (!refresh) {
        req.user = await this.userService.findById(id);
      } else {
        throw new HttpException(
          '잘못된 토큰 형식입니다. Access Token을 전달해주세요.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(
        '토큰이 입력되지 않았거나 인증되지 않은 토큰입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
