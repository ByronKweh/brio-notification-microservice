import { Controller, Get } from '@nestjs/common';

@Controller('notification')
export class NotificationController {
  @Get()
  getHello(): string {
    return 'Hello from notification';
  }
}
