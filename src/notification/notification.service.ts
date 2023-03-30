import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { EmailChannelService } from './email-channel/email-channel.service';
import {
  CompanyResponseDTO,
  ExternalMicroserviceInterfaceService,
  UserResponseDTO,
} from './external-microservice-interface/external-microservice-interface.service';
import { MicroserviceException } from './microservice.exception';
import {
  HappyBirthdayStrategy,
  LeaveBalanceReminderStrategy,
  MonthlyPayslipStrategy,
  NotificationStrategy,
} from './notification-strategies';
import { CreateNotificationEntity } from './notification.controller';
import { NOTIFICATION_MODEL, NOTIFICATION_TYPE } from './shared_constants';
import { UiChannelService } from './ui-channel/ui-channel.service';

export interface CreateNoficationResponseDTO {
  status: status;
  reason: failure_reasons | null;
}

//todo type narrowing

export enum failure_reasons {
  COMPANY_UNSUBSCRIBED = 'COMPANY_UNSUBSCRIBED',
  USER_UNSUBSCRIBED = 'USER_UNSUBSCRIBED',
}

export enum status {
  NOTIFICATION_SENT = 'NOTIFICATION_SENT',
  NOT_ALLOWED = 'NOT_ALLOWED',
}
@Injectable()
export class NotificationService {
  private readonly strategies: Map<string, NotificationStrategy>;
  // Notification strategy layer
  constructor(
    private externalMicroserviceInterface: ExternalMicroserviceInterfaceService,
    private readonly uiChannelService: UiChannelService,
    private readonly emailChannelService: EmailChannelService,
  ) {
    this.strategies = new Map<string, NotificationStrategy>([
      [
        NOTIFICATION_TYPE.HAPPY_BIRTHDAY,
        new HappyBirthdayStrategy(uiChannelService, emailChannelService),
      ],
      [
        NOTIFICATION_TYPE.LEAVE_BALANCE_REMINDER,
        new LeaveBalanceReminderStrategy(uiChannelService),
      ],
      [
        NOTIFICATION_TYPE.MONTHLY_PAYSLIP,
        new MonthlyPayslipStrategy(emailChannelService),
      ],
    ]);
  }

  async createNotification(
    request_data: CreateNotificationEntity,
  ): Promise<CreateNoficationResponseDTO> {
    // todo probably can outsource the company and user_id check since it could be reused by other notification creation APIs (maybe) by making the function getSubscribedUser or something
    // check that company exists
    let company: undefined | CompanyResponseDTO;
    try {
      company = await this.externalMicroserviceInterface.getCompanyById(
        request_data.company_id,
      );
    } catch (e) {
      throw new MicroserviceException();
    }

    if (!company.is_subscribed) {
      return {
        status: status.NOT_ALLOWED,
        reason: failure_reasons.COMPANY_UNSUBSCRIBED,
      };
    }

    // check that user exists

    let user: undefined | UserResponseDTO;
    try {
      user = await this.externalMicroserviceInterface.getUserById(
        request_data.user_id,
      );
    } catch (e) {
      throw new MicroserviceException();
    }

    if (!user.is_subscribed) {
      return {
        status: status.NOT_ALLOWED,
        reason: failure_reasons.USER_UNSUBSCRIBED,
      };
    }

    // check for notification_type

    const strategy = this.strategies.get(request_data.notification_type);
    if (!strategy) {
      throw new BadRequestException(
        `[create-notification] Invalid notification type found: ${request_data.notification_type}`,
      );
    }

    await strategy.execute({
      first_name: user.first_name,
      user_id: request_data.user_id,
      company_name: company.company_name,
      user_email: user.email,
    });

    return {
      status: status.NOTIFICATION_SENT,
      reason: undefined,
    };
  }
}
