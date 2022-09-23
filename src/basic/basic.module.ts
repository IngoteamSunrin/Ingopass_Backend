import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { Notice, NoticeSchema } from './schema/notice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [BasicController],
  providers: [BasicService],
  exports: [BasicService],
})
export class BasicModule {}
