import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EmailChannelService } from './email-channel/email-channel.service';
import { NOTIFICATION_MODEL } from './shared_constants';
import { UiChannelService } from './ui-channel/ui-channel.service';

export interface NotificationStrategy {
  execute(data: ExecuteNotificationStrategyDTO): Promise<void>; //todo type narrowing later
}

interface ExecuteNotificationStrategyDTO {
  first_name: string;
  company_name: string;
  user_id: number;
  user_email: string;
}

export class HappyBirthdayStrategy implements NotificationStrategy {
  constructor(
    private readonly uiChannelService: UiChannelService,
    private readonly emailChannelService: EmailChannelService,
  ) {}
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
    await this.uiChannelService.createUINotification(
      `Happy Birthday ${data.first_name}`,
      data.user_id,
    );
    //todo add mongoose transaction to rollback if send email fails
    await this.emailChannelService.sendEmail({
      email: data.user_email,
      subject: `Happy Birthday ${data.first_name}`,
      content: `${data.company_name} is wishing you a happy birthday`,
    });
  }
}

export class LeaveBalanceReminderStrategy implements NotificationStrategy {
  constructor(private readonly uiChannelService: UiChannelService) {}
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
    //todo should probably get leave balance stuff from another microservice call
    await this.uiChannelService.createUINotification(
      `Dear ${data.first_name}, you have a XXX amount of leaves left`,
      data.user_id,
    );
  }
}

export class MonthlyPayslipStrategy implements NotificationStrategy {
  constructor(private readonly emailChannelService: EmailChannelService) {}
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
    //todo should probably call another microservice for payslip data
    await this.emailChannelService.sendEmail({
      email: data.user_email,
      subject: `It's payday, ${data.first_name}!`,
      content: `${data.company_name} is wishing you a happy payday`,
    });
  }
}
