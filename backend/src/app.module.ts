// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WebinarModule } from './webinars/webinar.module';
import { AttendeeModule } from './attendees/attendee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    WebinarModule,
    AttendeeModule,
  ],
})
export class AppModule {}
