// backend/src/attendees/attendee.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendeeController } from './attendee.controller';
import { AttendeeService } from './attendee.service';
import { Attendee, AttendeeSchema } from './attendee.schema';
import { WebinarModule } from '../webinars/webinar.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendee.name, schema: AttendeeSchema },
    ]),
    WebinarModule,
  ],
  controllers: [AttendeeController],
  providers: [AttendeeService],
})
export class AttendeeModule {}
