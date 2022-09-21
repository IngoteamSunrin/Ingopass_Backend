import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async login() {}

  @Get('refresh')
  async refresh(@Req() req, @Res() res: any): Promise<void> {
    const { token } = req.headers;

    const decodePayload = await this.authService.verify(token);

    res.json({
      access_token: await this.authService.createToken({
        id: decodePayload.id,
        refresh: false,
      }),
      refresh_token: await this.authService.createToken({
        id: decodePayload.id,
        refresh: true,
      }),
    });
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: any): Promise<void> {
    try {
      const user = await this.userService.findById(req.user.id);

      res.json({
        access_token: await this.authService.createToken({
          id: user.id,
          refresh: false,
        }),
        refresh_token: await this.authService.createToken({
          id: user.id,
          refresh: true,
        }),
      });
    } catch (err) {
      const user = await this.userService.create(req.user);

      res.json({
        access_token: await this.authService.createToken({
          id: user.id,
          refresh: false,
        }),
        refresh_token: await this.authService.createToken({
          id: user.id,
          refresh: true,
        }),
      });
    }
  }
}
