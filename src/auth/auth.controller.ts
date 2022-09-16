import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './auth.entity';

interface JwtPayload {
  sub: string;
  email: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async login(@Req() req) {}

  @Get('reload')
  async refresh(@Req() req, @Res() res: any): Promise<void> {
    const payload: JwtPayload = {
      sub: req.user.providerId,
      email: req.user.email,
    };
    res.clearCookie('refresh-token', {});
    try {
      const refreshToken = this.authService.createToken(payload, true);
      res.cookie('refresh-token', refreshToken);
      // TODO: edit refresh time and change deleteCookie to updateHashedRefreshToken
      // await this.updateHashedRefreshToken(req.user.providerId, refreshToken)
      res.send(refreshToken);
      res.redirect('/');
    } catch (error) {
      res.clearCookie('access-token');
      res.redirect('/');
    }
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: any): Promise<void> {
    const payload: JwtPayload = {
      sub: req.user.providerId,
      email: req.user.email,
    };

    try {
      res.cookie('accessToken', this.authService.createToken(payload, false));
      res.cookie('refreshToken', this.authService.createToken(payload, true));

      console.log(req.user);
      console.log(User);

      this.authService.create(req.user);
      res.redirect('/');
      return this.authService.login(req);
    } catch (error) {
      res.redirect('/');
      console.log(error);
      return this.authService.login(req);
    }
  }
}
