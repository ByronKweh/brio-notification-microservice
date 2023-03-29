import { Test, TestingModule } from '@nestjs/testing';
import { UiNotificationServiceService } from './ui-notification-service.service';

describe('UiNotificationServiceService', () => {
  let service: UiNotificationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UiNotificationServiceService],
    }).compile();

    service = module.get<UiNotificationServiceService>(UiNotificationServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
