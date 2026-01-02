// backend/src/webinars/webinar.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Webinar } from './webinar.schema';
import { CreateWebinarDto } from './webinar.dto';
import { ErrorCodes } from '../common/constants/error-codes';

@Injectable()
export class WebinarService {
  constructor(
    @InjectModel(Webinar.name) private webinarModel: Model<Webinar>,
  ) {}

  async createWebinar(createWebinarDto: CreateWebinarDto): Promise<Webinar> {
    const webinar = new this.webinarModel({
      ...createWebinarDto,
      scheduledAt: new Date(createWebinarDto.scheduledAt),
    });
    return webinar.save();
  }

  async findAllWebinars(): Promise<Webinar[]> {
    return this.webinarModel
      .find()
      .select('title scheduledAt attendeeCount createdAt')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findWebinarById(id: string): Promise<any> {
    const webinarId = new Types.ObjectId(id);

    const result = await this.webinarModel.aggregate([
      { $match: { _id: webinarId } },
      {
        $lookup: {
          from: 'attendees',
          localField: '_id',
          foreignField: 'webinarId',
          as: 'attendees',
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          scheduledAt: 1,
          attendeeCount: { $size: '$attendees' },
          attendees: {
            _id: 1,
            fullName: 1,
            email: 1,
            joinedAt: 1,
          },
          createdAt: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw new NotFoundException({
        success: false,
        message: 'Webinar not found',
        errorCode: ErrorCodes.WEBINAR_NOT_FOUND,
      });
    }

    return result[0];
  }

  async incrementAttendeeCount(webinarId: string): Promise<void> {
    await this.webinarModel.findByIdAndUpdate(webinarId, {
      $inc: { attendeeCount: 1 },
    });
  }
}
