import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalDocument = Rental & Document;
@Schema()
export class Rental {
  @Prop({ required: true, timestamps: true })
  type: 'StudentCouncil' | 'Ingoteam';

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
