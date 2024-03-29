import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BasicModule } from './basic/basic.module';
import { BasicController } from './basic/basic.controller';
import { RentalController } from './rental/rental.controller';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BasicModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
        dbName: 'ingopass',

        connectionFactory: (connection) => {
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    RentalModule,
  ],
  controllers: [AppController, BasicController, RentalController],
  providers: [AppService],
})
export class AppModule {}
