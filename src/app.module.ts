import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MealModule } from './basic/meal.module';
import { RentalController } from './rental/rental.controller';
import { RentalModule } from './rental/rental.module';

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
    RentalModule,
  ],
  controllers: [AppController, RentalController],
  providers: [AppService],
})
export class AppModule {}
