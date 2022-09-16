import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

interface JwtPayload {
  sub: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async login(@Req() req) {}

  @Get('reload')
  async refresh(@Req() req, @Res() res: any): Promise<void> {
    const payload: JwtPayload = {
      sub: req.user.providerId,
    };
    res.clearCookie('refreshToken', {});
    try {
      const refreshToken = this.authService.createToken(payload, true);
      res.cookie('refreshToken', refreshToken);
      // TODO: edit refresh time and change deleteCookie to updateHashedRefreshToken
      // await this.updateHashedRefreshToken(req.user.providerId, refreshToken)
      res.send(refreshToken);
      res.redirect('/');
    } catch (error) {
      res.clearCookie('accessToken');
      res.redirect('/');
    }
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: any) {
    try {
      const user = await this.userService.findById(req.user.providerId);

      const payload: JwtPayload = {
        sub: user.id,
      };

      const access_token = this.authService.createToken(payload, false);
      const refresh_token = this.authService.createToken(payload, true);

      res.cookie('access_token', access_token);
      res.cookie('refresh_token', refresh_token);

      return { user, refresh_token, access_token };
    } catch (err) {
      if (err.status == HttpStatus.NOT_FOUND) {
        const user = await this.userService.create(req.user);

        const payload: JwtPayload = {
          sub: user.id,
        };

        const access_token = this.authService.createToken(payload, false);
        const refresh_token = this.authService.createToken(payload, true);

        res.cookie('access_token', access_token);
        res.cookie('refresh_token', refresh_token);

        return { user, refresh_token, access_token };
      }
    }
  }
}
