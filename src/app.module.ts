import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckPermissionMiddleware } from './middleware/check-permission.middleware';
import { MealModule } from './meal/meal.module';
import { MealController } from './meal/meal.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MealModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        //user: configService.get<string>('MONGODB_USER'),
        //password: configService.get<string>('MONGODB_PASSWORD'),

        connectionFactory: (connection) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .exclude({
        path: 'auth',
        method: RequestMethod.ALL,
      })
      .forRoutes(MealController);
  }
}
