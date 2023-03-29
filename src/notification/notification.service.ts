import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface/external-microservice-interface.service';
import { CreateNotificationEntity } from './notification.controller';
import { NOTIFICATION_MODEL, NOTIFICATION_TYPE } from './shared_constants';

@Injectable()
export class NotificationService {
  // Notification strategy layer
  constructor(
    @Inject(NOTIFICATION_MODEL)
    private notificationModel: Model<Notification>,
    private externalMicroserviceInterface: ExternalMicroserviceInterfaceService,
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

  async createNotification(
    request_data: CreateNotificationEntity,
  ): Promise<void> {
    // check that user exists
    const user = await this.externalMicroserviceInterface.getUserById(
      request_data.user_id,
    );

    if (!user) {
      throw new Error(
        `[create-notification] User not found, user_id:${request_data.user_id}`,
      );
    }

    // check that company exists

    const company = await this.externalMicroserviceInterface.getCompanyById(
      request_data.company_id,
    );

    if (!company) {
      throw new Error(
        `[create-notification] Company not found, company_id:${request_data.company_id}`,
      );
    }

    // check for notification_type

    switch (request_data.notification_type) {
      case NOTIFICATION_TYPE.HAPPY_BIRTHDAY:
        break;

      case NOTIFICATION_TYPE.LEAVE_BALANCE_REMINDER:
        break;

      case NOTIFICATION_TYPE.MONTHLY_PAYSLIP:
        break;

      default:
        throw new BadRequestException(
          `[create-notification] Invalid notification type found: ${request_data.notification_type}`,
        );
    }
  }
}
