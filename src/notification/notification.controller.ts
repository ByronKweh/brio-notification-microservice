import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NotificationService } from './notification.service';
import { NOTIFICATION_TYPE } from './shared_constants';

export class CreateNotificationEntity {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  company_id: number;
  @IsNotEmpty()
  @IsEnum(NOTIFICATION_TYPE)
  notification_type: NOTIFICATION_TYPE;
}

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getHello() {
    return await this.notificationService.getAll();
  }

  @Get('create')
  async create() {
    return await this.notificationService.create();
  }

  //todo should protect with a jwt and a intercepter to call a jwt microservice
  @Post('create-notification')
  async createNotificationForUser(
    @Body() request_body: CreateNotificationEntity,
  ) {
    return 'OK';
  }
}
