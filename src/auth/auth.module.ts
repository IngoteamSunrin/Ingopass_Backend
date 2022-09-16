import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IngoStrategy } from './google.strategy';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, IngoStrategy],
})
export class AuthModule {}
