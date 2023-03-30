import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  CreateNoficationResponseDTO,
  failure_reasons,
  NotificationService,
  status,
} from './notification.service';
import { NOTIFICATION_TYPE } from './shared_constants';
import { UiChannelService } from './ui-channel/ui-channel.service';

export class CreateNotificationEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  user_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  company_id: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(NOTIFICATION_TYPE)
  notification_type: NOTIFICATION_TYPE;
}

class CreateNotificationResponseEntity {
  @ApiProperty()
  @IsEnum(status)
  status: status;

  @ApiProperty()
  @IsEnum(failure_reasons)
  reason: failure_reasons;
}

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly uiChannel: UiChannelService,
  ) {}

  //todo should protect with a jwt and a intercepter to call a jwt microservice
  @Post('create-notification')
  @ApiResponse({ status: 201, type: CreateNotificationResponseEntity })
  async createNotificationForUser(
    @Body() request_body: CreateNotificationEntity,
  ): Promise<CreateNoficationResponseDTO> {
    return await this.notificationService.createNotification(request_body);
  }

  @Get('get-notifications-for-user/:user_id')
  async getNotificationsForUser(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<Array<Notification>> {
    return await this.uiChannel.listAllUINotificationsForUser(user_id);
  }
}
