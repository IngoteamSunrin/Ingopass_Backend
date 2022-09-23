import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IngoStrategy } from './strategy/google.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrivilegedStrategy } from './strategy/privileged.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, IngoStrategy, JwtStrategy, PrivilegedStrategy],
  exports: [AuthService],
})
export class AuthModule {}
