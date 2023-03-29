import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { notificationProviders } from './providers/notification.providers';
import { NOTIFICATION_MODEL } from './shared_constants';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        ...notificationProviders,
        { provide: NOTIFICATION_MODEL, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
