// backend/src/webinars/webinar.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseFilters,
} from '@nestjs/common';
import { WebinarService } from './webinar.service';
import { CreateWebinarDto } from './webinar.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ObjectIdValidationPipe } from '../common/pipes/objectid-validation.pipe';
import { createSuccessResponse } from '../common/utils/response.interface';

@Controller('webinars')
@UseFilters(HttpExceptionFilter)
export class WebinarController {
  constructor(private readonly webinarService: WebinarService) {}

  @Post()
  async createWebinar(@Body() createWebinarDto: CreateWebinarDto) {
    const webinar = await this.webinarService.createWebinar(createWebinarDto);
    return createSuccessResponse(webinar);
  }

  @Get()
  async getAllWebinars() {
    const webinars = await this.webinarService.findAllWebinars();
    return createSuccessResponse(webinars);
  }

  @Get(':id')
  async getWebinarById(@Param('id', ObjectIdValidationPipe) id: string) {
    const webinar = await this.webinarService.findWebinarById(id);
    return createSuccessResponse(webinar);
  }
}
