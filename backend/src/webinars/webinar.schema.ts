// backend/src/webinars/webinar.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Webinar extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ default: 0 })
  attendeeCount: number;

  createdAt: Date;
  updatedAt: Date;
}

export const WebinarSchema = SchemaFactory.createForClass(Webinar);
