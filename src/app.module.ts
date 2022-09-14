import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { IdController } from './id/id.controller';
import { IdService } from './id/id.service';
import { IdModule } from './id/id.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, IdModule, UsersModule],
  controllers: [AppController, IdController, UsersController],
  providers: [AppService, IdService, UsersService],
})
export class AppModule {}
