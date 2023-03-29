import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface/external-microservice-interface.service';
import { NotificationService } from './notification.service';
import { notificationProviders } from './providers/notification.providers';
import { NOTIFICATION_MODEL, NOTIFICATION_TYPE } from './shared_constants';

describe('NotificationService', () => {
  let service: NotificationService;
  let external_microservice: ExternalMicroserviceInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        ExternalMicroserviceInterfaceService,
        { provide: NOTIFICATION_MODEL, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    external_microservice = module.get<ExternalMicroserviceInterfaceService>(
      ExternalMicroserviceInterfaceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should call happy birthday strategy', () => {
    const happy_birthday_strategy = jest.spyOn(
      service,
      'useHappyBirthdayStrategy',
    );

    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: NOTIFICATION_TYPE.HAPPY_BIRTHDAY,
    };
    service.createNotification(payload).then(() => {
      expect(happy_birthday_strategy).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call balance reminder strategy', () => {
    const balance_reminder_strategy = jest.spyOn(
      service,
      'useLeaveBalanceReminderStrategy',
    );

    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: NOTIFICATION_TYPE.LEAVE_BALANCE_REMINDER,
    };
    service.createNotification(payload).then(() => {
      expect(balance_reminder_strategy).toHaveBeenCalledTimes(1);
    });
  });

  it('Should call monthly payslip strategy', () => {
    const monhtly_payslip_strategy = jest.spyOn(
      service,
      'useMonthlyPayslipStrategy',
    );

    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: NOTIFICATION_TYPE.MONTHLY_PAYSLIP,
    };
    service.createNotification(payload).then(() => {
      expect(monhtly_payslip_strategy).toHaveBeenCalledTimes(1);
    });
  });

  //   it('Validate happy_birthday strategy', () => {
  //     jest
  //       .spyOn(external_microservice, 'getUserById')
  //       .mockResolvedValue(undefined);

  //     const payload = {
  //       user_id: 2,
  //       company_id: 1,
  //       notification_type: NOTIFICATION_TYPE.HAPPY_BIRTHDAY,
  //     };
  //     const createNotification = () => {
  //       return service.createNotification(payload);
  //     };
  //     expect(createNotification).rejects.toThrowError(
  //       `[create-notification] User not found, user_id:${payload.user_id}`,
  //     );
  //   });
});
