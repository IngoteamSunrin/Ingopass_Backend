import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

interface JwtPayload {
    sub: string
    email: string
}
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async login(@Req() req) {

    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: any, @Res() res: any): Promise<void> {
        const payload: JwtPayload = {
            sub: req.user.providerId,
            email: req.user.email
        }
        const { accessToken, refreshToken } = this.authService.getToken(payload)

        res.cookie('access-token', accessToken)
        res.cookie('refresh-token', refreshToken)

        // await this.updateHashedRefreshToken(req.user.id, refreshToken)
        res.redirect('/')
        return this.authService.login(req)
    }

}
