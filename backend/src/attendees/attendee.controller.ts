// backend/src/attendees/attendee.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseFilters,
} from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { RegisterAttendeeDto } from './attendee.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ObjectIdValidationPipe } from '../common/pipes/objectid-validation.pipe';
import { createSuccessResponse } from '../common/utils/response.interface';

@Controller('webinars')
@UseFilters(HttpExceptionFilter)
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post(':id/register')
  async registerAttendee(
    @Param('id', ObjectIdValidationPipe) id: string,
    @Body() registerAttendeeDto: RegisterAttendeeDto,
  ) {
    const attendee = await this.attendeeService.registerAttendee(
      id,
      registerAttendeeDto,
    );
    return createSuccessResponse(attendee);
  }

  @Get(':id/attendees')
  async getAttendees(@Param('id', ObjectIdValidationPipe) id: string) {
    const attendees = await this.attendeeService.getAttendeesByWebinar(id);
    return createSuccessResponse(attendees);
  }
}
