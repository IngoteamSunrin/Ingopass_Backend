import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;
@Schema()
export class Notice {
  @Prop({ required: true })
  type: 'StudentCouncil' | 'Ingoteam';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  date: Date;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
