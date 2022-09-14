import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    getToken(payload: JwtPayload) {
        const accessToken: any = this.jwtService.sign(payload, {
            expiresIn: '2h',
            secret: process.env.JWT_SECRET,
        })

        const refreshToken: any = this.jwtService.sign(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_SECRET,
        })

        return { accessToken, refreshToken }
    }
    async login(req) {
        if (!req.user) {
            return 'No user!'
        }

        return req.user
    }
}
