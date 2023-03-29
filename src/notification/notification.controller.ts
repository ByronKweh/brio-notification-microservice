import { Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

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
}
