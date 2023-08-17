import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Rocket } from './rocket.model';

@Schema()
export class Launch extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  flightNumber: number;

  @Prop()
  logo: string;

  @Prop()
  missionName: string;

  @Prop()
  dateUtc: string;

  @Prop({ type: Types.ObjectId, ref: Rocket.name })
  rocket: Rocket;

  @Prop({ type: Types.ObjectId })
  rocketId: Types.ObjectId;

  @Prop()
  result: boolean;

  @Prop()
  webcast: string;

  @Prop()
  isReused: boolean;

  @Prop()
  createdAt: Date;
}

export type LaunchDocument = Launch & Document;

export const LaunchSchema = SchemaFactory.createForClass(Launch);
