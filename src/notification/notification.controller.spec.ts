import { Test, TestingModule } from '@nestjs/testing';
import { EmailChannelService } from './email-channel/email-channel.service';
import { ExternalMicroserviceInterfaceService } from './external-microservice-interface/external-microservice-interface.service';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { databaseProviders } from './providers/database.providers';
import { notificationProviders } from './providers/notification.providers';
import { NOTIFICATION_MODEL } from './shared_constants';
import { UiChannelService } from './ui-channel/ui-channel.service';

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        ExternalMicroserviceInterfaceService,
        { provide: NOTIFICATION_MODEL, useValue: jest.fn() },
        UiChannelService,
        EmailChannelService,
      ],
      controllers: [NotificationController],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
