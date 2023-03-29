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

interface BirthdayStrategyDTO {
  first_name: string;
  company_name: string;
}

interface LeaveBalanceReminderStrategyDTO {
  first_name: string;
  user_id: number;
}

interface MonthlyPayslipStrategyDTO {
  first_name: string;
  company_name: string;
  user_id: number;
}
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
    // todo probably can outsource the company and user_id check since it could be reused by other notification creation APIs (maybe)
    // check that company exists

    const company = await this.externalMicroserviceInterface.getCompanyById(
      request_data.company_id,
    );

    if (!company) {
      throw new Error(
        `[create-notification] Company not found, company_id:${request_data.company_id}`,
      );
    }

    if (!company.is_subscribed) {
      console.log(
        'Company is not subscribed to notifications, do not send to user',
      );
      return;
    }

    // check that user exists
    const user = await this.externalMicroserviceInterface.getUserById(
      request_data.user_id,
    );

    if (!user) {
      throw new Error(
        `[create-notification] User not found, user_id:${request_data.user_id}`,
      );
    }

    if (!user.is_subscribed) {
      console.log(
        'User is not subscribed to notifications, do not send to user',
      );
      return;
    }

    // check for notification_type

    switch (request_data.notification_type) {
      case NOTIFICATION_TYPE.HAPPY_BIRTHDAY:
        await this.useHappyBirthdayStrategy({
          first_name: user.first_name,
          company_name: company.company_name, //todo probably rename this to name instead of company_name
        });
        break;

      case NOTIFICATION_TYPE.LEAVE_BALANCE_REMINDER:
        await this.useLeaveBalanceReminderStrategy({
          first_name: user.first_name,
          user_id: request_data.user_id,
        });
        break;

      case NOTIFICATION_TYPE.MONTHLY_PAYSLIP:
        await this.useMonthlyPayslipStrategy({
          first_name: user.first_name,
          user_id: request_data.user_id,
          company_name: company.company_name, //todo probably rename this to name instead of company_name
        });
        break;

      default:
        throw new BadRequestException(
          `[create-notification] Invalid notification type found: ${request_data.notification_type}`,
        );
    }
  }

  async useHappyBirthdayStrategy(birthday_strategy_data: BirthdayStrategyDTO) {}

  async useLeaveBalanceReminderStrategy(
    leave_balance_reminder_strategy_data: LeaveBalanceReminderStrategyDTO,
  ) {}

  async useMonthlyPayslipStrategy(
    monthly_payslip_strategy_data: MonthlyPayslipStrategyDTO,
  ) {}
}
