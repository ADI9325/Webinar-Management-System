// backend/src/webinars/webinar.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebinarController } from './webinar.controller';
import { WebinarService } from './webinar.service';
import { Webinar, WebinarSchema } from './webinar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Webinar.name, schema: WebinarSchema }]),
  ],
  controllers: [WebinarController],
  providers: [WebinarService],
  exports: [WebinarService],
})
export class WebinarModule {}
