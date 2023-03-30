import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NOTIFICATION_MODEL } from '../shared_constants';

@Injectable()
export class UiChannelService {
  constructor(
    @Inject(NOTIFICATION_MODEL)
    private notificationModel: Model<Notification>,
  ) {}

  async createUINotification(message: string, user_id: number) {
    await this.notificationModel.create({
      message: message,
      user_id: user_id,
    });
  }

  async listAllUINotificationsForUser(user_id: number) {
    return await this.notificationModel.find({
      user_id: user_id,
    });
  }
}
