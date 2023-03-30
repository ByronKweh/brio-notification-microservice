import { Test, TestingModule } from '@nestjs/testing';
import { EmailChannelService } from './email-channel/email-channel.service';
import {
  HappyBirthdayStrategy,
  LeaveBalanceReminderStrategy,
  MonthlyPayslipStrategy,
  NotificationStrategy,
} from './notification-strategies';
import { NOTIFICATION_MODEL } from './shared_constants';
import { UiChannelService } from './ui-channel/ui-channel.service';

describe('Notification Strategies', () => {
  let uiChannelService: UiChannelService;
  let emailChannelService: EmailChannelService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [],
      providers: [
        UiChannelService,
        EmailChannelService,
        { provide: NOTIFICATION_MODEL, useValue: jest.fn() },
      ],
    }).compile();

    uiChannelService = app.get<UiChannelService>(UiChannelService);
    emailChannelService = app.get<EmailChannelService>(EmailChannelService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('HappyBirthdayStrategy', () => {
    let strategy: NotificationStrategy;

    beforeEach(() => {
      strategy = new HappyBirthdayStrategy(
        uiChannelService,
        emailChannelService,
      );
    });

    it('should execute the strategy correctly', async () => {
      const executeData = {
        first_name: 'John',
        company_name: 'ACME Corp',
        user_id: 1,
        user_email: 'john@example.com',
      };

      const createUiNotificationSpy = jest
        .spyOn(uiChannelService, 'createUINotification')
        .mockResolvedValue(undefined);
      const sendEmailSpy = jest
        .spyOn(emailChannelService, 'sendEmail')
        .mockResolvedValue(undefined);

      await strategy.execute(executeData);

      expect(createUiNotificationSpy).toHaveBeenCalledWith(
        `Happy Birthday ${executeData.first_name}`,
        executeData.user_id,
      );
      expect(sendEmailSpy).toHaveBeenCalledWith({
        email: executeData.user_email,
        subject: `Happy Birthday ${executeData.first_name}`,
        content: `${executeData.company_name} is wishing you a happy birthday`,
      });
    });
  });

  describe('LeaveBalanceReminderStrategy', () => {
    let strategy: NotificationStrategy;

    beforeEach(() => {
      strategy = new LeaveBalanceReminderStrategy(uiChannelService);
    });

    it('should execute the strategy correctly', async () => {
      const executeData = {
        first_name: 'John',
        company_name: 'ACME Corp',
        user_id: 1,
        user_email: 'john@example.com',
      };

      const createUiNotificationSpy = jest
        .spyOn(uiChannelService, 'createUINotification')
        .mockResolvedValue(undefined);

      await strategy.execute(executeData);

      expect(createUiNotificationSpy).toHaveBeenCalledWith(
        `Dear ${executeData.first_name}, you have a XXX amount of leaves left`,
        executeData.user_id,
      );
    });
  });

  describe('MonthlyPayslipStrategy', () => {
    let strategy: NotificationStrategy;

    beforeEach(() => {
      strategy = new MonthlyPayslipStrategy(emailChannelService);
    });

    it('should execute the strategy correctly', async () => {
      const executeData = {
        first_name: 'John',
        company_name: 'ACME Corp',
        user_id: 1,
        user_email: 'john@example.com',
      };

      const sendEmailSpy = jest
        .spyOn(emailChannelService, 'sendEmail')
        .mockResolvedValue(undefined);

      await strategy.execute(executeData);

      expect(sendEmailSpy).toHaveBeenCalledWith({
        email: executeData.user_email,
        subject: `It's payday, ${executeData.first_name}!`,
        content: `${executeData.company_name} is wishing you a happy payday`,
      });
    });
  });
});
