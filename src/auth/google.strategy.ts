import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import 'dotenv/config'


@Injectable()
export class IngoStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
            scope: ['profile', 'email'],
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: VerifyCallback) {
        try {
            const { id, name, emails } = profile
            console.log(profile)

            if (profile._json.hd != 'sunrint.hs.kr') {
                console.log('not certified user')
                throw {
                    msg: 'not certified user'
                }
            }

            const jwt = 'tba'
            const user = {
                providerId: id,
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                jwt
            }

            done(null, user)

        } catch (error) {
            done(error, false)
        }
    }
}