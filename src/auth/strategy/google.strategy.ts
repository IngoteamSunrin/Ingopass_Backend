import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { discrimMajor } from 'src/resources/major';
import 'dotenv/config';

@Injectable()
export class IngoStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: VerifyCallback,
  ) {
    try {
      const { id, name, emails } = profile;

      if (profile._json.hd != 'sunrint.hs.kr') {
        throw new HttpException('Not Sunrint Email', HttpStatus.UNAUTHORIZED);
      }

      const familyName = isNaN(name.familyName)
        ? name.familyName
        : name.givenName;
      const givenName = isNaN(name.familyName)
        ? name.givenName
        : name.familyName;
      const user = {
        id: id,
        email: emails[0].value,
        name: familyName,
        identity: Number(givenName),
        grade: Number(givenName.slice(0, 1)),
        class: Number(givenName.slice(1, 3)),
        num: Number(givenName.slice(3, 5)),
        major: discrimMajor(Number(givenName.slice(1, 3))),
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
