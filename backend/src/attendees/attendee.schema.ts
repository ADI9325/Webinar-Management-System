// backend/src/attendees/attendee.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Attendee extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Webinar', required: true })
  webinarId: Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ default: Date.now })
  joinedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export const AttendeeSchema = SchemaFactory.createForClass(Attendee);

AttendeeSchema.index({ webinarId: 1, email: 1 }, { unique: true });
