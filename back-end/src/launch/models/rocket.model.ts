import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Rocket extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name: string;
}

export type RocketDocument = Rocket & Document;

export const RocketSchema = SchemaFactory.createForClass(Rocket);
