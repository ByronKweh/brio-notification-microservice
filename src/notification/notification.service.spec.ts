import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface/external-microservice-interface.service';
import { MicroserviceException } from './microservice.exception';
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

  it('should throw if user_id does not exist', () => {
    jest.spyOn(external_microservice, 'getUserById').mockImplementation(() => {
      throw new NotFoundException('user not found');
    });

    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: NOTIFICATION_TYPE.HAPPY_BIRTHDAY,
    };
    const createNotification = () => {
      return service.createNotification(payload);
    };
    expect(createNotification).rejects.toThrowError(
      new MicroserviceException(),
    );
  });

  it('should throw if company_id does not exist', () => {
    jest
      .spyOn(external_microservice, 'getCompanyById')
      .mockImplementation(() => {
        throw new NotFoundException('company not found');
      });

    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: NOTIFICATION_TYPE.HAPPY_BIRTHDAY,
    };
    const createNotification = () => {
      return service.createNotification(payload);
    };
    expect(createNotification).rejects.toThrowError(
      new MicroserviceException(),
    );
  });

  it('should throw if notification type does not exist', () => {
    const payload = {
      user_id: 2,
      company_id: 1,
      notification_type: null,
    };
    const createNotification = () => {
      return service.createNotification(payload);
    };
    expect(createNotification).rejects.toThrow(
      new BadRequestException(
        `[create-notification] Invalid notification type found: ${payload.notification_type}`,
      ),
    );
  });
});
