import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get('google')
  @ApiOperation({
    summary: '구글 로그인',
    description: 'sunrint.hs.kr 구글 계정으로 로그인 합니다.',
  })
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async login() {}

  @Get('refresh')
  async refresh(@Req() req, @Res() res: any): Promise<void> {
    const { token } = req.headers;

    const decodePayload = await this.authService.verify(token);

    res.json({
      access_token: await this.authService.createToken({
        id: decodePayload.id,
        ref: false,
      }),
      refresh_token: await this.authService.createToken({
        id: decodePayload.id,
        ref: true,
      }),
    });
  }

  @Get('google/callback')
  @ApiOperation({
    summary: '구글 로그인 Callback',
    description: 'sunrint.hs.kr 구글 계정으로 로그인 후 콜백을 처리합니다.',
  })
  @ApiCreatedResponse({
    description: 'Access & Refresh Token',
    schema: {
      example: { access_token: 'access_token', refresh_token: 'refresh_token' },
    },
  })
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: any): Promise<void> {
    try {
      const user = await this.userService.findById(req.user.id);

      res.json({
        access_token: await this.authService.createToken({
          id: user.id,
          ref: false,
        }),
        refresh_token: await this.authService.createToken({
          id: user.id,
          ref: true,
        }),
      });
    } catch (err) {
      console.log(req.user);
      const user = await this.userService.create(req.user);

      res.json({
        access_token: await this.authService.createToken({
          id: user.id,
          ref: false,
        }),
        refresh_token: await this.authService.createToken({
          id: user.id,
          ref: true,
        }),
      });
    }
  }

  @Get('qr')
  @ApiOperation({
    summary: 'QR Code Payload 생성',
    description: '전자학생증 QR Code 생성을 위한 JWT 토큰을 리턴합니다.',
  })
  @ApiCreatedResponse({
    description: 'JWT Token',
    schema: {
      example: '<Encoded JWT Token>>',
    },
  })
  @UseGuards(JwtAuthGuard)
  async qrPayload(@Req() req: any): Promise<object> {
    return { identity: req.user.identity };
  }
}
