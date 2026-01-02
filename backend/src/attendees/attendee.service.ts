// backend/src/attendees/attendee.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Attendee } from './attendee.schema';
import { RegisterAttendeeDto } from './attendee.dto';
import { WebinarService } from '../webinars/webinar.service';
import { ErrorCodes } from '../common/constants/error-codes';

@Injectable()
export class AttendeeService {
  constructor(
    @InjectModel(Attendee.name) private attendeeModel: Model<Attendee>,
    private webinarService: WebinarService,
  ) {}

  async registerAttendee(
    webinarId: string,
    registerAttendeeDto: RegisterAttendeeDto,
  ): Promise<Attendee> {
    const webinarObjectId = new Types.ObjectId(webinarId);

    const webinarExists = await this.webinarService.findWebinarById(webinarId);
    if (!webinarExists) {
      throw new NotFoundException({
        success: false,
        message: 'Webinar not found',
        errorCode: ErrorCodes.WEBINAR_NOT_FOUND,
      });
    }

    try {
      const attendee = new this.attendeeModel({
        webinarId: webinarObjectId,
        ...registerAttendeeDto,
      });

      const savedAttendee = await attendee.save();
      await this.webinarService.incrementAttendeeCount(webinarId);

      return savedAttendee;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException({
          success: false,
          message: 'You are already registered for this webinar',
          errorCode: ErrorCodes.DUPLICATE_REGISTRATION,
        });
      }
      throw error;
    }
  }

  async getAttendeesByWebinar(webinarId: string): Promise<Attendee[]> {
    const webinarObjectId = new Types.ObjectId(webinarId);

    const webinarExists = await this.webinarService.findWebinarById(webinarId);
    if (!webinarExists) {
      throw new NotFoundException({
        success: false,
        message: 'Webinar not found',
        errorCode: ErrorCodes.WEBINAR_NOT_FOUND,
      });
    }

    return this.attendeeModel
      .find({ webinarId: webinarObjectId })
      .select('fullName email joinedAt')
      .sort({ joinedAt: -1 })
      .exec();
  }
}
