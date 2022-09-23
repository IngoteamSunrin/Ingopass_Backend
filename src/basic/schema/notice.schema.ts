import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;
@Schema()
export class Notice {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  major: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  identity: number;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  class: number;

  @Prop({ required: true })
  num: number;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
