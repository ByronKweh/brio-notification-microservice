import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { NOTIFICATION_MODEL } from './shared_constants';

export interface NotificationStrategy {
  execute(data: ExecuteNotificationStrategyDTO): Promise<void>; //todo type narrowing later
}

interface ExecuteNotificationStrategyDTO {
  first_name: string;
  company_name: string;
  user_id: number;
}

export class HappyBirthdayStrategy implements NotificationStrategy {
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
  }
}

export class LeaveBalanceReminderStrategy implements NotificationStrategy {
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
  }
}

export class MonthlyPayslipStrategy implements NotificationStrategy {
  async execute(data: ExecuteNotificationStrategyDTO): Promise<void> {
    // implementation
  }
}
