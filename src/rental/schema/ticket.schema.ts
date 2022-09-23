import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalDocument = Rental & Document;
@Schema()
export class Rental {
  @Prop({ required: true })
  type: 'StudentCouncil' | 'Ingoteam';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  date: Date;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
