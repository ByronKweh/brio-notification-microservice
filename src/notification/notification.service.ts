import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NOTIFICATION_MODEL } from 'src/utils';

@Injectable()
export class NotificationService {
  // Notification strategy layer
  constructor(
    @Inject(NOTIFICATION_MODEL)
    private notificationModel: Model<Notification>,
  ) {}

  async create(): Promise<Notification> {
    return await this.notificationModel.create({
      message: 'test',
      user_id: 123,
    });
  }

  async getAll() {
    return await this.notificationModel.find();
  }
}
