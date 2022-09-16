import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { IngoStrategy } from './google.strategy'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './auth.entity'

const env = process.env

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [],
      synchronize: true,
    })
    // TODO: change synchronize true to false
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, IngoStrategy]
})
export class AuthModule { }
