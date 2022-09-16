import {
    Controller,
    Get,
    UseGuards,
    Res,
    Req,
    Body
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { User } from './auth.entity'

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

    @Get('reload')
    async refreshToken(@Req() req, @Res() res: any): Promise<void> {
        try {
            const payload: JwtPayload = {
                sub: req.user.providerId,
                email: req.user.email
            }

            const refreshToken = this.authService.getToken(payload)
            res.cookie('refresh-token', refreshToken)
            res.rediret('/')
        }
        catch (error) {
            res.rediret('/')
        }
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: any, @Res() res: any): Promise<void> {
        const payload: JwtPayload = {
            sub: req.user.providerId,
            email: req.user.email
        }

        try {
            const { accessToken, refreshToken } = this.authService.getToken(payload)

            res.cookie('access-token', accessToken)
            res.cookie('refresh-token', refreshToken)

            // console.log(accessToken, refreshToken)
            req.user.jwt = refreshToken
            console.log(req.user)
            console.log(User)

            this.authService.create(req.user)
            // await this.updateHashedRefreshToken(req.user.id, refreshToken)
            res.redirect('/')
            return this.authService.login(req)
        }
        catch (error) {
            res.redirect('/')
            console.log(error)
            return this.authService.login(req)
        }
    }
}
