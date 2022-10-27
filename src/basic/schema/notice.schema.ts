import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;
@Schema({ versionKey: false, timestamps: true })
export class Notice {
  @Prop({ required: true })
  type: 'StudentCouncil' | 'Ingoteam';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
