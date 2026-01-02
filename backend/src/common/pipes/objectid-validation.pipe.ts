// backend/src/common/pipes/objectid-validation.pipe.ts

import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ErrorCodes } from '../constants/error-codes';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException({
        success: false,
        message: 'Invalid webinar ID format',
        errorCode: ErrorCodes.INVALID_WEBINAR_ID,
      });
    }
    return value;
  }
}
