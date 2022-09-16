import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IngoStrategy } from './google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    // TODO: change synchronize true to false
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, IngoStrategy],
})
export class AuthModule {}
