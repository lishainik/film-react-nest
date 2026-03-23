import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Schedule extends Document {
  @Prop()
  id: string;
  @Prop()
  daytime: string;
  @Prop()
  hall: number;
  @Prop()
  rows: number;
  @Prop()
  seats: number;
  @Prop()
  price: number;
  @Prop([String])
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema({ collection: 'films' })
export class Films extends Document {
  @Prop()
  id: string;
  @Prop()
  rating: number;
  @Prop()
  director: string;
  @Prop([String])
  tags: string[];
  @Prop()
  image: string;
  @Prop()
  cover: string;
  @Prop()
  title: string;
  @Prop()
  about: string;
  @Prop()
  description: string;
  @Prop({ type: [ScheduleSchema] })
  schedule: Schedule[];
}

export const FilmsSchema = SchemaFactory.createForClass(Films);
